<template>
  <div class="home">
    <v-skeleton-loader
        type="card"
        :loading="!cityNow || cityNow.onCurrentWeatherLoad"
        width="300"
    >
      <WeatherNow :city-name="cityNow.name" :weather="cityNow.currentWeather" />
    </v-skeleton-loader>

    <v-skeleton-loader
        type="card"
        :loading="!cityNow || cityNow.onSunDayLoad"
        width="200"
    >
      <SunDay :sunday="cityNow.sunDay" />
    </v-skeleton-loader>
    <PopularCities class="pop-cities"/>
    <v-skeleton-loader
        type="card"
        :loading="!cityNow || cityNow.onWeekWeatherLoad"
        width="200"
    >
      <ForecastDaily :week-weather="cityNow.weekWeather" />
    </v-skeleton-loader>
  </div>
</template>

<script>
import WeatherNow from "@/components/WeatherNow";
import SunDay from "@/components/SunDay";
import ForecastDaily from "@/components/ForecastDaily";
import PopularCities from "@/components/PopularCities";
import {mapActions} from "vuex";
import {City, GeoHelper} from "@/classes";

export default {
name: "City",
  components: {
    WeatherNow,
    SunDay,
    ForecastDaily,
    PopularCities
  },
  data(){
    return{
      cityNow: new City()
    }
  },
  methods:{
    ...mapActions(['loadStartData']),
    async awaitUserCity(){
      if (!this.city || this.city.id === 0){
        await this.timeout(100)
        await this.awaitUserCity()
      }
    },
    async fetchCity(){
      console.log(this.$route.params)
      if (!this.$route.params.id || this.$route.params.id === '0'){
        if (this.city && this.city.id !== 0) {
          this.cityNow = this.city
        }
        else {
          await this.awaitUserCity()
        }
        this.$router.push({name: 'City', params: { id: String(this.city.id)}})
      }
      else {
        this.cityNow = await new GeoHelper().getCityById(this.$route.params.id)
        this.cityNow.getCurrentWeather()
        this.cityNow.getSunDay()
        this.cityNow.getWeekWeather()
      }
    }
  },
  watch:{
    $route(){
      this.fetchCity()
    }
  },
  async beforeMount() {
    this.fetchCity()
  }
}
</script>

<style scoped lang="scss">
.home{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 1000px) {
  .pop-cities{
    order: 1;
    width: 80vw;
    min-width: 310px;
  }
}
</style>
