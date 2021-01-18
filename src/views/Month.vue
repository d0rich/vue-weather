<template>
  <div class="forecast-container">
    <v-skeleton-loader
        type="card"
        :loading="!city || city.onMonthWeatherLoad"
        width="200"
        class="mx-3"
    >
      <ForecastDaily :week-weather="city.monthWeather" :text="`Прогноз погоды на месяц в ${city.name}`" />
    </v-skeleton-loader>
    <v-skeleton-loader
        type="card"
        :loading="!city || city.onWeekWeatherLoad"
        width="200"
        class="mx-3"
        v-for="i in loaders" :key="i"
    />
  </div>
</template>

<script>
import ForecastDaily from "@/components/ForecastDaily";
export default {
name: "Month",
  components:{ForecastDaily},
  data(){
    return{
      loaders: []
    }
  },
  async mounted() {
    for (let i = 0; i < 4; i ++)
      this.loaders.push(i)
    await this.awaitUserCity()
    await this.city.getMonthWeather()
    this.loaders = []
  }
}
</script>

<style scoped>
.forecast-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
