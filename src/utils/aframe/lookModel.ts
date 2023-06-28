import { Entity } from 'aframe'
import { parse } from '.'

const LOOK_DISTANCE_RATE = 3

interface LookModelOptions {
  objectName: string
  fromAxis: string
}

const DEFAULT_OPTIONS: LookModelOptions = {
  objectName: 'mesh',
  fromAxis: 'x'
}

export default function (el: Entity, _options?: LookModelOptions) {
  if (!el) return
  const options: LookModelOptions = { ...DEFAULT_OPTIONS, ..._options }
  const object3D: any = el.getObject3D(options.objectName)

  if (!object3D?.geometry) return
  if (!object3D.geometry.boundingSphere) object3D.geometry.computeBoundingSphere()
  const camera = document.querySelector('a-scene a-cam')
  const target = object3D.geometry.boundingSphere.center.clone()
  const position = target.clone()

  const positionAxis = options.fromAxis.startsWith('-')
    ? object3D.geometry.boundingSphere.radius * LOOK_DISTANCE_RATE
    : -(object3D.geometry.boundingSphere.radius * LOOK_DISTANCE_RATE)

  // 让相机远离模型
  if (/[xX]/.test(options.fromAxis)) position.x += positionAxis
  else if (/[yY]/.test(options.fromAxis)) position.y += positionAxis
  else if (/[zZ]/.test(options.fromAxis)) position.z += positionAxis

  camera.setAttribute(
    'orbit-controls',
    parse({ target: target.toArray().join(' '), position: position.toArray().join(' ') })
  )
  camera.components['orbit-controls'].update()
  return true
}
