<template>
  <router-view />
  <system-services />
</template>

<script setup>
  import useSettingStore from '@/stores/setting'

  const setting = useSettingStore().$state
</script>

<style>
  @import url('./style/element-dark.css');
  @import url('./style/index.css');
</style>
