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
    favorites: []
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
    },
    getFavorites(state){
      const favoritesIds = JSON.parse(localStorage.getItem('favorites')) || []
      const geohelper = new GeoHelper()
      state.favorites = []
      favoritesIds.forEach(id => {
        geohelper.getCityById(id)
            .then(city => {
              state.favorites.push(city)
            })
      })
    },
    addFavorite(state, newCity){
      state.favorites.push(newCity)
      const favoritesIds = JSON.parse(localStorage.getItem('favorites')) || []
      favoritesIds.push(newCity.id)
      localStorage.setItem('favorites', JSON.stringify(favoritesIds))
    },
    removeFavorite(state, cityToDelete){
      state.favorites.splice(state.favorites.findIndex(city => city.id === cityToDelete.id), 1)
      const favoritesIds = JSON.parse(localStorage.getItem('favorites')) || []
      favoritesIds.splice(favoritesIds.findIndex(id => id === cityToDelete.id), 1)
      localStorage.setItem('favorites', JSON.stringify(favoritesIds))
    }
  },
  actions: {
    setTimeInterval({commit}){
      setInterval(() => {
        commit('setTime')
      }, 1000)
    },
    checkFavorite(state, city){
      return state.favorites.includes(f => f.id === city.id)
    },
    async getRegions({commit}){
      commit('setRegions', await new GeoHelper().getRegions())
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
