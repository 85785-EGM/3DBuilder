<template>
  <popper-card title="3D场景">
    <el-tree :data="scene.treeData" default-expand-all highlight-current @node-click="selectNode" />
  </popper-card>
</template>

<script setup>
  import useSceneStore from '@/stores/scene'

  const scene = useSceneStore()

  function selectNode (node) {
    scene.selectedNode = node
  }
</script>

<style scoped>
  :deep(.el-tree-node) {
    font-size: 13px;
  }
</style>
