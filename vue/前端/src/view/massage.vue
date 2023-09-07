<template>
  <div class="img">
  </div>
  <div class="test">
    <h1>名字：{{ formValue.name }}：{{ typeof formValue.name }}</h1>
    <h1>电话号码：{{ formValue.phone }}：{{ typeof formValue.phone }}</h1>
    <h1>邮箱：{{ formValue.email }}：{{ typeof formValue.email }}</h1>
    <h1>性别：{{ formValue.sex }}：{{ typeof formValue.sex }}</h1>
    <h1>出生日期：{{ formValue.date }}：{{ typeof formValue.date }}</h1>
    <h1>爱好：{{ formValue.like }}：{{ typeof formValue.like }}</h1>
  </div>
  <div class="form">
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-form
    ref = "formRef"
    :label-width="80"
    :model="formValue"
    :rules="rules"
    size="medium"
    label-placement="left"
    label-width="auto"
    :show-require-mark="false"
    style="flex-direction: column; margin-left: 15%; margin-top: 20%; width: 80%;">
      <n-form-item label="名称" path="name">
        <n-input v-model:value="formValue.name" placeholder="输入姓名"/>
      </n-form-item>
      <n-form-item label="电话号码" path="phone">
        <n-input v-model:value="formValue.phone" placeholder="输入电话" />
      </n-form-item>
      <n-form-item label="电子邮箱" path="email">
        <n-input v-model:value="formValue.email" placeholder="输入电子邮箱" />
      </n-form-item>
      <n-form-item label="性别" path="sex">
        <n-space>
          <n-radio-group v-model:value="formValue.sex" name="radiogroup1">
            <n-radio value="男">
              男
            </n-radio>
            <n-radio value="女">
              女
            </n-radio>
            <n-radio value="保密">
              保密
            </n-radio>
          </n-radio-group>
        </n-space>
      </n-form-item>
      <n-form-item label="出生日期" path="date">
        <n-date-picker v-model:formatted-value="formValue.date" value-format="y-M-d" type="date"></n-date-picker>
      </n-form-item>
      <n-form-item label="兴趣爱好" path="like">
        <n-transfer v-model:value="formValue.like" :options="like_options" />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="massage_store.check">
        验证
        </n-button>
    </n-form-item>
    </n-form>
    </n-config-provider>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { NSpace, NInput, NButton, NForm, NFormItem, NTransfer, zhCN, NConfigProvider, dateZhCN, NDatePicker,
   NRadioGroup, NRadio, useMessage} from 'naive-ui'
import axios from 'axios'
import { massagestore } from '../store/massage_store'
import { storeToRefs } from 'pinia'

const massage_store = massagestore()
const { formValue, formRef} = storeToRefs(massage_store)

let like_options = ["唱", "跳", "rap", "篮球", "music"].map(
  (v) => ({
    label: v,
    value: v
  })
)

let rules = {
  name: [{
    required: true,
    message: '请输入名称',
    trigger: 'blur'
  }],
  phone: [{
    required: true,
    validator: checkage,
    trigger: ['input', 'blur']
  }],
  email: [{
    required: true,
    message: '请输入电子邮箱',
    trigger: ['blur']
  }],
  like: [{
    type: 'array',
    required: true,
    message: '请输入兴趣爱好',
    trigger: ['change']
  }],
  date: [{
    type: 'string',
    required: true,
    trigger: ['blur', 'change'],
    message: '请选择出生年月'
  }],
  sex: [{
    required: true,
    trigger: ['blur'],
    message: '请输入性别'
  }]
}

function checkage(rule, value) {
  if (!value) {
    return new Error("需要年龄");
  } else if (!/^\d*$/.test(value)) {
    return new Error("年龄应该为整数");
  } else if (Number(value) < 18) {
    return new Error("年龄应该超过十八岁");
  }
  return true
}

</script>
<style scoped>
@import '../css/massage.css';
</style>