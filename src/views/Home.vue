<template>
  <div class="home">
      <div>{{timeNow.toLocaleString('ru-RU')}}</div>
      <WeatherNow :city-name="city.name" :weather="city.currentWeather" />

  </div>
</template>

<script>
import WeatherNow from "@/components/WeatherNow";

export default {
  name: 'Home',
  components: {
    WeatherNow
  }
}
</script>
<style scoped lang="scss">
.home{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200%;
}
</style>
