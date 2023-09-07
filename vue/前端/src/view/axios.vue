<script setup>
import {ref} from 'vue';
import axios from 'axios';

let data = ref("123456");

function qhd(){
  //发送ajax请求
  axios({
    method: 'GET',
    url: 'http://127.0.0.1:5173/server',
  }).then(requset => {
    data.value = requset.data;
  })
}

function qhd_post(){
  axios({
    method: 'POST',
    url: 'http://127.0.0.1:5173/server',
    data: {
      name: "张三"
    }
  }).then(requset => {
    data.value = requset.data.name;
  })
}
</script>
<template>
    <button @click="qhd()">GET请求</button>
    <button @click="qhd_post()">POST请求</button>
    <div>{{ data }}</div>
</template>