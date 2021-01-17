<template>
  <v-card
      elevation="2"
      shaped
      class="ma-3"
      width="280"
  >
    <v-card-title class="card-title">
      <v-col class="pa-0">
        <div>
          {{cityNow.name}}
          <v-btn v-if="cityNow.favorite" color="orange" icon @click="removeFavorite(cityNow)"><v-icon>mdi-star</v-icon></v-btn>
          <v-btn v-else color="orange" icon @click="addFavorite(cityNow)"><v-icon>mdi-star-outline</v-icon></v-btn>
        </div>
        <div>Погода сейчас</div>
      </v-col>

    </v-card-title>
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
            <div>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs"
                        v-on="on">
                    <v-icon>mdi-weather-cloudy</v-icon>{{weather.cloudiness}}%
                  </span>
                </template>
                <span>Облачность</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs"
                        v-on="on">
                    <v-icon>mdi-weather-windy</v-icon>{{weather.windSpeed}} м/с, {{weather.windDir}}
                  </span>
                </template>
                <span>Ветер</span>
              </v-tooltip>

              </div>
            <div>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs"
                        v-on="on">
                    <v-icon>mdi-water-percent</v-icon>{{weather.humidity}}%
                  </span>
                </template>
                <span>Влажность</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs"
                        v-on="on">
                    <v-icon>mdi-speedometer</v-icon>{{weather.pressure}} мм. рт. ст.
                  </span>
                </template>
                <span>Давление</span>
              </v-tooltip>


            </div>
          </div>
        </div>
      </v-img>
    </v-card-text>

  </v-card>
</template>

<script>
import {WeatherNote, City} from "@/classes";

export default {
name: "WeatherNow",
  props:{
    cityNow: City,
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
