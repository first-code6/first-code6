import { defineStore } from "pinia";
import { ref,reactive } from 'vue';
import axios from 'axios'
import { useRouter } from "vue-router";

export const index_store = defineStore('index', ()=> {

    const router = useRouter()
    let add_uid = ref('')
    let add_passwd = ref('')
    let uid = ref('')
    let passwd = ref('')
    let test_id = ref('请输入新建的账号：')
    let add_passwd_text = ref('请输入您的密码：')
    let div_alert_text = ref('账号或者密码错误！')
    let div_alert = ref(false)
    let uid_ok = ref(false)
    let passwd_ok = ref(false)

    let add_passwd_bind = ref({
        class: "password_1"
    })
    let add_passwd_bind_erro = ref({
        class: "font_1"
    })
    let text_bind = ref({
        class: "text_1"
    })
    let test_id_bind = ref({
        class: "font_1"
    })
    let login_ok = ref({
        backgroundColor: '#A9A9A9'
    })

    function zc_a(){
        let div_login = document.getElementById("box_login");
        let div_sign = document.getElementById("box_sigin_up");
        div_login.style.float = "right";
        div_sign.style.float = "left";
        uid.value = '';
        passwd.value = '';
    }
    
    function dl_a(){
        let div_login = document.getElementById("box_login");
        let div_sign = document.getElementById("box_sigin_up");
        div_login.style.float = "left";
        div_sign.style.float = "right";
        add_uid.value = '';
        add_passwd.value = '';
    }

    function dl(pd){
        axios.defaults.baseURL = 'http://127.0.0.1:5173'
        if(login_ok.value.backgroundColor == '#A9A9A9' && pd == 2){
            div_alert_text.value = "注册失败！"
                div_alert.value = true
                setTimeout(() => {
                    div_alert.value = false
                },1000)
        }
        else{
            axios({
                method: 'POST',
                url: '/index/server',
                data: {
                    id: uid.value,
                    add_id: add_uid.value,
                    add_pass: add_passwd.value,
                    pass: passwd.value,
                    pd: pd
                }
            }).then(requset => {
                let backdata = requset.data
                switch(backdata){
                    case 1:
                        sessionStorage.setItem("uid", uid.value)
                        router.push({name: 'home', params: {id : uid.value}})
                        break
                    case 8:
                        sessionStorage.setItem("uid",uid.value)
                        router.push('/massage')
                        break
                    case 7:
                        console.log("管理员账号登陆成功！")
                        break
                    case 2:
                        div_alert_text.value = "账号或者密码错误！"
                        passwd.value = ''
                        div_alert.value = true
                        setTimeout(() => {
                            div_alert.value = false
                        },1000)
                        break
                    case 3:
                        sessionStorage.setItem("uid",uid.value)
                        router.push('/massage')
                        break
                    case 4:
                        div_alert_text.value = "注册失败！(后端)"
                        div_alert.value = true
                        setTimeout(() => {
                            div_alert.value = false
                        },1000)
                        break
                }
            })
        }
    }

    return {zc_a, dl_a, dl, add_uid, add_passwd, add_passwd_text, uid, passwd, test_id, div_alert, div_alert_text, uid_ok, passwd_ok
    , login_ok, test_id_bind, text_bind, add_passwd_bind_erro, add_passwd_bind
    }
})