import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
import router from './router'
import { stat } from 'fs';
import swal from 'sweetalert2';
 
Vue.use(Vuex)
Vue.use(VueSweetalert2);
const baseURL = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    auth : "",
    isLogin : false,
    questions : [],
    answers : [],
    title : "",
    answer : "",
    countQuestion : 0,
    countAnswer: 0
  },
  mutations: {
    setAuth(state, value) {
      state.auth = value
    },
    setIsLogin(state, value) {
      state.isLogin = true
    },
    setQuestions(state, value){
      state.questions = value
      state.countQuestion = +value.upvotes.length - +value.downvotes.length
    },
    clearUser(state) {
      state.name = ""
      state.email = ""
      state.password = ""
    },
    pushAnswer(state, value) {
      state.answers.push(value)
    },
    setAnswers(state, value) {
      state.answers = value
    },
    setDetailAnswer(state, value) {
      state.title = value.title,
      state.answer = value.answer
    },
    setCountQuestion(state, value) {
      state.countQuestion = value
    },
    setCountAnswer(state, value) {
      state.countAnswer = value
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
                router.push({path:"/"})
             })
             .catch( (err) => {
                Vue.swal("Ooops", err.response.data.message, "warning")
             })
      }
    },
    getQuestions({commit, dispatch},option) {
      if (!option) {
          axios.get(`${baseURL}/questions`)
               .then(({data})=> {
                 console.log(data,'ini dataaa');
                 commit('setQuestions', data)
               })
               .catch((err) => {
                 console.log(err);
               })
      } else {
        axios.get(`${baseURL}/questions/myList`,{
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(({data})=> {
          console.log(data);
          
            commit('setQuestions', data)
        })
        .catch((err) => {
          console.log(err);
        })
      }
    },
    getQuestionDetails({commit, dispatch}, option) {
      axios.get(`${baseURL}/questions/${option}`)
           .then(({data}) => {
             console.log(data);
             commit('setQuestions', data)

           })
           .catch((err) => {
             console.log(err);
           })
    },
    createQuestion({commit, dispatch}, newQuestion) {
      let {title, description, user} = newQuestion
      axios.post(`${baseURL}/questions`, 
            { title, description, user },
            { headers : {
                  token : localStorage.getItem('token')
                }
            })
            .then(({data}) => {
              console.log(data);
              router.push({path:"/"})
              Vue.swal("Nice!",data.message,"success");
            })
            .catch((err) => {
              Vue.swal("Sorry...",err.response.data.message,"warning");
            })
    },
    createAnswer({commit, dispatch}, newAnswer) {
      
       axios.post(`${baseURL}/answers`,newAnswer,{
         headers : {
           token : localStorage.getItem('token')
         }
       })
       .then(({data}) => {
       
          commit('pushAnswer', data.data)
          router.push({path:`/questions/${data.data._id}`})
          Vue.swal("Nice!",data.message,"success");
       })
       .catch((err) => {
        Vue.swal("Sorry...",err.response.data.message,"warning");
      })
    },
    getAnswer({commit, dispatch}, option) {

        axios.get(`${baseURL}/answers/${option}`)
        .then(({data}) => {
          commit('setAnswers', data)
        })
        .catch((err) => {
          console.log(err.message);
        })
    },
    upvote({commit, dispatch}, option) {
       
        if (option.answerId) {
          axios
          .put(`${baseURL}/${option.value}/${option.answerId}/upvote`,{},{
            headers : { token : localStorage.getItem('token')}
          })
          .then(({data}) => {
              console.log(data);
              commit('setCountAnswer', data)
          })
          .catch(err => {
            console.log(err.message);
          })
        } else {
          axios
          .put(`${baseURL}/${option.value}/${option.questionId.questionId}/upvote`,{},{
            headers : {
              token : localStorage.getItem('token')
            }
          })
          .then(({data}) => {
              console.log(data)
              commit('setCountQuestion', data)
          })
          .catch(err => {
            console.log(err.response);
            swal("Oops",err.response.data.message,"warning")
          })
        }
       
    },
    downvote({commit, dispatch}, option) {
      if (option.answerId) {
        axios
        .put(`${baseURL}/${option.value}/${option.answerId}/downvote`,{},{
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(({data}) => {
            console.log(data);
            commit('setCountAnswer', data)
        })
        .catch(err => {
          console.log(err.message);
          swal("Oops",err.response.data.message,"warning")
        })
      } else {
        axios
        .put(`${baseURL}/${option.value}/${option.questionId.questionId}/downvote`,{},{
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(({data}) => {
            console.log(data);
            commit('setCountQuestion', data)
        })
        .catch(err => {
          console.log(err.message);
          swal("Oops",err.response.data.message,"warning")
        })
      }
   
    },
    updateAnswer({commit, dispatch}, option) {
      console.log(option,'=== option');
      
      let {answerId, title, description, question, user} = option
      axios
        .put(`${baseURL}/answers/${answerId}`, {
          title, description, question, user
        },{
          headers : {
            token : localStorage.getItem('token'),
            email : localStorage.getItem('email'),
            id : localStorage.getItem('id')
          }
        })
        .then((data) => {
          console.log(data);

        })
        .catch((err)=> {
          console.log(err);
          swal("Nice","update success","warning")
        })
    },
    deleteAnswer({commit, dispatch}, option) {
      let {answerId, title, description} = option
      axios
        .delete(`${baseURL}/answers/${answerId}`, {
          title, description
        },{
          headers : {
            token : localStorage.getItem('token'),
            email : localStorage.getItem('email'),
            id : localStorage.getItem('id')
          }
        })
    },
  }
})
