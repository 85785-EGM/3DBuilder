<template>
  <a-scene keyboard-shortcuts="enterVR: false" ref="sceneEl" background="color: #3b3b3b">
    <a-cam alias="相机"> </a-cam>
    <a-entity geometry="primitive: box" material @click="attachEntity" />
  </a-scene>

  <teleport to="#layout-left-top">
    <radio-button :options="buttonOptions" />
  </teleport>

  <teleport to="#layout-right-top">
    <SceneTree />
    <SceneComponent />
  </teleport>
</template>

<script setup>
  import SceneTree from './SceneTree.vue'
  import SceneComponent from './SceneComponent.vue'

  const MODES = {
    TRANSLATE: 'translate',
    ROTATE: 'rotate',
    SCALE: 'scale'
  }
  const sceneEl = ref()
  const transformControls = computed(() => sceneEl.value.systems['transform-controls'])
  const buttonOptions = reactive([
    { icon: 'Apple', click: () => (state.mode = MODES.TRANSLATE) },
    { icon: 'Apple', click: () => (state.mode = MODES.ROTATE) },
    { icon: 'Apple', click: () => (state.mode = MODES.SCALE) }
  ])
  const state = reactive({
    mode: 'translate'
  })

  function attachEntity (event) {
    transformControls.value.attach(event.target.object3D)
  }
</script>

<style scoped></style>
