<template>
  <v-skeleton-loader
      type="card"
      :loading="topCitiesOnLoad"
      width="300"
  >
    <v-card elevation="2"
            shaped
            class="ma-3 card-container">
      <v-card-title class="card-title"><v-icon color="red">mdi-fire</v-icon>Популярные города:</v-card-title>
      <CitiesList :cities="cities" max-height="300px" positions />
      <v-card-text class="card-title" />
    </v-card>
  </v-skeleton-loader>
</template>

<script>
import {City, Geocode, GeoHelper, IpApi} from "@/classes";
import CitiesList from "@/components/CitiesList";

export default {
name: "PopularCities",
  components:{
    CitiesList
  },
  data(){
    return{
      topCitiesOnLoad: true,
      cities: [new City()]
    }
  },
  methods:{
    async startAction(location){
      this.topCitiesOnLoad = true
      let country_code = await new Geocode().getCountryCodeByCoords(location)
      this.cities = await new GeoHelper().getTopCities(country_code)
      this.topCitiesOnLoad = false
    }
  },
  async mounted() {
    if (!this.location || (this.location.longitude === 0 && this.location.latitude === 0))
      navigator.geolocation.getCurrentPosition(async location => {
        await this.startAction(location.coords)
      }, async () => {
        let location = await new IpApi().getCoordsByIp()
        await this.startAction(location)
      }, undefined )
    else await this.startAction(this.location)
  }
}
</script>

<style scoped lang="scss">
.top-list{
  max-height: 300px;
  overflow-y: auto;
}
.card-container{

}
.card-title{
  background-color: var(--v-primary-base);
  color: white;
}
</style>
