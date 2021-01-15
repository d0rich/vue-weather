import Vue from 'vue'
import Vuex from 'vuex'
import {Coords, Region, City} from "@/classes";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    location: new Coords(),
    region: new Region(),
    city: new City(),
    regions: [new Region()],
    timeNow: new Date(),
  },
  getters: {

  },
  mutations: {
    setLocation(state, coords){
      state.location = coords
    },
    setRegion(state, region){
      state.region = region
    },
    setCity(state, city){
      state.city = city
    },
    setRegions(state, regions){
      state.regions = regions
    },
    setTime(state){
      state.timeNow = new Date()
    }
  },
  actions: {
    setTimeInterval({commit}){
      setInterval(() => {
        commit('setTime')
      }, 1000)
    }
  },
  modules: {
  }
})
