import {
  Line3,
  Matrix4,
  Ray,
  Vector3,
  BufferAttribute,
  BufferGeometry,
  Points,
  Float32BufferAttribute,
  PointsMaterial,
  Color
} from 'three'
import { CONTAINED, INTERSECTED, MeshBVH, NOT_INTERSECTED } from 'three-mesh-bvh'
import useSettingStore from '@/stores/setting'

const screenCentroid = new Vector3()
const toScreenSpaceMatrix = new Matrix4()
const boxPoints = new Array(8).fill().map(() => new Vector3())
const boxLines = new Array(12).fill().map(() => new Line3())
const lassoSegments = []
const perBoundsSegments = []

function pointRayCrossesLine (point, line, prevDirection, thisDirection) {
  const { start, end } = line
  const px = point.x
  const py = point.y

  const sy = start.y
  const ey = end.y

  if (sy === ey) return false

  if (py > sy && py > ey) return false // above
  if (py < sy && py < ey) return false // below

  const sx = start.x
  const ex = end.x
  if (px > sx && px > ex) return false // right
  if (px < sx && px < ex) {
    // left

    if (py === sy && prevDirection !== thisDirection) {
      return false
    }

    return true
  }

  // check the side
  const dx = ex - sx
  const dy = ey - sy
  const perpx = dy
  const perpy = -dx

  const pdx = px - sx
  const pdy = py - sy

  const dot = perpx * pdx + perpy * pdy

  if (Math.sign(dot) !== Math.sign(perpx)) {
    return true
  }

  return false
}
function pointRayCrossesSegments (point, segments) {
  let crossings = 0
  const firstSeg = segments[segments.length - 1]
  let prevDirection = firstSeg.start.y > firstSeg.end.y
  for (let s = 0, l = segments.length; s < l; s++) {
    const line = segments[s]
    const thisDirection = line.start.y > line.end.y
    if (pointRayCrossesLine(point, line, prevDirection, thisDirection)) {
      crossings++
    }

    prevDirection = thisDirection
  }

  return crossings
}
// Math Functions
// https://www.geeksforgeeks.org/convex-hull-set-2-graham-scan/
function getConvexHull (points) {
  function orientation (p, q, r) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)

    if (val == 0) {
      return 0 // colinear
    }

    // clockwise or counterclockwise
    return val > 0 ? 1 : 2
  }

  function distSq (p1, p2) {
    return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
  }

  function compare (p1, p2) {
    // Find orientation
    const o = orientation(p0, p1, p2)
    if (o == 0) return distSq(p0, p2) >= distSq(p0, p1) ? -1 : 1

    return o == 2 ? -1 : 1
  }

  // find the lowest point in 2d
  let lowestY = Infinity
  let lowestIndex = -1
  for (let i = 0, l = points.length; i < l; i++) {
    const p = points[i]
    if (p.y < lowestY) {
      lowestIndex = i
      lowestY = p.y
    }
  }

  // sort the points
  const p0 = points[lowestIndex]
  points[lowestIndex] = points[0]
  points[0] = p0

  points = points.sort(compare)

  // filter the points
  let m = 1
  const n = points.length
  for (let i = 1; i < n; i++) {
    while (i < n - 1 && orientation(p0, points[i], points[i + 1]) == 0) {
      i++
    }

    points[m] = points[i]
    m++
  }

  // early out if we don't have enough points for a hull
  if (m < 3) return null

  // generate the hull
  const hull = [points[0], points[1], points[2]]
  for (let i = 3; i < m; i++) {
    while (orientation(hull[hull.length - 2], hull[hull.length - 1], points[i]) !== 2) {
      hull.pop()
    }

    hull.push(points[i])
  }

  return hull
}
// https://stackoverflow.com/questions/3838329/how-can-i-check-if-two-segments-intersect
function lineCrossesLine (l1, l2) {
  function ccw (A, B, C) {
    return (C.y - A.y) * (B.x - A.x) > (B.y - A.y) * (C.x - A.x)
  }

  const A = l1.start
  const B = l1.end

  const C = l2.start
  const D = l2.end

  return ccw(A, C, D) !== ccw(B, C, D) && ccw(A, B, C) !== ccw(A, B, D)
}

export default {
  schema: {
    enabledHighlight: { type: 'boolean', default: true },
    objectName: { type: 'string', default: 'selecting' }
  },

  update () {
    const { enabledHighlight } = this.data
    this.highlightPoints.visible = enabledHighlight
  },

  init () {
    const settingStore = useSettingStore()
    this.setting = settingStore.$state
    const material = new PointsMaterial({
      size: this.setting.SELECT_POINT_CLOUD_SIZE,
      color: new Color(this.setting.SELECT_POINT_CLOUD_COLOR).convertSRGBToLinear()
    })
    const geometry = new BufferGeometry()
    this.highlightPoints = new Points(geometry, material)

    material.depthTest = false
    material.depthWrite = false
    material.transparent = true

    settingStore.onChange(this.fixMaterialSetting.bind(this, material))
    this.fixMaterialSetting(material)
  },

  fixMaterialSetting (material) {
    const color = this.setting.DARK_MODEL
      ? this.setting.SELECT_POINT_CLOUD_COLOR_DARK
      : this.setting.SELECT_POINT_CLOUD_COLOR
    material.size = this.setting.SELECT_POINT_CLOUD_SIZE
    material.color = new Color(color).convertSRGBToLinear()
    material.transparent = true
  },

  highlightByArray (array) {
    this.highlightPoints.geometry.deleteAttribute('position')
    this.highlightPoints.geometry.setAttribute(
      'position',
      new Float32BufferAttribute(array, 3, false)
    )
    this.el.setObject3D(this.data.objectName, this.highlightPoints)
  },

  highlight (index) {
    const attribute = this.el.getObject3D('mesh').geometry.attributes.position
    const indexAttr = this.el.getObject3D('mesh').geometry.index
    const buffer = new Float32Array(index.length * 3)
    const newHighlightIndex = new Uint32Array(index.length)
    let newHighlightLength = 0

    for (let i = 0, count = index.length; i < count; i++) {
      if (indexAttr) {
        if (indexAttr.getX(index[i]) === 4294967295) continue
      }

      newHighlightIndex[newHighlightLength++] = index[i]
      buffer[i * 3 + 0] = attribute.getX(index[i])
      buffer[i * 3 + 1] = attribute.getY(index[i])
      buffer[i * 3 + 2] = attribute.getZ(index[i])
    }

    this.highlightByArray(buffer)
    return newHighlightIndex.slice(0, newHighlightLength)
  },

  tick () {
    const mesh = this.el.getObject3D('mesh')
    if (this.lastKey === mesh.geometry.uuid) return
    if (!mesh.geometry.attributes.position) return

    const buffer = new Float32Array(mesh.geometry.attributes.position.count * 9)
    for (let i = 0, count = mesh.geometry.attributes.position.count; i < count; i++) {
      buffer[i * 9 + 0] = mesh.geometry.attributes.position.array[i * 3 + 0]
      buffer[i * 9 + 1] = mesh.geometry.attributes.position.array[i * 3 + 1]
      buffer[i * 9 + 2] = mesh.geometry.attributes.position.array[i * 3 + 2]

      buffer[i * 9 + 3] = mesh.geometry.attributes.position.array[i * 3 + 0]
      buffer[i * 9 + 4] = mesh.geometry.attributes.position.array[i * 3 + 1]
      buffer[i * 9 + 5] = mesh.geometry.attributes.position.array[i * 3 + 2]

      buffer[i * 9 + 6] = mesh.geometry.attributes.position.array[i * 3 + 0]
      buffer[i * 9 + 7] = mesh.geometry.attributes.position.array[i * 3 + 1]
      buffer[i * 9 + 8] = mesh.geometry.attributes.position.array[i * 3 + 2]
    }

    const geo = new BufferGeometry()
    const attr = new BufferAttribute(buffer, 3, false)
    geo.setAttribute('position', attr)

    mesh.geometry.boundsTree = new MeshBVH(geo)
    this.lastKey = mesh.geometry.uuid
  },
  updateScreenSpaceMatrix () {
    const mesh = this.el.getObject3D('mesh')
    const camera = this.el.sceneEl.camera
    toScreenSpaceMatrix
      .copy(mesh.matrixWorld)
      .premultiply(camera.matrixWorldInverse)
      .premultiply(camera.projectionMatrix)
  },
  selectByShape (selectionPoints) {
    this.updateScreenSpaceMatrix()
    const mesh = this.el.getObject3D('mesh')
    const indices = new Uint32Array(mesh.geometry.boundsTree.geometry.index.count)
    let indicesIndex = 0

    // create scratch points and lines to use for selection
    while (lassoSegments.length < selectionPoints.length) {
      lassoSegments.push(new Line3())
    }

    lassoSegments.length = selectionPoints.length

    for (let s = 0, l = selectionPoints.length; s < l; s += 3) {
      const line = lassoSegments[s]
      const sNext = (s + 3) % l
      line.start.x = selectionPoints[s]
      line.start.y = selectionPoints[s + 1]

      line.end.x = selectionPoints[sNext]
      line.end.y = selectionPoints[sNext + 1]
    }
    const indexAttr = mesh.geometry.boundsTree.geometry.index
    mesh.geometry.boundsTree.shapecast({
      intersectsBounds: (box, isLeaf, score, depth) => {
        // Get the bounding box points
        const { min, max } = box
        let index = 0

        let minY = Infinity
        let maxY = -Infinity
        let minX = Infinity
        for (let x = 0; x <= 1; x++) {
          for (let y = 0; y <= 1; y++) {
            for (let z = 0; z <= 1; z++) {
              const v = boxPoints[index]
              v.x = x === 0 ? min.x : max.x
              v.y = y === 0 ? min.y : max.y
              v.z = z === 0 ? min.z : max.z
              v.w = 1
              v.applyMatrix4(toScreenSpaceMatrix)
              index++

              if (v.y < minY) minY = v.y
              if (v.y > maxY) maxY = v.y
              if (v.x < minX) minX = v.x
            }
          }
        }

        // Find all the relevant segments here and cache them in the above array for
        // subsequent child checks to use.
        const parentSegments = perBoundsSegments[depth - 1] || lassoSegments
        const segmentsToCheck = perBoundsSegments[depth] || []
        segmentsToCheck.length = 0
        perBoundsSegments[depth] = segmentsToCheck
        for (let i = 0, l = parentSegments.length; i < l; i++) {
          const line = parentSegments[i]
          const sx = line.start.x
          const sy = line.start.y
          const ex = line.end.x
          const ey = line.end.y
          if (sx < minX && ex < minX) continue

          const startAbove = sy > maxY
          const endAbove = ey > maxY
          if (startAbove && endAbove) continue

          const startBelow = sy < minY
          const endBelow = ey < minY
          if (startBelow && endBelow) continue

          segmentsToCheck.push(line)
        }

        if (segmentsToCheck.length === 0) {
          return NOT_INTERSECTED
        }

        // Get the screen space hull lines
        const hull = getConvexHull(boxPoints)
        const lines = hull.map((p, i) => {
          const nextP = hull[(i + 1) % hull.length]
          const line = boxLines[i]
          line.start.copy(p)
          line.end.copy(nextP)
          return line
        })

        // If a lasso point is inside the hull then it's intersected and cannot be contained
        if (pointRayCrossesSegments(segmentsToCheck[0].start, lines) % 2 === 1) {
          return INTERSECTED
        }

        // check if the screen space hull is in the lasso
        let crossings = 0
        for (let i = 0, l = hull.length; i < l; i++) {
          const v = hull[i]
          const pCrossings = pointRayCrossesSegments(v, segmentsToCheck)

          if (i === 0) {
            crossings = pCrossings
          }

          // if two points on the hull have different amounts of crossings then
          // it can only be intersected
          if (crossings !== pCrossings) {
            return INTERSECTED
          }
        }

        // check if there are any intersections
        for (let i = 0, l = lines.length; i < l; i++) {
          const boxLine = lines[i]
          for (let s = 0, ls = segmentsToCheck.length; s < ls; s++) {
            if (lineCrossesLine(boxLine, segmentsToCheck[s])) {
              return INTERSECTED
            }
          }
        }

        return crossings % 2 === 0 ? NOT_INTERSECTED : CONTAINED
      },

      intersectsTriangle: (tri, index, contained, depth) => {
        // check all the segments if using no bounds tree
        const segmentsToCheck = perBoundsSegments[depth]

        screenCentroid.copy(tri.a).applyMatrix4(toScreenSpaceMatrix)
        if (contained || pointRayCrossesSegments(screenCentroid, segmentsToCheck) % 2 === 1) {
          indices[indicesIndex++] = indexAttr.getX(index * 3) / 3
          return false
        }

        return false
      }
    })

    return this.highlight(indices.slice(0, indicesIndex))
  }
}
