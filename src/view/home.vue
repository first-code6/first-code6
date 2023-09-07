<template>
    欢迎来到主页！
</template>
<script setup>
import { home_store } from '../store/home_store' 
import { storeToRefs } from 'pinia';

const homestore = home_store()
const {} = storeToRefs(homestore)

</script>