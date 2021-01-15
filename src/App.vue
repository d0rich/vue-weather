<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import {Coords, Geocode, GeoHelper, IpApi} from "@/classes";
import {mapActions} from 'vuex'
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
  methods:{
    ...mapActions(['setTimeInterval']),
    async loadStartData(coords){
      const geohelper = new GeoHelper()
      const cityName = await new Geocode().getCityByCoords(coords)
      let city = await geohelper.getCityByName(cityName)
      let region = await geohelper.getRegionById(city.region.id)
      city.region = region
      city.location = coords
      this.setLocation(new Coords(coords))
      this.setCity(city)
      this.setRegion(region)
      this.city.getCurrentWeather()
      this.city.getSunDay()
      this.city.getWeekWeather()
    }
  },
  mounted() {
    this.setTimeInterval()
    navigator.geolocation.getCurrentPosition(async location => {
      console.log(location)
      this.loadStartData(location.coords)
    }, async () => {
      let location = await new IpApi().getCoordsByIp()
      console.log(location)
      this.loadStartData(location)
    }, undefined )
  }
};
</script>
