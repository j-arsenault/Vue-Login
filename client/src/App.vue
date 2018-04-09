<template>
  <div id="app">
    <navigation></navigation>
    <router-view/>
    <bottom-navigation></bottom-navigation>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation.vue'
  import BottomNavigation from '@/components/Footer.vue'

  export default {
    components: {
      BottomNavigation,
      Navigation,
    },
    name: 'App'
  }
</script>
