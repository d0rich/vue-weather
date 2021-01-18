<template>
  <div class="forecast-container">
    <v-skeleton-loader
        type="card"
        :loading="!city || city.onWeekWeatherLoad"
        width="200"
        class="ma-3"
    >
      <ForecastDaily :week-weather="city.weekWeather" :text="`Прогноз погоды на 10 дней в ${city.name}`" />
    </v-skeleton-loader>
    <v-skeleton-loader
        type="card"
        :loading="!city || city.onWeekWeatherLoad"
        width="200"
        class="ma-3"
        v-for="i in loaders" :key="i"
    />
  </div>
</template>

<script>
import ForecastDaily from "@/components/ForecastDaily";
export default {
name: "Weather10Days",
  components: {ForecastDaily},
  data(){
    return{
      loaders: []
    }
  },
  async mounted() {
    for (let i = 0; i < 4; i ++)
      this.loaders.push(i)
    await this.awaitUserCity()
    await this.city.getWeekWeather()
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
