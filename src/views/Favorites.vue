<template>
  <div style="max-width: 700px; margin: auto">
    <h2 class="my-4 mx-3">Избранные города</h2>
    <v-row class="mt-3 mx-3">
      <v-select class="mx-4" label="Сортировать"
                v-model="sortBy" @change="onChange"
                :items="sortItems" item-text="text" item-value="value" />
      <v-select class="mx-4" label="Порядок"
                v-model="sortDir" @change="onChange"
                :items="dirItems" item-text="text" item-value="value" />
    </v-row>
    <h2 class="my-4 mx-3 text-center" v-if="favorites.length === 0">Здесь пока пусто!</h2>
    <cities-list :cities="itemsOnPage" weather del-btn />
    <div class="text-center mx-3">
      <v-pagination
          v-if="length > 1"
          v-model="page"
          :length="length"
      ></v-pagination>
    </div>
  </div>

</template>

<script>
import CitiesList from "@/components/CitiesList";
import {mapMutations} from 'vuex'
export default {
name: "Favorites",
  components:{
    CitiesList
  },
  data(){
    return {
      itemsCount: 5,
      page: 1,
      sortBy: 'name',
      sortDir: 'asc',
      sortItems:[
        {text: 'По названию', value: 'name'},
        {text: 'По дате добавления', value: 'date'},
        {text: 'По расстоянию', value: 'pos'}
      ]
    }
  },
  computed:{
    dirItems(){
      if (this.sortBy === 'name')
        return [
          {text: 'А-Я', value: 'asc'},
          {text: 'Я-А', value: 'desc'}
        ]
      else if (this.sortBy === 'date')
        return [
          {text: 'По возрастанию', value: 'asc'},
          {text: 'По убыванию', value: 'desc'}
        ]
      else
        return [
          {text: 'Ближе ко мне', value: 'asc'},
          {text: 'Дальше от меня', value: 'desc'}
        ]
    },
    itemsOnPage(){
      let result = []
      this.favorites.forEach((city, index) => {
        if (index < this.page * this.itemsCount && index >= (this.page - 1) * this.itemsCount)
          result.push(city)
      })
      return result
    },
    length(){
      return Math.ceil(this.favorites.length / this.itemsCount)
    }
  },
  methods:{
    ...mapMutations(["sortFavorites"]),
    onChange(){
      this.sortFavorites({type: this.sortBy, dir: this.sortDir})
      this.page = 1
    }
  },
  mounted() {
    this.sortFavorites({type: this.sortBy, dir: this.sortDir})
  }
}
</script>

<style scoped>

</style>
