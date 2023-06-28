import { Mesh } from 'three'

export default {
  dependencies: ['material'],
  schema: {
    visible: { type: 'boolean', default: true },
    src: { type: 'model' }
  },
  update (newV, oldV) {
    this.load()
    const mesh = this.el.getObject3D('mesh')
    if (mesh) {
      mesh.visible = this.data.visible
    }
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
    if (!this.data.src) return
    if (this.lastSrc === this.data.src) return

    this.lastSrc = this.data.src
    this.el.getObject3D('mesh')?.geometry?.dispose()
    const geometry = await this.systemLoad(this.data.src)
    const material = this.el.components.material.material
    const mesh = new Mesh(geometry, material)
    this.el.setObject3D('mesh', mesh)
    this.el.emit('model-ready', {}, false)
    mesh.visible = this.data.visible
  },

  async systemLoad (src) {
    return await this.el.sceneEl.systems['stl-model'].load(src, data => {
      this.el.emit('model-loading', data, false)
    })
  }
}
