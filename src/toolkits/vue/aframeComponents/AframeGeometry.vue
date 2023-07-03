<template>
  <div class="fdr group">
    <div class="item">
      <label>primitive</label>
      <el-select-v2 size="small" :options="[]" />
    </div>
  </div>

  <div class="fdr group">
    <div class="item">
      <label>width</label>
      <el-input size="small" />
    </div>
    <div class="item">
      <label>height</label>
      <el-input size="small" />
    </div>
    <div class="item">
      <label>depth</label>
      <el-input size="small" />
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
