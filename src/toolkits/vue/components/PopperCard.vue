<template>
  <el-card
    class="popper-card"
    :style="{ width }"
    :body-style="{ overflow: bodyAutoScroll ? 'auto' : 'hidden', ...bodyStyle }"
  >
    <template v-if="!disabledHeader" #header>
      <div class="fdr card-header">
        <slot name="header-left">
          <span>{{ title }}</span>
        </slot>

        <slot name="header-right">
          <el-button
            class="button"
            link
            :icon="CloseBold"
            style="font-size: 17px"
            @click="emit('close')"
          />
        </slot>
      </div>
    </template>

    <div class="popper-card-content">
      <slot> </slot>
    </div>
  </el-card>
</template>

<script setup>
  import { CloseBold } from '@element-plus/icons-vue'

  const emit = defineEmits(['close'])
  const props = defineProps({
    title: { type: String, default: '标题名称' },
    width: { type: String, default: '340px' },
    bodyAutoScroll: { type: Boolean, default: true },
    bodyStyle: { type: Object, default: () => ({}) },

    disabledHeader: { type: Boolean, default: false }
  })
</script>

<style scoped>
  .popper-card {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .popper-card :deep(.el-card__body) {
    flex: 1;
    overflow: hidden;
    padding: var(--large-padding);
  }
  .popper-card + .popper-card {
    margin-top: var(--default-padding);
  }
  .popper-card :deep(.el-card__header) {
    padding: var(--default-padding) var(--large-padding);
  }
  .card-header {
    align-items: center;
    justify-content: space-between;
    line-height: 22px;
    height: 22px;
    font-size: 16px;
  }
  .popper-card-content {
    font-size: 15px;
    height: 100%;
  }
</style>
