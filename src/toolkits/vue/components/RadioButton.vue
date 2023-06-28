<template>
  <el-radio-group
    v-model="state.radioValue"
    :class="`radio-group radio-group-${layout}`"
    size="large"
  >
    <el-radio-button
      v-for="(item, index) of options.filter(({ disabled }) => !disabled)"
      :key="index"
      :label="item.value ?? `active-${index}`"
      :disabled="item.disabled"
      @click="e => radioButtonClick(e, item.click)"
    >
      <el-icon v-if="item.icon" class="icon" style="vertical-align: middle" :size="20">
        <component :is="ElementPlusIconsVue[item.icon]" />
      </el-icon>
      <span v-if="item.label" class="text" style="vertical-align: middle">{{ item.label }}</span>
    </el-radio-button>
  </el-radio-group>
</template>

<script setup>
  import * as ElementPlusIconsVue from '@element-plus/icons-vue'

  const props = defineProps({
    layout: { type: String, default: 'vertical' }, // vertical horizontal
    keep: { type: Boolean, default: false },
    options: {
      type: Array,
      default: () => [{ label: '按钮1', icon: 'Apple', click: () => console.log('1243') }]
    }
  })
  const state = reactive({
    radioValue: null
  })

  watch(
    () => state.radioValue,
    () => {
      if (props.keep) return
      setTimeout(() => (state.radioValue = null), 80)
    }
  )

  function radioButtonClick (event, callback) {
    if (event.pointerId !== -1) callback()
  }
</script>

<style>
  .radio-group-horizontal .el-radio-button {
    flex: 1;
  }
  .radio-group-horizontal .el-radio-button .el-radio-button__inner {
    width: 100%;
  }
  .radio-group-vertical .el-radio-button .el-radio-button__inner {
    padding: 10px 17px;
    border: var(--el-border);
    transition: all 0.15s;
    font-size: 15px;
    width: 100%;
  }
  .radio-group-vertical .el-radio-button + .el-radio-button .el-radio-button__inner {
    border-top: unset;
  }
  .radio-group-vertical .el-radio-button:first-child .el-radio-button__inner {
    border-radius: var(--el-border-radius-base) var(--el-border-radius-base) 0 0;
  }
  .radio-group-vertical .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0 0 var(--el-border-radius-base) var(--el-border-radius-base);
  }
  .radio-group-vertical {
    flex-direction: column;
  }

  .radio-group .icon + .text {
    margin-left: 8px;
  }

  .radio-group-vertical {
    display: flex !important;
    vertical-align: top;
    width: fit-content;
  }
  .radio-group-vertical + .radio-group-vertical {
    margin-top: 12px;
  }
  .radio-group-horizontal + .radio-group-horizontal {
    margin-left: 12px;
  }
  .radio-group-vertical .el-radio-button {
    width: 100%;
  }
</style>
