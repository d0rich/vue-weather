<template>
  <div>
    <v-skeleton-loader
        type="card"
        :loading="onRegionLoad"
        width="300"
    >
      <v-card elevation="2"
              shaped
              class="ma-3 card-container">
        <v-card-title class="card-title">{{region.name}}</v-card-title>
        <v-card-text class="mt-7">
          <v-row>
            <v-select class="mx-4" label="Записи на странице" v-model="itemsOnPage" :items="itemsOnPageItems" />
            <v-select class="mx-4" label="Сортировать по" v-model="orderBy" :items="orderByItems" item-text="text" item-value="value" />
            <v-select class="mx-4" label="Порядок" v-model="orderDir" :items="orderDirItems" item-text="text" item-value="value" />
            <v-btn class="mx-4" color="primary" @click="region.getCities(1, itemsOnPage, orderBy, orderDir)" >Поиск</v-btn>
          </v-row>
        </v-card-text>

        <CitiesList :cities="region.cities" max-height="65vh"/>
        <v-pagination
            v-model="page"
            :length="region.citiesPages"
        ></v-pagination>
        <v-card-text class="card-title" />
      </v-card>
    </v-skeleton-loader>
  </div>
</template>

<script>
import CitiesList from "@/components/CitiesList";
export default {
name: "Region",
  components:{
    CitiesList
  },
  data(){
    return{
      page: 1,
      onRegionLoad: true,
      orderBy: 'name',
      orderDir: 'asc',
      itemsOnPage: 20,
      orderByItems: [
        {text: 'Население', value: 'population'},
        {text: 'Название', value: 'name'}
      ],
      orderDirItems:[
        {text: 'По возрастанию', value: 'asc'},
        {text: 'По убыванию', value: 'desc'}
      ],
      itemsOnPageItems: [20, 50, 100]
    }
  },
  watch:{
    page(){
      this.region.getCities(this.page, this.itemsOnPage, this.orderBy, this.orderDir)
    }
  },
  methods:{
    async awaitUserRegion(){
      if (!this.region || this.region.id === 0){
        await this.timeout(100)
        await this.awaitUserRegion()
      }
    },
  },
  async mounted() {
    this.onRegionLoad = true
    await this.awaitUserRegion()
    await this.region.getCities(this.page, this.itemsOnPage, this.orderBy, this.orderDir)
    this.onRegionLoad = false
  }

}
</script>

<style scoped>
.card-title{
  background-color: var(--v-primary-base);
  color: white;
}
</style>
