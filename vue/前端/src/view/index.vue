<script setup>
import { onMounted, watch } from 'vue';
import axios from 'axios';
import { index_store } from '../store/index_store';
import { storeToRefs } from 'pinia';

const indexstore = index_store()
const {add_uid, add_passwd, add_passwd_text, uid, passwd, test_id, div_alert, div_alert_text, uid_ok, passwd_ok
    , login_ok, test_id_bind, text_bind, add_passwd_bind_erro, add_passwd_bind} = storeToRefs(indexstore)
axios.defaults.baseURL = 'http://127.0.0.1:5173'
//设置账号密码变量

//.lazy 在取消成为焦点后才更新数据

// 判断账号格式是否正确并且监听输入的账号并发送后端判断
watch(
    add_uid,
    (newData, oldData) => {
        let data = newData
        for(let i = 0;i < data.length; i++){
            if(data.charCodeAt(i) > 255){
                text_bind.value.class = "erro"
                test_id_bind.value.class = "font_1_erro"
                test_id.value = "账号不允许使用中文！"
                login_ok.value.backgroundColor = "#A9A9A9"
                uid_ok.value = false
                return
            }
        }
        if(data == ""){
            text_bind.value.class = "text_1"
            test_id_bind.value.class = "font_1"
            test_id.value = "请输入新建的账号："
            login_ok.value.backgroundColor = "#A9A9A9"
            uid_ok.value = false
        }
        else if(data.length > 16){
            text_bind.value.class = "erro"
            test_id_bind.value.class = "font_1_erro"
            test_id.value = "账号长度应低于16个字节！"
            login_ok.value.backgroundColor = "#A9A9A9"
            uid_ok.value = false
        }
        else if(data.indexOf(" ") != -1){
            text_bind.value.class = "erro"
            test_id_bind.value.class = "font_1_erro"
            test_id.value = "账号不允许含有空格！"
            login_ok.value.backgroundColor = "#A9A9A9"
            uid_ok.value = false
        }
        else{
            axios({
                method: 'POST',
                url: '/index/server',
                // 发送账号，pd代码表示是申明返回执行什么函数
                data: {
                    new: newData,
                    pd: 3
                }
            }).then(requset => {
                // 如果返回代码6则代表账户已有人将字体与样式均改为erro样式
                if(requset.data === 6){
                    text_bind.value.class = "erro"
                    test_id_bind.value.class = "font_1_erro"
                    test_id.value = "该账号已被使用！"
                    login_ok.value.backgroundColor = "#A9A9A9"
                    uid_ok.value = false
                    return
                }
                // 否则则代表账户可以使用
                else{
                    text_bind.value.class = "text_1"
                    test_id_bind.value.class = "font_1"
                    test_id.value = "请输入新建的账号："
                    if(passwd_ok.value == true){
                        login_ok.value.backgroundColor = "#FFFFFF"
                    }
                    uid_ok.value = true
                    return
                }
            })
        }
    }
)
// 判断密码格式是否正确
watch(
    add_passwd,
    (newData,oldData) => {
        let data = newData
        if(data == ""){
            add_passwd_bind_erro.value.class = "font_1"
            add_passwd_text.value = "请输入您的密码："
            add_passwd_bind.value.class = "password_1"
            login_ok.value.backgroundColor = "#A9A9A9"
            passwd_ok.value = false
        }
        else if(data.length > 16){
            add_passwd_bind_erro.value.class = "font_1_erro"
            add_passwd_text.value = "密码长度需要低于16个字符"
            add_passwd_bind.value.class = "passwd_1_erro"
            login_ok.value.backgroundColor = "#A9A9A9"
            passwd_ok.value = false
        }
        else if(data.length < 6){
            add_passwd_bind_erro.value.class = "font_1_erro"
            add_passwd_text.value = "密码长度需要6个字符以上"
            add_passwd_bind.value.class = "passwd_1_erro"
            login_ok.value.backgroundColor = "#A9A9A9"
            passwd_ok.value = false
        }
        else if(data.indexOf(" ") != -1){
            add_passwd_bind_erro.value.class = "font_1_erro"
            add_passwd_text.value = "密码不允许含有空格！"
            add_passwd_bind.value.class = "passwd_1_erro"
            login_ok.value.backgroundColor = "#A9A9A9"
            passwd_ok.value = false
        }
        else{
            add_passwd_bind_erro.value.class = "font_1"
            add_passwd_text.value = "请输入您的密码："
            add_passwd_bind.value.class = "password_1"
            if(uid_ok.value == true){
                login_ok.value.backgroundColor = "#FFFFFF"
            }
            passwd_ok.value = true
        }
    }
)

</script>
<template>
    <div class="img">
    </div>
    <div class="screen">
    <div class="all">
    <TransitionGroup name="div">
    <div v-if="div_alert" class="div_alert_display" v-text="div_alert_text"></div>
    </TransitionGroup>
    <div class="all_login" id="box_login">
        <div class="log">
            <h1>Login</h1>
        </div>
        <div class="form">
        <form class="form_1">
            <div class="font_1">请输入账号：</div>
            <input type="text" id="l_text" name="text_out" class="text_1" v-model.lazy="uid">
            <br>
            <div class="font_1" >请输入密码：</div>
            <input type="password" id="l_password" name="password_out"
            class="password_1" v-model="passwd">
            <div class="font_1">没有账号？
                <a href="#" id = "login_a" @click="indexstore.zc_a()">立刻注册</a>
            </div>
            <br>
            <input type="button" id="button" class="button_1" @click="indexstore.dl(1)" value="登录">
        </form>
        </div>
    </div>
    <div class="all_sign_up" id="box_sigin_up">
        <div class="log">
            <h1>sign</h1>
        </div>
        <div class="form">
        <form class="form_1" method="post" action="/">
            <div v-bind="test_id_bind" v-text="test_id"></div>
            <input type="text" id="s_text" name="text_in" v-bind="text_bind" v-model.lazy="add_uid">
            <br>
            <div v-bind="add_passwd_bind_erro" v-text="add_passwd_text"></div>
            <input type="password" id="s_password" name="password_in"
            v-bind="add_passwd_bind" v-model="add_passwd">
            <div class="font_2">已有账号？
                <a href="#" @click="indexstore.dl_a()">立刻登录</a>
            </div>
            <br>
            <input type="button" id="button_s" :style="login_ok" class="button_1" @click="indexstore.dl(2)" value="注册">
        </form>
        </div>
    </div>
    </div>
</div>
</template>
<style scoped>
@import '../css/index.css';
.erro{
    border: none;
    background-color: rgba(255, 209, 209, 0);
    border-bottom: 1px solid rgb(255, 78, 78);
    margin-bottom: 15px;
    font-size: 18px;
    width: 300px;
    height: 35px;
    outline: none;
}
.passwd_1_erro{
    border: none;
    background-color: rgba(116, 72, 72, 0);
    border-bottom: 1px solid rgb(255, 78, 78);
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 35px;
    width: 300px;
    height: 35px;
    outline: none;
}
.font_1_erro{
    font-weight: 200;
    color: rgb(255, 78, 78);
}
.div_alert_display{
    float: left;
    position: absolute;
    background-color: rgba(39, 37, 37, 0.89);
    width: 200px;
    height: 120px;
    z-index: 100;
    margin-left: 100px;
    margin-top: 140px;
    border-radius: 20px;
    color:azure;
    text-align: center;
    line-height: 120px;
}
.div-enter-from,.div-leave-to{
    opacity: 0;
    transform: translateY(30px);
}
.div-enter-to,.div-leave{
    opacity:1;
}
.div-enter-active,.div-leave-active{
    transition: all 0.5s;
}
</style>