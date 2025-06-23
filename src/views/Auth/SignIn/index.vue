<template>
  <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" autocomplete="off"
    @finish="onFinish" @finishFailed="onFinishFailed">
    <a-form-item label="用户名" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input size="large" v-model:value="formState.username" />
    </a-form-item>

    <a-form-item label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
      <a-input-password size="large" v-model:value="formState.password" />
    </a-form-item>

    <a-form-item label="验证码" name="captcha">
      <a-input size="large" v-model:value="formState.captcha" placeholder="请输入验证码" >
        <template #prefix>
          <HighlightOutlined />
        </template>
        <template #suffix>
          <div class="captcha-container" @click="getCaptcha" style="max-height: 23px;">
            <img v-show="!formState.expired" :src="captchaImgBase64" style="max-height: 23px;" alt="验证码" class="captcha" />
            <div v-show="formState.expired" class="captcha">
              <p>已过期，请刷新</p>
            </div>
          </div>
        </template>
      </a-input>
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
    </a-form-item>



    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>

import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'


const formState = reactive({
  username: '',
  password: '',
  remember: true,
});
const onFinish = values => {
  console.log('Success:', values);
  handleLogin(values)
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
}

let timerOut = null
const clearTimerOut = () => {
  if (!timerOut) return
  timerOut && clearTimeout(timerOut)
  timerOut = null
}

const startTimeOut = (expireTime, currTime) => {
  clearTimerOut()
  const remainingTime = expireTime - currTime
  if (remainingTime <= 0) {
    formState.expired = true
    return
  }
  timerOut = setTimeout(() => {
    formState.expired = true
    getCaptcha()
  }, remainingTime)
}

// 组件销毁时清理定时器
onBeforeUnmount(clearTimerOut)

const captchaImgBase64 = ref('')
const getCaptcha = async () => {
  const res = await $fetch({
    url: '/captcha/image'
  })
  if (res.data.success) {
    console.log(res.data);
    captchaImgBase64.value = res.data.data.img
    formState.uuid = res.data.data.uuid
    formState.expired = false
    startTimeOut(res.data.data.expireTime, res.data.timestamp)
  }
}


const loading = ref(false)
const formRef = ref()

const userStore = useUserStore()
const router = useRouter()

const successLogin = () => {
  router.replace('/home')
}
const failLogin = () => {
  getCaptcha()
  formState.captcha = ''
}
const finallyLogin = () => {
  loading.value = false
}
// 登录
const handleLogin = async () => {
  const isInvalid = await formRef.value?.validate()
  if (isInvalid) return
  loading.value = true
  const clientId = import.meta.env.VITE_CLIENT_ID
  const password = $encrypt.encryptByRsa(formState.password)
  const postData = {
    authType: 'ACCOUNT',
    captcha: formState.captcha,
    clientId: clientId,
    password: password,
    username: formState.username,
    uuid: formState.uuid
  }
  userStore.accountLogin(postData).then(successLogin).catch(failLogin).finally(finallyLogin)
}

onMounted(async () => {
  await getCaptcha()
})
</script>