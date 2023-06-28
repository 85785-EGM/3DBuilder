import App from '@/App.vue'
import store from '@/stores'
import router from '@/router'
import toolkits from '@/toolkits'
import { createApp } from 'vue'
import useSettingStore from '@/stores/setting'

createApp(App).use(router).use(store).use(toolkits).mount('#app')

useSettingStore().init()
