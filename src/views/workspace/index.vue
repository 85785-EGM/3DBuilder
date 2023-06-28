<template>
  <router-view v-slot="{ Component }">
    <base-layout padding="0"> </base-layout>

    <system-top-bar></system-top-bar>

    <component :is="Component" ref="worksapceRef"></component>
  </router-view>
</template>

<script setup></script>

<style scoped></style>
