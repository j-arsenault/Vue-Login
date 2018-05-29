<template>
  <section class="profile">
    <div>
      You must be signed in to see this page!
    </div>
    <div>
      You have a session!
    </div>
  </section>
</template>


<script>
  import UserService from '@/services/UserService'

  export default {
    name: 'Profile',
    data() {
      return {}
    },
    beforeMounted: {
      // check for session here
    },
    methods: {}
  }
</script>
