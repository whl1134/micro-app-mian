<script setup>

import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const formState = reactive({
  username: '',
  password: '',
  remember: true
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

<template>
  <div class="logon-container">
    <div class="login-layout-container">
      <!-- 左侧宣传栏 -->
      <div class="left-panel">
        <div class="app-logo">
          <div class="logo-icon">
            <i class="fas fa-cube"></i>
          </div>
          <span>VueAdmin</span>
        </div>

        <div class="decor-circle circle-1"></div>
        <div class="decor-circle circle-2"></div>
        <div class="decor-circle circle-3"></div>

        <div class="left-content">
          <h2>欢迎使用企业管理系统</h2>
          <p>专为现代企业设计的全功能管理平台，帮助您高效管理业务、团队和数据。</p>

          <ul class="features">
            <li>
              <i class="fas fa-shield-alt"></i>
              <span>企业级安全保障，保护您的数据隐私</span>
            </li>
            <li>
              <i class="fas fa-bolt"></i>
              <span>高性能处理引擎，应对复杂业务场景</span>
            </li>
            <li>
              <i class="fas fa-sync-alt"></i>
              <span>多平台实时同步，随时随地开展工作</span>
            </li>
            <li>
              <i class="fas fa-chart-line"></i>
              <span>智能数据分析，助力业务决策</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 右侧登录表单 -->
      <div class="right-panel">
        <div class="login-header">
          <h1>登录您的账户</h1>
          <p>请输入您的账号信息以继续使用系统</p>
        </div>

        <a-form :model="formState" name="loginForm" class="login-form" @finish="onFinish"
          @finishFailed="onFinishFailed">
          <a-form-item class="form-item" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
            <a-input v-model:value="formState.username" placeholder="用户名" size="large">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item class="form-item" name="password" :rules="[{ required: true, message: '请输入密码' }]">
            <a-input-password v-model:value="formState.password" placeholder="密码" size="large">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item class="form-item" name="captcha" :rules="[{ required: true, message: '请输入验证码' }]">
            <a-input size="large" v-model:value="formState.captcha" placeholder="请输入验证码" >
              <template #prefix>
                <EditOutlined />
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
          <a-form-item>
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
              <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
              <a-button type="link" >忘记密码?</a-button>
            </div>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit" class="login-btn" block>
              登录账户
            </a-button>
          </a-form-item>

          <div class="action-links">
            <a-button type="link">
              <i class="fas fa-mobile-alt"></i>
              手机验证码登录
            </a-button>
            <a-button type="link">
              <i class="fas fa-user-plus"></i>
              注册新账户
            </a-button>
          </div>
        </a-form>

        <div class="divider">
          <span>其他登录方式</span>
        </div>

        <div class="social-login">
          <div class="social-btn github">
            <AlipayCircleFilled style="font-size: 34px;"/>
          </div>
          <!-- <div class="social-btn google">
            <i class="fab fa-google"></i>
          </div> -->
          <div class="social-btn microsoft">
            <WechatFilled style="font-size: 34px;"/>
          </div>
        </div>

        <!-- <div class="footer">
          <p>© 2023 VueAdmin 企业管理系统 | 隐私政策 | 使用条款</p>
        </div> -->
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.logon-container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 登录容器样式 */
.login-layout-container {
  display: flex;
  width: 80%;
  height: 650px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.left-panel {
  flex: 1;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.app-logo {
  position: absolute;
  top: 40px;
  left: 50px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 700;
  z-index: 2;
}

.app-logo .logo-icon {
  background: white;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f46e5;
}

.left-content {
  position: relative;
  z-index: 2;
}

.left-panel h2 {
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 25px;
  max-width: 500px;
}

.left-panel p {
  font-size: 18px;
  line-height: 1.7;
  opacity: 0.9;
  margin-bottom: 40px;
  max-width: 500px;
}

.features {
  list-style: none;
  margin-top: 30px;
}

.features li {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
}

.features li i {
  margin-right: 15px;
  background: rgba(255, 255, 255, 0.2);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.right-panel {
  flex: 1;
  padding: 70px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
}

.login-header {
  margin-bottom: 0;
}

.login-header h1 {
  font-size: 32px;
  color: #1e293b;
  font-weight: 700;
  margin-bottom: 10px;
}

.login-header p {
  color: #64748b;
  font-size: 16px;
}

.login-form {
  margin-top: 10px;
}

.form-item {
  margin-bottom: 28px;
}

.ant-input-affix-wrapper-lg {
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;
}

.ant-input-affix-wrapper-lg:hover {
  border-color: #c7d2fe;
}

.ant-input-affix-wrapper-focused {
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

.ant-input-lg {
  font-size: 16px;
}

.login-btn {
  height: 50px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 12px;
  // background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  border: none;
  transition: all 0.3s;
  margin-top: 10px;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 14px rgba(79, 70, 229, 0.25);
}

.action-links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.action-links a {
  color: #4f46e5;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-links a:hover {
  color: #7c3aed;
  text-decoration: underline;
}

.divider {
  margin: 20px 0;
  text-align: center;
  color: #94a3b8;
  position: relative;
  font-size: 14px;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e2e8f0;
  z-index: 1;
}

.divider span {
  display: inline-block;
  background: white;
  padding: 0 15px;
  position: relative;
  z-index: 2;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-btn {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border-color: #c7d2fe;
}

.social-btn i {
  font-size: 40px;
}

.github {
  color: #1778FF;
}

.google {
  color: #4285f4;
}

.microsoft {
  color: #07C160;
}

.footer {
  margin-top: 40px;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
}

/* 背景装饰元素 */
.decor-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -100px;
}

.circle-2 {
  width: 180px;
  height: 180px;
  bottom: -60px;
  left: -60px;
}

.circle-3 {
  width: 120px;
  height: 120px;
  top: 40%;
  left: -40px;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .left-panel {
    display: none;
  }

  .right-panel {
    padding: 50px 40px;
  }
}

@media (max-width: 576px) {
  .right-panel {
    padding: 40px 30px;
  }

  .login-header h1 {
    font-size: 28px;
  }
}
</style>
