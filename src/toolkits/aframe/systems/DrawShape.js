import { Line, Vector2, MathUtils } from 'three'
import { Entity } from 'aframe'

const selectionShape = new Line()
const selectionPoints = []

let startX = -Infinity
let startY = -Infinity

let prevX = -Infinity
let prevY = -Infinity

const tempVec0 = new Vector2()
const tempVec1 = new Vector2()
const tempVec2 = new Vector2()

const pointerdown = function (e) {
  if (!this.data) return
  this.initLine()
  prevX = e.clientX
  prevY = e.clientY
  startX = (e.clientX / window.innerWidth) * 2 - 1
  startY = -((e.clientY / window.innerHeight) * 2 - 1)
  selectionPoints.length = 0
  selectionShape.geometry.deleteAttribute('position')
}

const pointerup = function (e) {
  if (!this.data) return
  selectionShape.visible = false
  if (selectionPoints.length) {
    // 绘制结束
    this.el.emit('selection', selectionPoints)
  }
}

const pointermove = function (e) {
  if (!this.data) return
  // If the left mouse button is not pressed
  if ((1 & e.buttons) === 0) {
    return
  }

  const ex = e.clientX
  const ey = e.clientY

  const nx = (e.clientX / window.innerWidth) * 2 - 1
  const ny = -((e.clientY / window.innerHeight) * 2 - 1)

  // If the mouse hasn't moved a lot since the last point
  if (Math.abs(ex - prevX) >= 3 || Math.abs(ey - prevY) >= 3) {
    // Check if the mouse moved in roughly the same direction as the previous point
    // and replace it if so.
    const i = selectionPoints.length / 3 - 1
    const i3 = i * 3
    let doReplace = false
    if (selectionPoints.length > 3) {
      // prev segment direction
      tempVec0.set(selectionPoints[i3 - 3], selectionPoints[i3 - 3 + 1])
      tempVec1.set(selectionPoints[i3], selectionPoints[i3 + 1])
      tempVec1.sub(tempVec0).normalize()

      // this segment direction
      tempVec0.set(selectionPoints[i3], selectionPoints[i3 + 1])
      tempVec2.set(nx, ny)
      tempVec2.sub(tempVec0).normalize()

      const dot = tempVec1.dot(tempVec2)
      doReplace = dot > 0.99
    }

    if (doReplace) {
      selectionPoints[i3] = nx
      selectionPoints[i3 + 1] = ny
    } else {
      selectionPoints.push(nx, ny, 0)
    }

    this.selectionShapeNeedsUpdate = true
    selectionShape.visible = true

    prevX = ex
    prevY = ey
  }
}

export default {
  schema: { type: 'boolean', default: false },

  init () {
    this.alreadyInit = false
    this.bindEvent(this.el.renderer.domElement)
  },

  initLine () {
    if (this.alreadyInit) return
    selectionShape.material.color.set(0xff9800).convertSRGBToLinear()
    selectionShape.renderOrder = 1
    selectionShape.position.z = -1
    selectionShape.depthTest = false
    selectionShape.scale.setScalar(1)
    this.el.camera.add(selectionShape)
    this.alreadyInit = true
  },

  bindEvent (el = new Element()) {
    el.addEventListener('pointerdown', pointerdown.bind(this))
    el.addEventListener('pointerup', pointerup.bind(this))
    el.addEventListener('pointermove', pointermove.bind(this))
  },

  tock () {
    if (this.selectionShapeNeedsUpdate) {
      const ogLength = selectionPoints.length
      // 为了首位相连
      selectionPoints.push(selectionPoints[0], selectionPoints[1], selectionPoints[2])

      selectionShape.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(selectionPoints, 3, false)
      )

      selectionPoints.length = ogLength

      selectionShape.frustumCulled = false
      this.selectionShapeNeedsUpdate = false
    }
    const camera = this.el.camera
    const yScale = Math.tan((MathUtils.DEG2RAD * camera.fov) / 2) * selectionShape.position.z
    selectionShape.scale.set(-yScale * camera.aspect, -yScale, 1)
  }
}
