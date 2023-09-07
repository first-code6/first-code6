import { defineStore } from "pinia";
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import { useMessage } from 'naive-ui'
import axios from 'axios'
import { useRouter } from "vue-router";

export const massagestore = defineStore('massage', () => {
    
    const message = useMessage()
    const formRef = ref(null)
    const router = useRouter()

    onBeforeMount(() => {
        if  (sessionStorage.getItem("uid") == null){
            router.push('/')
            message.error("请登录！")
        }else{
            message.success("登陆成功,请初始化个人信息！")
        }
    })

    onBeforeUnmount(() => {
        sessionStorage.removeItem("uid")
    })

    let formValue = ref({
        name: null,
        phone: null,
        email: null,
        like: null,
        date: null,
        sex: null
    })

    function check(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
            if (!errors) {
                axios.defaults.baseURL = 'http://127.0.0.1:5173'
                axios({
                    method: 'POST',
                    url: '/massage/server',
                    data: {
                        uid: sessionStorage.getItem("uid"),
                        name: formValue.value.name,
                        phone: formValue.value.phone,
                        email: formValue.value.email,
                        sex: formValue.value.sex,
                        date: formValue.value.date,
                        like: formValue.value.like,
                    }
                }).then(Request => {
                    let back_data = Request.data
                    if(back_data === '数据入库成功！'){
                        router.push({name: 'index'})
                        message.success("信息初始化成功！请重新登录")
                    }
                })
            } else {
                console.log(errors);
                message.error("输入有误请重新输入！")
            }
        })
    }

    return { formValue, formRef, check }
})