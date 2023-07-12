<template>
  <a-scene keyboard-shortcuts="enterVR: false" ref="sceneEl" background="color: #3b3b3b">
    <a-cam alias="相机"> </a-cam>
    <a-entity geometry="primitive: box" material />
  </a-scene>

  <teleport to="#layout-left-top"> asdf </teleport>

  <teleport to="#layout-right-top">
    <SceneTree />
    <SceneComponent />
  </teleport>
</template>

<script setup>
  import SceneTree from './SceneTree.vue'
  import SceneComponent from './SceneComponent.vue'
</script>

<style scoped></style>
