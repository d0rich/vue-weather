<template>
  <v-card
      elevation="2"
      shaped
      class="ma-3"
  >
    <v-card-title class="card-title">Погода в городе {{cityName}} сейчас</v-card-title>
    <v-card-subtitle class="card-title">{{timeNow.toLocaleString('ru-RU')}}</v-card-subtitle>
    <v-card-text class="temp-section">
      <v-img :src="weather.cloudIcon">
        <div class="temp-section-div">
          <div class="mb-5 temp-value">
            <h1>{{weather.temp}}&deg;</h1>
            <img v-if="weather.tempIcon" :src="weather.tempIcon" alt="temp">
            <img v-if="weather.humidityIcon" :src="weather.humidityIcon" alt="temp">
          </div>
          <h3 class="feels-like">Ощущается как: {{weather.feelsLike}}&deg;</h3>
        </div>
      </v-img>
    </v-card-text>
    <v-card-text>
      <v-simple-table>
          <thead>
          <tr>
            <th class="text-center">Облачность</th>
            <th class="text-center">Ветер</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="text-center">{{weather.cloudiness}}%</td>
            <td class="text-center">{{weather.windSpeed}} м/с, {{weather.windDir}}</td>
          </tr>
          </tbody>
      </v-simple-table>
      <v-simple-table>
        <thead>
        <tr>
          <th class="text-center">Влажность</th>
          <th class="text-center">Давление</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="text-center">{{weather.humidity}}%</td>
          <td class="text-center">{{weather.pressure}} мм. рт. ст.</td>
        </tr>
        </tbody>
      </v-simple-table>
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
  background-color: var(--v-accent-base);
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
    text-align: center;
    color: var(--v-secondary-base);
    background-color: rgba(255,255,255,0.4);
    border-radius: 10px;
    padding: 0.3em 0.5em;
  }
}

</style>
