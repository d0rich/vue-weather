import Vue from 'vue'
import Vuex from 'vuex'
import {Coords, Region, City, GeoHelper, Geocode} from "@/classes";

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
    },
    async loadStartData({state, commit}, coords){
      const geohelper = new GeoHelper()
      const cityName = await new Geocode().getCityByCoords(coords)
      let city = await geohelper.getCityByName(cityName)
      let region = await geohelper.getRegionById(city.region.id)
      city.region = region
      city.location = coords
      commit('setLocation', new Coords(coords))
      commit('setCity', city)
      commit('setRegion', region)
      state.city.getCurrentWeather()
      state.city.getSunDay()
      state.city.getWeekWeather()
    }
  },
  modules: {
  }
})
