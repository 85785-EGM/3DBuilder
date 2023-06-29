<template>
  <router-view v-slot="{ Component }">
    <base-layout> </base-layout>

    <system-top-bar ref="systemTopBarRef"></system-top-bar>

    <component :is="Component" ref="worksapceRef"></component>
  </router-view>
</template>

<script setup>
  const systemTopBarRef = ref()

  window.addEventListener('click', () => systemTopBarRef.value.reset())
</script>

<style scoped></style>
