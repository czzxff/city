// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    locatecityname:'',
    locatecityid:'',
    cartnum:0
  },
  getter:{
    doneTodos:(state,getter) => {
      return state.todos.filter(todo => todo.done)
    }
  },
  mutations:{
    updatecityname(state,arg){
      state.locatecityname = arg
    },
    updatecityid(state,arg){
      state.locatecityid = arg
    },
    cartnum(state,num){
      state.cartnum = num
    }
  },
  actions:{

  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store:store
})
