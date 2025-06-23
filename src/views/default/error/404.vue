<template>
  <ErrorPage :code="404" />
</template>

<script setup >
import ErrorPage from './components/ErrorPage.vue'

defineOptions({ name: 'Error404' })
</script>

<style scoped lang="scss"></style>
