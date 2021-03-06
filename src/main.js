import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'

// так надо подключать бд начиная с пятых версий
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import BuyModalComponent from '@/components/shared/BuyModal'

import 'vuetify/dist/vuetify.min.css'
import './stylus/main.styl'
// import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  // theme: {
  //   primary: colors.lightGreen.darken2,
  //   secondary: colors.lime.accent4,
  //   accent: colors.lightGreen.accent4,
  //   error: colors.red.darken1,
  //   warning: colors.yellow.accent3,
  //   info: colors.blue.base,
  //   success: colors.green.base
  // }
})
Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  // один из жизненных циклов
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyC5URPXYwIR9kWVQJ4Euhxob03iLt0dC4c',
      authDomain: 'vue-ads-firebase.firebaseapp.com',
      databaseURL: 'https://vue-ads-firebase.firebaseio.com',
      projectId: 'vue-ads-firebase',
      storageBucket: 'vue-ads-firebase.appspot.com',
      messagingSenderId: '931459399097'
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
