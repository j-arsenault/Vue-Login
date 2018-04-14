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
                <div class="field">
                  <label class="label">First Name</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input"
                           type="text"
                           placeholder="Bubbles"
                           name="firstName"
                           v-model="user.firstName"
                           required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                  </div>
                  <p class="help is-danger" v-if="errors.firstName">{{ errors.firstName.message }}</p>
                </div>
                <div class="field">
                  <label class="label">Last Name</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input"
                           type="text"
                           placeholder="Bubblerino"
                           name="lastName"
                           v-model="user.lastName"
                           required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                  </div>
                  <p class="help is-danger" v-if="errors.lastName">{{ errors.lastName.message }}</p>
                </div>
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input"
                           type="email"
                           placeholder="joey@google.com"
                           name="email"
                           v-model="user.email"
                           required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                  </div>
                  <p class="help is-danger" v-if="errors.email">{{ errors.email.message }}</p>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input"
                           type="password"
                           placeholder="supersecretpassword"
                           name="password"
                           v-model="user.password"
                           v-bind:class="passwordNoMatch"
                           required>
                    <span class="icon is-small is-left">
                        <i class="fas  fa-unlock-alt"></i>
                      </span>
                  </div>
                  <p class="help is-danger" v-if="errors.password">{{ errors.password.message }}</p>
                </div>

                <div class="field" v-if="passwordsMatch">
                  <span class="tag is-danger">Passwords Do Not Match!</span>
                </div>

                <div class="field">
                  <label class="label">Confirm Password</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input"
                           type="password"
                           placeholder="supersecretpassword"
                           name="confirmPassword"
                           v-on:input="checkPasswordMatch"
                           v-model="user.confirmPassword"
                           v-bind:class="passwordNoMatch"
                           required>
                    <span class="icon is-small is-left">
                        <i class="fas  fa-unlock-alt"></i>
                      </span>
                  </div>
                  <p class="help is-danger" v-if="errors.confirmPassword">{{ errors.confirmPassword.message }}</p>
                </div>


                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link">Submit</button>
                  </div>
                  <div class="control">
                    <button class="button is-text">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>


<script>
  import _ from 'lodash';

  export default {
    name: 'Signup',
    data() {
      return {
        user: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
        passwordsMatch: false,
        errors: {}
      }
    },
    watch: {},
    computed: {
      passwordNoMatch() {
        return this.passwordsMatch ? 'is-danger' : ''
      }
    },
    methods: {
      checkPasswordMatch: _.debounce(function () {
       (this.user.password !== this.user.confirmPassword)
          ? this.passwordsMatch = true
          : this.passwordsMatch = false
      }, 1000)
      // implement post and bcrypt methods here
    }
  }
</script>
