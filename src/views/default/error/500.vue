<template>
  <ErrorPage :code="500" />
</template>

<script setup>
import ErrorPage from './components/ErrorPage.vue'

defineOptions({ name: 'Error500' })
</script>

<style scoped lang="scss"></style>
