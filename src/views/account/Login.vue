<template>
  <div class="container">
    <el-row style="height: 100%">
      <!-- 左侧 -->
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="lmain">
          <!-- 表单区域 -->
          <div class="content">
            <p class="welcome-text">欢迎登录</p>
            <p class="info-text">输入邮箱和密码以登录</p>
            <el-form ref="account_form" :model="data.form" :rules="data.form_rules" style="width: 100%">
              <el-form-item prop="username">
                <label class="form-label">用户名</label>
                <el-input v-model="data.form.username" autocomplete="on" />
              </el-form-item>
              <el-form-item prop="password">
                <label class="form-label">密码</label>
                <el-input v-model="data.form.password" type="password" show-password />
              </el-form-item>
              <el-form-item>
                <el-switch v-model="data.form.rempassword" id="switch" style="margin-right: 5px" />
                <label class="form-label" for="switch">记住密码</label>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" class="el-button-block" @click="submitForm">登 录</el-button>
              </el-form-item>
              <p class="last-text">没有账号？点击注册</p>
            </el-form>
          </div>
          <!-- 页脚区域 -->
          <baseFooter />
        </div>
      </el-col>
      <!-- 右侧 -->
      <el-col :xs="0" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="rmain">
          <el-image style="height: 100%; width: 100%; border-radius: 10px" :src="bgImg" fit="fill" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import baseFooter from '@/components/pageLayout/baseFooter.vue'
import { useUserStore } from '@/store/modules/user'
import { validate_email, validate_password } from '@/utils/validate'
import { getPassword, setPassword, removePassword } from '@/utils/rempassword'
import { getUserName } from '@/utils/token'
import router from '@/router/index'

const userStore = useUserStore()

// 校验规则
const validate_name_rules = (rule: any, value: any, callback: any) => {
  const regEmail = validate_email(value)
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else if (!regEmail) {
    callback(new Error('邮箱格式不正确'))
  } else {
    callback()
  }
}
const validate_password_rules = (rule: any, value: any, callback: any) => {
  const regPassword = validate_password(value)
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!regPassword) {
    callback(new Error('请输入>=6并且<=20位的密码，包含数字、字母'))
  } else {
    callback()
  }
}

const account_form = ref<any>()
const bgImg = ref(new URL('../../assets/images/curved9.jpg', import.meta.url).href)
const data = reactive({
  form: {
    username: '',
    password: '',
    rempassword: false,
  },
  form_rules: {
    username: [{ validator: validate_name_rules, trigger: 'change' }],
    password: [{ validator: validate_password_rules, trigger: 'change' }],
  },
})

// 获取回显账密
onBeforeMount(() => {
  const password = getPassword()
  const username = getUserName()
  if (password && username) {
    data.form.password = Base64.decode(getPassword())
    data.form.username = username
    data.form.rempassword = true
  }
})

const submitForm = () => {
  account_form.value.validate((valid: boolean) => {
    if (valid) {
      // 判断是否存储密码
      if (data.form.rempassword) {
        setPassword(Base64.encode(data.form.password))
      } else {
        removePassword()
      }
      handleLogin(data.form.username, data.form.password)
    } else {
      return false
    }
  })
}

function handleLogin(username: string, password: string) {
  // 登录接口
  userStore
    .login({ username, password })
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
