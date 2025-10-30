<script setup lang="ts">
import Navigation from './components/Navigation.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navigation />
    <router-view></router-view>
  </div>
</template>