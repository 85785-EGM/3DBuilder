import { BoxGeometry, Mesh, SphereGeometry } from 'three'

const CLASS_DICT = {
  box: BoxGeometry,
  sphere: SphereGeometry
}
const OPTION_DICT = {
  box: [],
  sphere: []
}

export default function (type, option) {
  const scene = document.querySelector('a-scene')
  const el = document.createElement('a-entity')

  const geometry = new CLASS_DICT[type](...OPTION_DICT[type]).toNonIndexed()
  el.setAttribute('default-material', {})
  const material = el.components['default-material'].getMaterial()
  el.setObject3D('mesh', new Mesh(geometry, material))

  scene.appendChild(el)
}
