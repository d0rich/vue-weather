<template>
  <v-list :style="{'max-height': maxHeight || 'unset', overflow: 'auto'}" >
    <v-list-item v-for="(city, index) in cities" :key="index"
                 link :to="delBtn ? null : {name: 'City', params: {id: city.id}}">
      <v-list-item-content @click="goToCity(city)">
        <v-list-item-title>
          <span v-if="positions">{{index + 1}})</span> {{city.name}}
          <v-icon v-if="city.favorite" color="orange">mdi-star</v-icon>
        </v-list-item-title>
        <v-list-item-subtitle v-if="population">
          Население: {{city.populationString}}
        </v-list-item-subtitle>
        <v-list-item-subtitle v-if="weather && city.currentWeather">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs"
                        v-on="on">
                    <v-icon>mdi-thermometer</v-icon>{{city.currentWeather.temp}}&deg; |
                  </span>
            </template>
            <span>Температура</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs"
                        v-on="on">
                    <v-icon>mdi-hand-pointing-right</v-icon>{{city.currentWeather.feelsLike}}&deg; |
                  </span>
            </template>
            <span>Ощущается как</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs"
                        v-on="on">
                    <v-icon>mdi-weather-cloudy</v-icon>{{city.currentWeather.cloudiness}}% |
                  </span>
            </template>
            <span>Облачность</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs"
                        v-on="on">
                    <v-icon>mdi-water-percent</v-icon>{{city.currentWeather.humidity}}% |
                  </span>
            </template>
            <span>Влажность</span>
          </v-tooltip>
        </v-list-item-subtitle>
        <v-list-item-subtitle v-if="weather && city.currentWeather">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs"
                          v-on="on">
                      <v-icon>mdi-weather-windy</v-icon>{{city.currentWeather.windSpeed}} м/с, {{city.currentWeather.windDir}} |
                    </span>
            </template>
            <span>Ветер</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs"
                        v-on="on">
                    <v-icon>mdi-speedometer</v-icon>{{city.currentWeather.pressure}} мм. рт. ст.
                  </span>
            </template>
            <span>Давление</span>
          </v-tooltip>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action v-if="delBtn">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs"
                        v-on="on" icon
                        @click="removeFavorite(city)">
                    <v-icon color="red">mdi-close-circle-outline</v-icon>
                  </v-btn>
          </template>
          <span>Удалить из избранного</span>
        </v-tooltip>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>

export default {
name: "CitiesList",
  props:{
    maxHeight: String,
    cities: Array,
    positions: Boolean,
    population: Boolean,
    weather: Boolean,
    delBtn: Boolean
  },
  methods:{
    goToCity(city){
      this.$router.push({name: 'City', params: {id: city.id} })
    }
  }
}
</script>

<style scoped>

</style>
