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
    favorites: [],
    modal: {
      show: false,
      text: ''
    }
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
      favoritesIds.forEach(f => {
        geohelper.getCityById(f.id)
            .then(city => {
              city.getCurrentWeather()
              state.favorites.push(city)
            })
      })
    },
    addFavorite(state, newCity){
      const favoritesIds = JSON.parse(localStorage.getItem('favorites')) || []
      favoritesIds.push({id: newCity.id, date: new Date()})
      localStorage.setItem('favorites', JSON.stringify(favoritesIds))

      state.favorites.push(newCity)
      newCity.favorite = true


      state.modal.text = `${newCity.name} был добавлен в избранное.`
      state.modal.show = true
    },
    removeFavorite(state, cityToDelete){
      const favoritesIds = JSON.parse(localStorage.getItem('favorites')) || []
      favoritesIds.splice(favoritesIds.findIndex(f => f.id === cityToDelete.id), 1)
      localStorage.setItem('favorites', JSON.stringify(favoritesIds))

      state.favorites.splice(state.favorites.findIndex(city => city.id === cityToDelete.id), 1)
      cityToDelete.favorite = false


      state.modal.text = `${cityToDelete.name} был удален из избранного.`
      state.modal.show = true
    },
    // name - по названию
    // date - по дате добавления в избранное
    // pos - по удалению от пользователя
    sortFavorites(state, options = {type: 'name', dir: 'asc'}){
      const dir = 1 - 2 * (options.dir === 'desc')
      switch (options.type){
        case "name":
          state.favorites.sort((a, b) => {
            if (a.name < b.name) {
              return -dir;
            }
            if (a.name > b.name) {
              return dir;
            }
            return 0;
          })
          break
        case 'date':
          state.favorites.sort((a, b) => {
            if (a.favoriteDate > b.favoriteDate) {
              return -dir;
            }
            if (a.favoriteDate < b.favoriteDate) {
              return dir;
            }
            return 0;
          })
          break
        case 'pos':
          state.favorites.sort((a, b) => {
            const aDistance = a.location.getDistance(state.location)
            const bDistance = b.location.getDistance(state.location)
            if (aDistance < bDistance) {
              return -dir;
            }
            if (aDistance > bDistance) {
              return dir;
            }
            return 0;
          })
          break
      }
    },
    showModal(state, text){
      state.modal.text = text
      state.modal.show = true
    },
    closeModal(state){
      state.modal.show = false
    }

  },
  actions: {
    setTimeInterval({commit}){
      setInterval(() => {
        commit('setTime')
      }, 1000)
    },
    checkFavorite(state, city){
      if (!state.favorites) return false
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
