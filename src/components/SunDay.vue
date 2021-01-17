<template>
  <v-card
      elevation="2"
      shaped
      class="ma-3"
  >
    <v-card-title class="card-title">Солнечный день</v-card-title>
    <v-img :src="sunday.picture" max-width="300" />
    <v-card-text class="time-block">
      <div class="time">
        <div>Восход</div>
        <div>{{sunday.sunriseTime}}</div>
      </div>
      <div class="time">
        <div>Длительность</div>
        <div>{{sunday.long}}</div>
      </div>
      <div class="time">
        <div>Закат</div>
        <div>{{sunday.sunsetTime}}</div>
      </div>
    </v-card-text>
    <v-card-text class="card-body">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="orange"
              dark
              icon
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-weather-sunset-up</v-icon>
          </v-btn>
        </template>
        <span>Восход</span>
      </v-tooltip>

      <v-progress-linear color="orange" stream :value="(timeNow - sunday.sunrise) / (sunday.sunset - sunday.sunrise) * 100" buffer-value="0"/>
      <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="red"
            dark
            icon
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-weather-sunset-down</v-icon>
        </v-btn>
      </template>
      <span>Закат</span>
    </v-tooltip>
    </v-card-text>
  </v-card>
</template>

<script>
import {SunDay} from "@/classes";

export default {
name: "SunDay",
  props:{
    sunday: SunDay
  }
}
</script>

<style scoped lang="scss">
.card-title{
  background-color: var(--v-primary-base);
  color: white;
}
.card-body{
  display: flex;
  align-items: center;
}
.time-block{
  display: flex;
  justify-content: space-between;
  padding-bottom: 0;
  .time:nth-of-type(1){
    text-align: left;
  }
  .time:nth-of-type(2){
    text-align: center;
  }
  .time:nth-of-type(3){
    text-align: right;
  }
}
</style>
