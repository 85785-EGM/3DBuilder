import { Mesh, Points, PointsMaterial, Vector3, Box3 } from 'three'
import useSettingStore from '@/stores/setting'

function handleNANValue (geometry) {
  // const nanIndex = []
  // const attribute = geometry.getAttribute('position')
  // const v = new Vector3()
  // const box = new Box3()
  // const center = new Vector3()
  // box.setFromBufferAttribute(attribute)
  // box.getCenter(center)
  // let maxRadiusSq = 0

  // for (let i = 0, count = attribute.count; i < count; i++) {
  //   v.fromBufferAttribute(attribute, i)
  //   maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(v))
  // }

  return geometry
}

export default {
  dependencies: ['material'],
  schema: {
    visible: { type: 'boolean', default: true },
    opacity: { type: 'number', default: 0.5 },
    src: { type: 'model' },
    renderMode: { type: 'string', default: 'points', oneOf: ['points', 'mesh'] }
  },

  init () {
    const settingState = useSettingStore()
    this.setting = settingState.$state
    this.pointsMaterial = new PointsMaterial({
      color: this.el.components.material.material.color,
      size: this.setting.POINT_CLOUD_SIZE,
      vertexColors: false
    })
    this.el.setObject3D('mesh', new Mesh())

    // 系统设置实时修改
    settingState.onChange(() => {
      this.pointsMaterial.color = this.el.components.material.material.color
      this.pointsMaterial.size = this.setting.POINT_CLOUD_SIZE
    })
  },

  update () {
    this.pointsMaterial.transparent = true
    this.pointsMaterial.opacity = this.data.opacity
    this.load()
    const mesh = this.el.getObject3D('mesh')
    if (mesh) mesh.visible = this.data.visible
  },
  remove () {
    const mesh = this.el.getObject3D('mesh')
    if (mesh) {
      mesh.geometry.dispose()
      mesh.material.dispose()
      this.el.removeObject3D('mesh')
    }
  },
  async load () {
    const { src } = this.data

    if (!src) return
    if (this.lastSrc === src) return

    this.lastSrc = src
    this.el.getObject3D('mesh')?.geometry?.dispose()
    const system = this.el.sceneEl.systems['ply-model']

    const geometry = handleNANValue(this.geometry ?? (await this.systemLoad(src)))
    this.geometry = geometry
    const mesh = this.createObject3D(geometry)
    // 这里objectName设置为mesh且设置前没有object3D，会导致点云第一次无法加载
    // 但为了统一物体objectName，所以统一设置为mesh便于读取
    this.el.setObject3D('mesh', mesh)
    this.el.emit('model-ready', {}, false)
    mesh.visible = this.data.visible
  },

  async systemLoad (src) {
    return await this.el.sceneEl.systems['ply-model'].load(src, data => {
      this.el.emit('model-loading', data, false)
    })
  },

  createObject3D (geometry) {
    const { renderMode } = this.data
    if (renderMode === 'points') {
      return this.createPoints(geometry)
    }
    if (renderMode === 'mesh') {
      return this.createMesh(geometry)
    }
  },

  createMesh (geometry) {
    return new Mesh(geometry, this.el.components.material.material)
  },
  createPoints (geometry) {
    return new Points(geometry, this.pointsMaterial)
  }
}
