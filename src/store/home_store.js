import { defineStore } from "pinia"
import { onBeforeMount } from 'vue'
import { useMessage } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router';

export const home_store = defineStore('home', () => {

    const router = useRouter()
    const route = useRoute()
    const message = useMessage()

    onBeforeMount(() => {
        if(sessionStorage.getItem("uid") == null){
            router.push('/')
            message.error("请登录！")
        }
        else{
            console.log(route.params.id)
        }
    })
    return {}
})