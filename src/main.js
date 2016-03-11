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

// https://charlie-sample.auth0.com/api/v2/clients?fields=name%2Ctenant%2Cclient_id&include_fields=true
// https://charlie-sample.auth0.com/api/v2/rules
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJkcDlud2dTa3hWUVBhenVrR0wxTVVPcE9Ub1MzSms3eSIsInNjb3BlcyI6eyJydWxlcyI6eyJhY3Rpb25zIjpbInJlYWQiXX0sImNsaWVudHMiOnsiYWN0aW9ucyI6WyJyZWFkIl19fSwiaWF0IjoxNDU3NTI5MjM5LCJqdGkiOiI1ODkyMmJlMGFmNDI2MzVkM2MyYTM3MmIzMDI3MTFlOCJ9.tzfhQ3R2kadZmoTU7HPu8dQsIgRV1Ml5dxs0RA2JadY
