import useSceneStore from '@/stores/scene.js'

export default function (type, option) {
  const scene = useSceneStore()

  if (!scene.selectedNode?.el) return
  const exporter = scene.selectedNode.el.sceneEl.systems[`${type}-export`]
  console.log(exporter)
  const name = scene.selectedNode.label ? `${scene.selectedNode.label}.${type}` : null
  exporter.export(scene.selectedNode.el.object3D, { name })
}
