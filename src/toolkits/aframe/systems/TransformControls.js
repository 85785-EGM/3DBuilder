import { BufferGeometry, Vector3, TextureLoader, SpriteMaterial, Sprite } from 'three'
import { Entity } from 'aframe'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { MatrixCommit } from '@/utils/commit'
import useHistoryStore from '@/stores/history'

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

function getSprite () {
  const loader = new TextureLoader()
  const result = {
    x: null,
    y: null,
    z: null
  }

  for (const axis in result) {
    const map = loader.load(`https://wukong-machine.oss-cn-nanjing.aliyuncs.com/${axis}.png`)
    const material = new THREE.SpriteMaterial({ map: map })
    const sprite = new THREE.Sprite(material)
    material.depthTest = false
    material.depthWrite = false
    sprite.scale.set(15, 15, 1)
    result[axis] = sprite
  }

  return result
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
    this.el.renderer.domElement.removeEventListener('pointerup', this.pointerup)
    this.pointerup = pointerup.bind(this, object.matrix.clone())
    this.el.renderer.domElement.addEventListener('pointerup', this.pointerup)

    this.onChange()

    return object
  },
  detach () {
    if (!this.controls) return
    this.controls.detach()
    this.el.renderer.domElement.removeEventListener('pointerup', this.pointerup)
    this.onChange(true)
  },
  initControls () {
    if (this.controls) return
    const dom = this.el.renderer.domElement
    const camera = this.el.camera

    this.helperText = getSprite()
    this.history = useHistoryStore()
    this.controls = new TransformControls(camera, dom)
    this.el.setObject3D('transformControls', this.controls)

    this.transformControlsPlane = this.el
      .getObject3D('transformControls')
      .children.find(({ type }) => type === 'TransformControlsPlane')
    this.el.getObject3D('transformControls').add(...Object.values(this.helperText))
    this.cameraComponent = document.querySelector('a-cam').components['orbit-controls']
  },

  tick () {
    this.dragging = this.controls?.dragging
    if (this.controls?.object) {
      this.controls.visible = this.controls?.object.visible
    }

    if (this.helperText) {
      const scaleNumber = this.cameraComponent.getScaleNumber()
      this.helperText.x.position.copy(this.transformControlsPlane.position)
      this.helperText.y.position.copy(this.transformControlsPlane.position)
      this.helperText.z.position.copy(this.transformControlsPlane.position)

      this.helperText.x.position.x += scaleNumber * 0.14
      this.helperText.y.position.y += scaleNumber * 0.14
      this.helperText.z.position.z += scaleNumber * 0.14

      this.helperText.x.scale.set(scaleNumber * 0.02, scaleNumber * 0.02, 1)
      this.helperText.y.scale.set(scaleNumber * 0.02, scaleNumber * 0.02, 1)
      this.helperText.z.scale.set(scaleNumber * 0.02, scaleNumber * 0.02, 1)
    }
  }
}
