<template>
  <div class="body">
    <div class="container">
      <div class="login-box">
        <div :class="['owl', look ? '' : 'password']" id="owl">
          <div class="hand"></div>
          <div class="hand hand-r"></div>
          <div class="arms">
            <div class="arm"></div>
            <div class="arm arm-r"></div>
          </div>
        </div>
        <div class="input-box">
          <input type="text" placeholder="账号" v-focus v-model.lazy.trim="form.username" />
          <input
            type="password"
            placeholder="密码"
            id="password"
            v-model.lazy.trim="form.password"
            @focus="look = false"
            @blur="look = true"
          />
          <button @click="handleLogin">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
import router from '@/router/index'

const userStore = useUserStore()

const look = ref(true)
const form = reactive({
  username: '',
  password: '',
})

function handleLogin() {
  if (!form.username || !form.username.replace(/\s*/g, '')) {
    ElMessage({ message: '请输入用户名', type: 'warning', duration: 3000 })
    form.username = ''
    return
  }
  if (!form.password || !form.password.replace(/\s*/g, '')) {
    ElMessage({ message: '请输入密码', type: 'warning', duration: 3000 })
    return
  }
  // 登录接口
  userStore
    .login({ ...form })
    .then((res: any) => {
      if (res.code === 200) {
        ElMessage({ message: '登录成功', type: 'success', duration: 3000 })
        // 跳转
        router.replace('/home')
      } else {
        ElMessage({ message: res.msg, type: 'error', duration: 3000 })
      }
    })
    .catch((err: any) => {
      throw new Error('loginApi()接口错误' + err)
    })
}
</script>

<style scoped lang="scss">
@import '@/styles/login.scss';
</style>
