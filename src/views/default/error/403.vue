<template>
  <ErrorPage :code="403" />
</template>

<script setup>
import ErrorPage from './components/ErrorPage.vue'

defineOptions({ name: 'Error403' })
</script>

<style scoped lang="scss"></style>
