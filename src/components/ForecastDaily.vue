<template>
  <div class="weather-container">
    <v-card elevation="2"
            shaped
            class="ma-3 weather-card"
            v-for="(note, index) in weekWeather" :key="index" >
      <v-card-title class="card-title">{{note.dayName}}</v-card-title>
      <v-card-subtitle class="card-title">{{note.date.toLocaleDateString()}}</v-card-subtitle>
      <v-card-text class="temp-section">
        <v-img :src="note.cloudIcon">
          <div class="temp-section-div">
            <div class="mb-5 temp-value">
              <h1>{{note.temp}}&deg;</h1>
              <img v-if="note.tempIcon" :src="note.tempIcon" alt="temp">
            </div>
            <div class="feels-like">
              <div>Ощущается как: {{note.feelsLike}}&deg;</div>
              <div><v-icon>mdi-weather-cloudy</v-icon>{{note.cloudiness}}%</div>
            </div>
          </div>
        </v-img>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
name: "ForecastDaily",
  props:{
    weekWeather: Array
  }
}
</script>

<style scoped lang="scss">
.card-title{
  background-color: white;
}
.weather-container{
  overflow-x: auto;
  display: flex;
  width: 80vw;
}
.weather-card{
  max-width: 200px;
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
    background-color: rgba(255,255,255,0.7);
    border-radius: 10px;
    padding: 0.3em 0.5em;
  }
}
</style>
