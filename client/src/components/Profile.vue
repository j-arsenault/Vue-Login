<template>
  <section class="profile">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Profile Page
          </h1>
          <h2 class="subtitle">
            showing some stuff
          </h2>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="notification is-success has-text-centered">
        You have a <strong>SESSION!</strong> and should be able to see some content.
      </div>
      <div class="columns">
        <div class="column is-4">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content"></div>
          </div>
        </div>
        <div class="column is-4">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content"></div>
          </div>
        </div>
        <div class="column is-4">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content"></div>
          </div>
        </div>
      </div>
      <div class="notification is-danger has-text-centered">
        You are not <strong>SIGNED IN</strong> so your view is limited!
      </div>
      <div class="columns">
        <div class="column is-4">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Component
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">Save</a>
              <a href="#" class="card-footer-item">Edit</a>
              <a href="#" class="card-footer-item">Delete</a>
            </footer>
          </div>
        </div>
        <div class="column is-4">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Component
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">Save</a>
              <a href="#" class="card-footer-item">Edit</a>
              <a href="#" class="card-footer-item">Delete</a>
            </footer>
          </div>
        </div>
        <div class="column is-4">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Component
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">Save</a>
              <a href="#" class="card-footer-item">Edit</a>
              <a href="#" class="card-footer-item">Delete</a>
            </footer>
          </div>
        </div>
      </div>
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
