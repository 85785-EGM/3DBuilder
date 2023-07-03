export default function (type, option) {
  const scene = document.querySelector('a-scene')
  const el = document.createElement('a-entity')

  el.setAttribute('geometry', `primitive:${type}`)
  el.setAttribute('material', {})

  scene.appendChild(el)
}
