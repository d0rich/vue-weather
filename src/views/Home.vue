<template>
  <div class="home">
    <v-skeleton-loader
        type="card"
        :loading="!city || city.onCurrentWeatherLoad"
        width="300"
    >
      <WeatherNow :city-name="city.name" :weather="city.currentWeather" />
    </v-skeleton-loader>

    <v-skeleton-loader
        type="card"
        :loading="!city || city.onSunDayLoad"
        width="200"
    >
      <SunDay :sunday="city.sunDay" />
    </v-skeleton-loader>
    <v-skeleton-loader
        type="card"
        :loading="!city || city.onWeekWeatherLoad"
        width="200"
    >
      <ForecastDaily :week-weather="city.weekWeather" />
    </v-skeleton-loader>
  </div>
</template>

<script>
import WeatherNow from "@/components/WeatherNow";
import SunDay from "@/components/SunDay";
import ForecastDaily from "@/components/ForecastDaily";

export default {
  name: 'Home',
  components: {
    WeatherNow, SunDay, ForecastDaily
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
</style>
