<template>
  <popper-card title="组件">
    <template v-for="(component, key) of Object.fromEntries(componentRender)" :key="key">
      <el-divider content-position="left">{{ key }}</el-divider>

      <component :is="component"></component>
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

  function getComponent () {
    componentRender.length = 0
    const components = scene.selectedNode.el.components

    Object.entries(components).forEach(([key, value]) => {
      if (`aframe${key.toLowerCase()}` in COMPONENTS_DICT) {
        componentRender.push([key, COMPONENTS_DICT[`aframe${key.toLowerCase()}`]])
      }
    })
  }
</script>

<style scoped>
  :deep(.el-divider__text) {
    background-color: var(--el-card-bg-color);
  }
</style>
