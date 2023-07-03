<template>
  <popper-card title="组件">
    <template v-for="(component, key) of Object.fromEntries(componentRender)" :key="key">
      <el-divider content-position="left">{{ key }}</el-divider>

      <component :is="component" :object="getComponentObject(key)"></component>
    </template>
  </popper-card>
</template>

<script setup>
  import useSceneStore from '@/stores/scene'
  import * as aframeComponents from '@/toolkits/vue/aframeComponents'

  const COMPONENTS_DICT = Object.fromEntries(
    Object.entries(aframeComponents).map(([key, value]) => [key.toLowerCase(), markRaw(value)])
  )
  const scene = useSceneStore()
  const componentRender = reactive([])

  watch(() => scene.selectedNode, getComponent)

  async function getComponent () {
    componentRender.length = 0
    await nextTick()
    const components = scene.selectedNode.el.components
    Object.entries(components).forEach(([key, value]) => {
      if (`aframe${key.replace('-', '').toLowerCase()}` in COMPONENTS_DICT) {
        componentRender.push([key, COMPONENTS_DICT[`aframe${key.toLowerCase()}`]])
      }
    })
  }

  function getComponentObject (key) {
    return scene.selectedNode.el.components[key]
  }
</script>

<style scoped>
  :deep(.el-divider__text) {
    background-color: var(--el-card-bg-color);
  }
</style>
