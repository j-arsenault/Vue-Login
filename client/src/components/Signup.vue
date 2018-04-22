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
                           v-on:input="checkFormFields"
                           v-bind:class="{ 'is-danger': errors.firstName, 'is-danger': error.firstName }"
                           required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                  </div>
                  <p class="help is-danger" v-if="error.firstName">{{error.firstName }}</p>
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
                           v-on:input="checkFormFields"
                           v-bind:class="{ 'is-danger': errors.lastName, 'is-danger': error.lastName }"
                           required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                  </div>
                  <p class="help is-danger" v-if="error.lastName">{{ error.lastName }}</p>
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
                           v-on:input="checkFormFields"
                           v-bind:class="{ 'is-danger': errors.email, 'is-danger': error.email}"
                           required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                  </div>
                  <p class="help is-danger" v-if="error.email">{{ error.email }}</p>
                  <p class="help is-danger" v-if="errors.email">{{ errors.email.message }}</p>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control has-icons-left has-icons-right">
                    <!-- front end password error class binding v-bind:class="passwordNoMatch" -->
                    <input class="input"
                           type="password"
                           placeholder="supersecretpassword"
                           name="password"
                           v-on:input="checkPasswordMatch"
                           v-model="user.password"
                           v-bind:class="{'is-danger': errors.password, 'is-danger': error.password }"
                           required>
                    <span class="icon is-small is-left">
                        <i class="fas  fa-unlock-alt"></i>
                      </span>
                  </div>
                  <p class="help is-danger" v-if="error.password">{{ error.password }}</p>
                  <p class="help is-danger" v-if="errors.password">{{ errors.password.message }}</p>
                </div>

                <div class="field animated flipInX" v-if="passwordsMatch || passwordsEmpty || error.nomatch">
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
                           v-bind:class="{'is-danger': errors.confirmPassword, 'is-danger': error.confirmPassword }"
                           required>
                    <span class="icon is-small is-left">
                        <i class="fas  fa-unlock-alt"></i>
                      </span>
                  </div>
                  <p class="help is-danger" v-if="error.confirmPassword">{{error.confirmPassword }}</p>
                  <p class="help is-danger" v-if="errors.confirmPassword">{{ errors.confirmPassword.message }}</p>
                </div>


                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link" v-on:click="validateForm()">Save</button>
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
        errors: {},
        error: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
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
      checkFormFields:  _.debounce(function () {
        if (this.user.firstName) {
          this.error.firstName = ''
        }
        if (this.user.lastName) {
          this.error.lastName = ''
        }
        if (this.user.email) {
          this.error.email = ''
          this.errors.email.message = ''
        }
      }, 500),
      checkPasswordMatch: _.debounce(function () {
        if (this.user.password) {
          this.errors.password = ''
        }
        if (this.user.password && this.user.confirmPassword) {
          if (this.user.password !== this.user.confirmPassword) {
            this.passwordsMatch = true
            this.error.password = 'Passwords do not match'
            this.error.confirmPassword = 'Passwords do not match'
          } else {
            this.passwordsMatch = false
            this.error.password = ''
            this.error.confirmPassword = ''
          }
        } else {
          this.passwordsMatch = false
        }

      }, 500),
      validateForm() {
        if (!this.user.firstName) {
          this.error.firstName = 'First name is required'
        } else {
          this.error.firstName = '';
        }
        if (!this.user.lastName) {
          this.error.lastName = 'Last name is required'
        } else {
          this.error.lastName =  ''
        }
        if (!this.user.lastName) {
          this.error.lastName = 'Last name is required'
        } else {
          this.error.lastName = ''
        }
        if (!this.user.email) {
          this.error.email = 'Email is required'
        } else {
          this.error.email = ''
        }
        if (!this.user.password) {
          this.error.password = 'Password is required'
        } else {
          this.error.password = ''
        }
        if (!this.user.confirmPassword) {
          this.error.confirmPassword = 'Password is required'
        } else {
          this.error.confirmPassword = ''
        }
        if (!this.error.firstName && !this.error.lastName && !this.error.email && !this.error.password && !this.error.confirmPassword) {
          this.addUser()
        }

      },
      async addUser() {
        await UserService.addUser(this.user).then(res => {
          if (res.data.errors) {
            this.errors = res.data.errors
//            this.errorMsg('Please fill out all form fields')
          } else {
//            this.userSaved()
            this.$router.push({name: 'Login'})
          }
        })
      }
    }
  }
</script>
