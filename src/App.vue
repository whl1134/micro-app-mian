<template>
  <a-config-provider :theme="{ token: { colorPrimary: '#00b96b' }}">
    <a-app>
      <router-view class="main-app-container"></router-view>
    </a-app>
  </a-config-provider>
</template>

<script setup></script>
