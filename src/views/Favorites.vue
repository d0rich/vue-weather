<template>
  <div>
    <v-select class="mx-4" label="Сортировать по" v-model="sortBy" @change="onChange" :items="sortItems" item-text="text" item-value="value" />
    <div class="favorites-container">
      <v-skeleton-loader
          v-for="(city, index) in favorites" :key="index"
          type="card"
          :loading="!city || city.onCurrentWeatherLoad"
          width="300"
      >
        <WeatherNow :city-now="city" :weather="city.currentWeather" />
      </v-skeleton-loader>
    </div>
  </div>

</template>

<script>
import WeatherNow from "@/components/WeatherNow";
import {mapMutations} from 'vuex'
export default {
name: "Favorites",
  components:{
    WeatherNow
  },
  data(){
    return {
      sortBy: 'name',
      sortItems:[
        {text: 'По названию', value: 'name'},
        {text: 'По дате добавления', value: 'date'},
        {text: 'По расстоянию', value: 'pos'}
      ]
    }
  },
  methods:{
    ...mapMutations(["sortFavorites"]),
    onChange(){
      this.sortFavorites(this.sortBy)
    }
  },
  mounted() {
    this.sortFavorites(this.sortBy)
  }
}
</script>

<style scoped>
.favorites-container{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
