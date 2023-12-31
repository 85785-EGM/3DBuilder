import useHistoryStore from '@/stores/history'
import { MatrixCommit } from '@/utils/commit'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

const DEFAULT_ATTACH_OPTION = {
  object3DName: 'mesh',
  mode: 'translate', // translate rotate scale
  enabledXYZ: 'xyz',
  size: 1
}

function pointerup (preMatrix) {
  if (!this.dragging) {
    this.el.emit('click-blank')
  }
}

export default {
  initControl () {
    if (this.controls) return
    const dom = this.el.renderer.domElement
    const camera = this.el.camera

    this.controls = new TransformControls(camera, dom)
    this.el.setObject3D('transformControls', this.controls)
  },

  attach (object3D, options = {}) {
    this.initControl()
    const { mode, enabledXYZ, size } = { ...DEFAULT_ATTACH_OPTION, ...options }
    this.controls.setMode(mode)
    this.controls.setSize(size)

    this.controls.showX = false
    this.controls.showY = false
    this.controls.showZ = false
    if (/[xX]/.test(enabledXYZ)) this.controls.showX = true
    if (/[yY]/.test(enabledXYZ)) this.controls.showY = true
    if (/[zZ]/.test(enabledXYZ)) this.controls.showZ = true
    this.controls.attach(object3D)

    // 为了避免重复绑定，所以额外解除事件
    this.el.renderer.domElement.removeEventListener('pointerup', this.pointerup)
    this.pointerup = pointerup.bind(this, object3D.matrix.clone())
    this.el.renderer.domElement.addEventListener('pointerup', this.pointerup)

    return object3D
  },
  detach () {
    this.controls.detach()
    this.el.renderer.domElement.removeEventListener('pointerup', this.pointerup)
  },
  initControls () {},

  tick () {
    this.dragging = this.controls?.dragging
    if (this.controls?.object) {
      this.controls.visible = this.controls?.object.visible
    }
  }
}
