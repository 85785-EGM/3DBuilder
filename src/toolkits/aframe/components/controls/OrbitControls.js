import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MOUSE } from 'three'

export default {
  dependencies: ['camera'],
  schema: {
    target: { type: 'vec3' },
    position: { type: 'vec3' }
  },

  init () {
    const camera = this.el.components.camera.camera
    const renderer = this.el.sceneEl.renderer
    this.controls = new OrbitControls(camera, renderer.domElement)
    // 鼠标滚轮固定为放大，不能改
    // 左键为操作键
    this.controls.mouseButtons.LEFT = -1
    // PAN是平移，按下ctrl｜meta｜shift切换到ROTATE，ROTATE同理
    this.controls.mouseButtons.RIGHT = MOUSE.ROTATE
    this.controls.mouseButtons.MIDDLE = MOUSE.PAN
  },

  update () {
    this.controls.target.copy(this.data.target)
    this.el.components.camera.camera.position.copy(this.data.position)
  },

  getScaleNumber () {
    return this.el.components.camera.camera.position.distanceTo(this.controls.target)
  },

  tock () {
    this.controls.update()
  }
}
