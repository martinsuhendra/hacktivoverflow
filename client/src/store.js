import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
 
Vue.use(Vuex)
Vue.use(VueSweetalert2);
const baseURL = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    auth : "",
    isLogin : null,
  },
  mutations: {
    setAuth(state, value) {
      state.auth = value
    },
    setIsLogin(state, value) {
      state.isLogin = true
    },
    clearUser(state) {
      state.name = ""
      state.email = ""
      state.password = ""
    }
  },
  actions: {
    register({commit, dispatch}, newUser) {
      let {name, email, password} = newUser
      axios.post(`${baseURL}/users/signUp`,{ name, email, password })
           .then(({data}) => {
              console.log(data);
              Vue.swal("success", data.message, "success")
              commit('setAuth','login')
           })
           .catch( (err) => {
              Vue.swal("Ooops", err.response.data.message, "warning")
           })
    },
    signIn({commit, dispatch}, loginUser) {
      let {email, password} = loginUser
      if (email == localStorage.getItem('email')) {
          Vue.swal("Ooops", "You already login!", "warning")
      } else {
        axios.post(`${baseURL}/users/signIn`,{ email, password })
             .then(({data}) => {
                Vue.swal("success", data.message, "success")
                commit('setIsLogin', true)
                localStorage.setItem('token', data.token)
                localStorage.setItem('id', data.details.id)
                localStorage.setItem('email', data.details.email)
             })
             .catch( (err) => {
                Vue.swal("Ooops", err.response.data.message, "warning")
             })
      }
    },
    createQuestion({commit, dispatch}, newQuestion) {
      // console.log(newQuestion,'===');
      let {title, description, user} = newQuestion
      axios.post(`${baseURL}/questions`, 
            { title, description, user },
            { headers : {
                  token : localStorage.getItem('token')
                }
            })
            .then(({data}) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err.response);
            })
    }
  }
})
