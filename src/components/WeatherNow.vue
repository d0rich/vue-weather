<template>
  <v-card
      elevation="2"
      shaped
      class="ma-3"
  >
    <v-card-title class="card-title">Погода в г. {{cityName}} сейчас</v-card-title>
    <v-card-subtitle class="card-title" style="color: white">{{timeNow.toLocaleString('ru-RU')}}</v-card-subtitle>
    <v-card-text class="temp-section">
      <v-img :src="weather.cloudIcon">
        <div class="temp-section-div">
          <div class="mb-5 temp-value">
            <h1>{{weather.temp}}&deg;</h1>
            <img v-if="weather.tempIcon" :src="weather.tempIcon" alt="temp">
            <img v-if="weather.humidityIcon" :src="weather.humidityIcon" alt="temp">
          </div>
          <div class="feels-like">
            <div>Ощущается как: {{weather.feelsLike}}&deg;</div>
            <div><v-icon>mdi-weather-cloudy</v-icon>{{weather.cloudiness}}%   <v-icon>mdi-weather-windy</v-icon>{{weather.windSpeed}} м/с, {{weather.windDir}}</div>
            <div><v-icon>mdi-water-percent</v-icon>{{weather.humidity}}%   <v-icon>mdi-speedometer</v-icon>{{weather.pressure}} мм. рт. ст.</div>
          </div>
        </div>
      </v-img>
    </v-card-text>

  </v-card>
</template>

<script>
import {WeatherNote} from "@/classes";

export default {
name: "WeatherNow",
  props:{
    cityName: String,
    weather: WeatherNote
  }
}
</script>

<style scoped lang="scss">
.card-title{
  background-color: var(--v-primary-base);
  color: white;
}
.temp-section{
  background-color: var(--v-accent-base);
}
.temp-section-div{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .temp-value{
    display: flex;
    flex-direction: row;
    align-items: center;
    img{
      max-width: 30px;
    }
  }
  .feels-like{
    text-align: left;
    color: var(--v-secondary-base);
    background-color: rgba(255,255,255,0.6);
    border-radius: 10px;
    padding: 0.3em 0.5em;
  }
}

</style>
