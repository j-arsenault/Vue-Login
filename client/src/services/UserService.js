import Api from '@/services/Api'

export default {
  addUser(params) {
    return Api().post('users', params);
  },
  loginUser(params) {
    return Api().post('login', params)
  },
}
