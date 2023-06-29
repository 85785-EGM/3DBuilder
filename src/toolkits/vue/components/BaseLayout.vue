<template>
  <div class="flex-row-center base-layout" :style="{ padding: props.padding }">
    <div class="flex-column-between">
      <div :id="layout.LAYOUT_LEFT_TOP" class="use-pointer-events"></div>
      <div :id="layout.LAYOUT_LEFT" class="use-pointer-events"></div>
      <div :id="layout.LAYOUT_LEFT_BOTTOM" class="use-pointer-events"></div>
    </div>

    <div class="flex-column-between" style="flex: 1">
      <div :id="layout.LAYOUT_TOP" class="use-pointer-events"></div>
      <div :id="layout.LAYOUT_DEFAULT" class="use-pointer-events"></div>
      <div :id="layout.LAYOUT_BOTTOM" class="use-pointer-events"></div>
    </div>

    <div class="flex-column-between">
      <div :id="layout.LAYOUT_RIGHT_TOP" class="use-pointer-events"></div>
      <div :id="layout.LAYOUT_RIGHT" class="use-pointer-events"></div>
      <div :id="layout.LAYOUT_RIGHT_BOTTOM" class="use-pointer-events"></div>
    </div>
  </div>
</template>

<script setup>
  import { layout } from '@/config.js'

  const props = defineProps({
    padding: { type: String, default: '6px' }
  })
</script>

<style>
  .flex-row-center {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .flex-column-between {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>

<style scoped>
  .base-layout {
    position: absolute;
    left: 0px;
    top: var(--system-top-bar-height);
    width: 100%;
    height: calc(100% - var(--system-top-bar-height));
    overflow: hidden;
    z-index: 100;
    pointer-events: none;
    box-sizing: border-box;
  }
  .use-pointer-events :deep(*) {
    pointer-events: all;
  }
</style>
