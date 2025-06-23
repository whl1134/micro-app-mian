<template>
  <div class="error-page">
    <section class="error__container">
      
      <div class="error__tip">
        <div class="error__tip--a">抱歉!</div>
        <div class="error__tip--b">当前页面不存在...</div>
        <div class="error__tip--c">请检查您输入的网址是否正确</div>
        <a-button type="primary" shape="round" size="large" @click="back">返回首页</a-button>
      </div>
    </section>
  </div>
</template>

<script setup> 

defineOptions({ name: 'ErrorPage' })
 
// 返回首页
const back = () => {
   
}
</script>
