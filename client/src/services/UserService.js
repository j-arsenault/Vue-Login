import Api from '@/services/Api'

export default {
  addUser(params) {
    return Api().post('users', params);
  },
  loginUser(params) {
    console.log('USER SERVICE PARAMS = ' + JSON.stringify(params))
    return Api().post('login', params)
  },
}
