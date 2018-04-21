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
                           v-on:input="checkPasswordMatch"
                           v-model="user.password"
                           v-bind:class="passwordNoMatch"
                           required>
                    <span class="icon is-small is-left">
                        <i class="fas  fa-unlock-alt"></i>
                      </span>
                  </div>
                  <p class="help is-danger" v-if="errors.password">{{ errors.password.message }}</p>
                </div>

                <div class="field animated flipInX" v-if="passwordsMatch || passwordsEmpty">
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
                    <button class="button is-link"  v-on:click="addUser">Save</button>
                  </div>
                  <div class="control">
                    <router-link v-bind:to="{ name: 'Landing' }" class="button" active-class="" exact>
                      <span>Cancel</span>
                    </router-link>
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
  import _ from 'lodash'
  import bcrypt from 'bcryptjs'
  import UserService from '@/services/UserService'

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
        pwd: '',
        errors: {}
      }
    },
    watch: {},
    computed: {
      passwordNoMatch() {
        return this.passwordsMatch ? 'is-danger' : ''
      },
      passwordsEmpty() {
        return (!this.user.password && !this.user.confirmPassword)
          ? this.passwordsMatch = false : false
      }
    },
    methods: {
      checkPasswordMatch: _.debounce(function () {
        if (this.user.password && this.user.confirmPassword) {
          (this.user.password !== this.user.confirmPassword)
            ? this.passwordsMatch = true
            : this.passwordsMatch = false
        } else {
          this.passwordsMatch = false
        }
      }, 1000),
      async addUser() {
        await UserService.addUser(this.user).then(res => {
          if (res.data.errors) {
            this.errors = res.data.errors
            this.errorMsg('Please fill out all form fields')
          } else {
            this.userSaved()
            this.$router.push({name: 'Login'})
          }
        })
      }
    }
  }
</script>
