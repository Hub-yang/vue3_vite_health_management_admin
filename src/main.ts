import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import '@/styles/index.scss'
import * as ELIcon from '@element-plus/icons-vue'
import svgIcon from './icons/index.vue'
import Base64 from 'js-base64'

const app = createApp(App)

// 注册全局指令
app.directive('focus', {
  mounted(el) {
    el.focus()
  },
})

// 全局注册svg封装组件
app.component('svg-icon', svgIcon)
// 全局注册elementplus图标组件
for (const iconName in ELIcon) {
  app.component(iconName, ELIcon[iconName])
}

app.use(router).use(store).use(Base64).mount('#app')
