import Api from '@/services/Api'

export default {
  loginUser(params) {
    console.log('hitting login user')
    return Api().post('auth/login', params)
  },
}
