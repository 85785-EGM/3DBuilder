export default {
  mounted (el, binding, vnode, prevVnode) {
    const target = document.getElementById(binding.value)
    target.appendChild(el)
  },
  updated (el, binding, vnode, prevVnode) {
    if (binding.oldValue === binding.value) return
    const lastTarget = document.getElementById(binding.oldValue)
    const target = document.getElementById(binding.value)
    lastTarget?.removeChild(el)
    target.appendChild(el)
  },
  unmounted (el, binding, vnode) {
    const target = document.getElementById(binding.value)
    try {
      target.removeChild(el)
    } catch (e) {
      el.remove()
    }
  }
}
