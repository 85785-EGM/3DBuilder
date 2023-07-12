import useHistoryStore from '@/stores/history'
import { MatrixCommit } from '@/utils/commit'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

const DEFAULT_ATTACH_OPTIONs = {
  object3DName: 'mesh',
  mode: 'translate', // translate rotate scale
  enabledXYZ: 'xyz',
  size: 1
}

function pointerup (preMatrix) {
  if (this.dragging) {
    const object = this.controls.object
    object.updateWorldMatrix()
    const commit = new MatrixCommit(object, preMatrix.clone(), object.matrix.clone())
    this.history.push(commit)
    preMatrix.copy(object.matrix)
  } else {
    this.el.emit('click-blank')
  }
}

export default {
  attach (el, options = {}) {
    this.el.systems['draw-shape'].data = false
    this.initControls()
    this.options = JSON.parse(JSON.stringify(options))
    const { object3DName, mode, enabledXYZ, size } = { ...DEFAULT_ATTACH_OPTIONs, ...options }
    const object = reactive(el.object3D)
    this.controls.setMode(mode)
    this.controls.setSize(size)

    this.controls.showX = false
    this.controls.showY = false
    this.controls.showZ = false
    if (/[xX]/.test(enabledXYZ)) this.controls.showX = true
    if (/[yY]/.test(enabledXYZ)) this.controls.showY = true
    if (/[zZ]/.test(enabledXYZ)) this.controls.showZ = true
    this.controls.attach(object)

    // 为了避免重复绑定，所以额外解除事件
    // this.el.renderer.domElement.removeEventListener('pointerup', this.pointerup)
    // this.pointerup = pointerup.bind(this, object.matrix.clone())
    // this.el.renderer.domElement.addEventListener('pointerup', this.pointerup)

    this.onChange?.()

    return object
  },
  detach () {
    if (!this.controls) return
    this.controls.detach()
    // this.el.renderer.domElement.removeEventListener('pointerup', this.pointerup)
    this.onChange?.()
  },
  initControls () {
    if (this.controls) return
    const dom = this.el.renderer.domElement
    const camera = this.el.camera

    this.history = useHistoryStore()
    this.controls = new TransformControls(camera, dom)
    this.el.setObject3D('transformControls', this.controls)
  },

  tick () {
    this.dragging = this.controls?.dragging
    if (this.controls?.object) {
      this.controls.visible = this.controls?.object.visible
    }
  }
}
