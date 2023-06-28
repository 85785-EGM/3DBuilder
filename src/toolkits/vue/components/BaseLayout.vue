<template>
  <div class="flex-row-center base-layout" :style="{ padding: props.padding }">
    <div class="flex-column-center">
      <div class="max-height">
        <div :id="LAYOUT_SLOT_LEFT_TOP" class="use-pointer-events">
          <slot name="left-top" />
        </div>
      </div>
      <div class="flex-column-center max-height" style="flex: 1">
        <div :id="LAYOUT_SLOT_LEFT" class="use-pointer-events">
          <slot name="left"></slot>
        </div>
      </div>
      <div class="max-height">
        <div :id="LAYOUT_SLOT_LEFT_BOTTOM" class="use-pointer-events">
          <slot name="left-bottom" />
        </div>
      </div>
    </div>

    <div class="flex-column-center" style="flex: 1">
      <div class="max-height">
        <div :id="LAYOUT_SLOT_TOP" class="use-pointer-events">
          <slot name="top"></slot>
        </div>
      </div>
      <div class="max-height" style="flex: 1">
        <div :id="LAYOUT_SLOT_DEFAULT" class="use-pointer-events">
          <slot name="default"></slot>
        </div>
      </div>
      <div class="max-height">
        <div :id="LAYOUT_SLOT_BOTTOM" class="use-pointer-events">
          <slot name="bottom"></slot>
        </div>
      </div>
    </div>

    <div class="flex-column-center">
      <div class="max-height" style="height: 100%">
        <div :id="LAYOUT_SLOT_RIGHT_TOP" class="use-pointer-events">
          <slot name="right-top"></slot>
        </div>
      </div>
      <div class="flex-column-center max-height" style="flex: 1">
        <div :id="LAYOUT_SLOT_RIGHT" class="use-pointer-events">
          <slot name="right"></slot>
        </div>
      </div>
      <div class="max-height">
        <div :id="LAYOUT_SLOT_RIGHT_BOTTOM" class="use-pointer-events">
          <slot name="right-bottom"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    LAYOUT_SLOT_LEFT,
    LAYOUT_SLOT_LEFT_TOP,
    LAYOUT_SLOT_LEFT_BOTTOM,
    LAYOUT_SLOT_RIGHT,
    LAYOUT_SLOT_RIGHT_TOP,
    LAYOUT_SLOT_RIGHT_BOTTOM,
    LAYOUT_SLOT_TOP,
    LAYOUT_SLOT_BOTTOM,
    LAYOUT_SLOT_DEFAULT
  } from '@/views/workspace/teleport.js'

  const props = defineProps({
    padding: { type: String, default: 'var(--large-padding)' }
  })
</script>

<style>
  .flex-row-center {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .flex-column-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>

<style scoped>
  .base-layout {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 100;
    pointer-events: none;
    box-sizing: border-box;
  }
  .use-pointer-events :deep(*) {
    pointer-events: all;
  }
  .use-pointer-events :deep(.fdc) {
    pointer-events: none;
  }
  .use-pointer-events :deep(.fdr) {
    pointer-events: none;
  }
  .use-pointer-events :deep(.fdc *) {
    pointer-events: all;
  }
  .use-pointer-events :deep(.fdr *) {
    pointer-events: all;
  }
  .max-height {
    max-height: 100%;
  }
  .max-height > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;
  }
</style>
