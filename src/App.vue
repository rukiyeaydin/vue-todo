<template>
  <div>
    <NavbarTemplate v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script setup>
import NavbarTemplate from './components/NavbarTemplate.vue';
import { computed } from 'vue'; 
import { useRoute } from 'vue-router';

const route = useRoute();

const showNavbar = computed(() => {
  return route.path !== '/' && route.path !== '/todos';
});
</script>
