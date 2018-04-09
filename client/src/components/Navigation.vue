<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img src="../assets/images/lynxmasters.jpg" alt="">
      </a>
      <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link v-bind:to="{ name: 'Landing' }" class="navbar-item" active-class="link-is-active" exact>
          <span>Home</span>
        </router-link>
      </div>

      <div class="navbar-end">
        <router-link v-bind:to="{ name: 'Login' }" class="navbar-item" active-class="link-is-active" exact>
          <span class="icon ">
            <i class="fas fa-sign-in-alt"></i>
          </span>
          <span>Login</span>
        </router-link>
        <router-link v-bind:to="{ name: 'Signup' }" class="navbar-item" active-class="link-is-active" exact>
          <span class="icon">
            <i class="fas fa-user-plus"></i>
          </span>
          <span>Signup</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Navigation',
    data() {
      return {}
    }
  }
</script>
