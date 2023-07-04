<template>
  <div class="aframe-component-group">
    <div class="aframe-component-item">
      <label>opacity</label>
      <el-input-number
        v-model="data.opacity"
        size="small"
        :max="1"
        :min="0"
        :step="0.01"
        :precision="2"
        step-strictly
      />
    </div>
    <div class="aframe-component-item">
      <label>color</label>
      <el-color-picker v-model="data.color" size="small" />
    </div>
  </div>
  <div class="aframe-component-group">
    <div class="aframe-component-item">
      <label>side</label>
      <el-select v-model="data.side" size="small">
        <el-option label="front" value="front" />
        <el-option label="back" value="back" />
        <el-option label="double" value="double" />
      </el-select>
    </div>
    <div class="aframe-component-item">
      <label>flatShading</label>
      <el-switch v-model="data.flatShading" size="small" />
    </div>
  </div>
  <div class="aframe-component-group">
    <div class="aframe-component-item">
      <label>wireframe</label>
      <el-switch v-model="data.wireframe" size="small" />
    </div>
    <div class="aframe-component-item"></div>
  </div>
</template>

<script setup>
  const props = defineProps({
    object: { type: Object, required: true }
  })
  const data = reactive(props.object.data)

  watch(() => Object.entries(data), update)

  function update () {
    props.object.el.setAttribute(props.object.attrName, data)
  }
</script>
