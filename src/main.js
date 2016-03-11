import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import Home from './Home.vue'
import Login from './Login.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

let isAuthenticated = localStorage.getItem('access_token')

export var router = new VueRouter({ history: true })

router.map({
  '/': {
    component: Home,
    auth: true
  },
  '/login': {
    component: Login
  }
})

router.beforeEach((transition) => {
  if (transition.to.auth) {
    if (!isAuthenticated) {
      transition.redirect('/login')
    }
  }
  transition.next()
})

router.start(App, 'body')
