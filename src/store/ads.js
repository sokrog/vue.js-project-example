import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

class Ad {
  constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: [
      {
        title: 'First ad',
        description: 'Description',
        promo: true,
        imageSrc: 'http://widefon.com/_ld/146/99600770.jpg',
        id: '1'
      },
      {
        title: 'Second ad',
        description: 'Description',
        promo: true,
        imageSrc: 'https://1k.by/images/site/imagespage/news/20171124/m8f182a4c3.jpg',
        id: '2'
      },
      {
        title: 'Third ad',
        description: 'Description',
        promo: false,
        imageSrc: 'https://content.choiz.me/uploads/2017-09/b3a18d1e3b7421d7f80bfc4fae5f1198.png',
        id: '3'
      }
    ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {
    async createAd ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          payload.imageSrc,
          payload.promo)
        const ad = await firebase.database().ref('ads').push(newAd)

        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    // можно как обычную функцию namef (param) {return} или стрелочной namef: param => {return}
    ads (state) {
      return state.ads
    },
    promoAds: state => {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    myAds: state => {
      return state.ads
    },
    adById: state => id => {
      return state.ads.find(ad => ad.id === id)
    }
    // альтернативное написание
    // adById (state) {
    //   return id => {
    //     return state.ads.find(ad => ad.id === id)
    //   }
    // }
  }
}
