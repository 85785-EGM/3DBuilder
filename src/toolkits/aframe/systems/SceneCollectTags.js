import sceneStore from '@/stores/scene'

const DEFINE_TAG_LABEL = {
  'A-CAM': '相机',
  'A-MODEL': '模型'
}

function getNodeLabel (node = new Element()) {
  let label = ''
  if ((label = node.getAttribute('label'))) return label
  if ((label = DEFINE_TAG_LABEL[node.tagName])) return label
  return node.tagName
}

function getChildrenNode (node = new Element()) {
  return Array.from(node.children)
    .filter(child => child.tagName.startsWith('A-') && !child.tagName.endsWith('ENTITY'))
    .map(child => ({
      el: child,
      label: getNodeLabel(child),
      children: getChildrenNode(child)
    }))
}

export default {
  schema: {},

  init () {
    this.scene = sceneStore()

    // 监听场景内变化
    const observer = new MutationObserver(this.observerCallback.bind(this))
    observer.observe(this.el, {
      childList: true, // 观察目标子节点的变化，是否有添加或者删除
      attributes: false, // 观察属性变动
      subtree: true // 观察后代节点，默认为 false
    })
  },

  observerCallback (mutationList, observer) {
    const treeData = getChildrenNode(this.el)
    this.scene.initTree([{ el: this.el, label: '3D 场景', disabled: true, children: treeData }])
  }
}
