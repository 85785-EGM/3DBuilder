<template>
  <div class="fdr group">
    <div class="item">
      <label>opacity</label>
      <el-input-number size="small" :max="1" :min="0" :step="0.01" :precision="2" step-strictly />
    </div>
    <div class="item">
      <label>color</label>
      <el-color-picker size="small" />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 6px;
  }
  .group {
    padding: 6px 0px;
  }
  .item {
    flex: 1;
    display: flex;
    flex-direction: row;
    white-space: nowrap;
  }
  .item + .item {
    margin-left: 12px;
  }
</style>
