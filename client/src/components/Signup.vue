<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  Sign Up
                </p>
              </header>
              <div class="card-content">
                <form>
                  <div class="field">
                    <label class="label">First Name</label>
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" type="email" placeholder="Bubbles">
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                    <p class="help is-danger">First Name Required</p>
                  </div>
                  <div class="field">
                    <label class="label">Last Name</label>
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" type="email" placeholder="Bubblerino">
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                    <p class="help is-danger">Last Name Required</p>
                  </div>
                  <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" type="email" placeholder="joey@google.com">
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </div>
                    <p class="help is-danger">This email is invalid</p>
                  </div>
                  <div class="field">
                    <label class="label">Password</label>
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" type="email" placeholder="supersecretpassword">
                      <span class="icon is-small is-left">
                        <i class="fas  fa-unlock-alt"></i>
                      </span>
                    </div>
                    <p class="help is-danger">This password is invalid</p>
                  </div>
                  <div class="field">
                    <label class="label">Confirm Password</label>
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" type="email" placeholder="supersecretpassword">
                      <span class="icon is-small is-left">
                        <i class="fas  fa-unlock-alt"></i>
                      </span>
                    </div>
                    <p class="help is-danger">Passwords do not match</p>
                  </div>

                  <div class="field is-grouped">
                    <div class="control">
                      <button class="button is-link">Submit</button>
                    </div>
                    <div class="control">
                      <button class="button is-text">Cancel</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>


<script>
  export default {
    name: 'Signup',
    data() {
      return {}
    }
  }
</script>
