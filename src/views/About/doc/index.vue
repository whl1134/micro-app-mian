<template>
  <micro-app name='pms' :url="`${apiBaseUrl}/doc.html`"></micro-app>
</template>

<script setup>
defineOptions({ name: 'AboutDocumentApi' })
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
</script>

<style scoped lang="scss"></style>
