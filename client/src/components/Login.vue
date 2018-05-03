<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <div class="card">
              <div class="card-content">
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input" type="email" placeholder="joey@google.com">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-exclamation-triangle"></i>
                      </span>
                  </div>
                  <p class="help is-danger" v-if="something">This email is invalid</p>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input" type="email" placeholder="supersecretpassword">
                    <span class="icon is-small is-left">
                        <i class="fas  fa-unlock-alt"></i>
                      </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-exclamation-triangle"></i>
                      </span>
                  </div>
                  <p class="help is-danger" v-if="something">This password is invalid</p>
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
  import UserService from '@/services/UserService'

  export default {
    name: 'Login',
    data() {
      return {
        user: {
          email: '',
          password: ''
        },
        passwordsMatch: false,
        errors: {},
        validUser: false
      }
    },
    methods: {
      async confirmUser() {
        await UserService.fetchUserByEmail(this.user.email).then(res => {
          if (res.data.errors) {
            this.errors = res.data.errors
//            this.errorMsg('Please fill out all form fields')
          } else {
            this.validUser = true // display this somewhere to know successful credentials
            this.$router.push({name: 'Login'})
          }
        })
      }
    }
  }
</script>
