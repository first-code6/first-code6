<script setup>
import { NMessageProvider } from 'naive-ui';

</script>

<template>
  <NMessageProvider>
  <RouterView>
  </RouterView>
  </NMessageProvider>
</template>

<style>
/* 解决高度坍缩问题 */
html, body, #app{
  width: 100%;
  height: 100%;
}
</style>