import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shopList: [],
  },
  mutations: {
    getShopList(state, obj) {
      state.shopList = obj
    },

  },
  getters: {
    getShopcarList(state) {
      let arr = []
      for (let obj of state.shopList) {
        for (let items of obj.foods) {
          if (items.num > 0) {
            arr.push(items)
          }
        }
      }
      return arr

    }
  },
  actions: {

  },
  modules: {}
})