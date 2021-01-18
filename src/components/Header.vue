<template>
  <div>
    <v-app-bar
        app
        color="primary"
        dark
        style="z-index: 1000"
        v-resize="onResize"
    >
      <v-app-bar-nav-icon v-if="sideBar" @click.stop="drawer = !drawer"/>
      <div class="d-flex align-center">
        <v-btn text :to="{name: 'City', params: {id:0}}">
          <v-icon>mdi-weather-windy-variant</v-icon>
          <span>Погода</span>
        </v-btn>
        <v-btn text :to="{name: '10Days'}" v-if="!sideBar">
          <v-icon>mdi-format-list-bulleted</v-icon>
          <span>Прогноз на 10 дней</span>
        </v-btn>
        <v-btn text :to="{name: 'Month'}" v-if="!sideBar">
          <v-icon>mdi-calendar</v-icon>
          <span>Прогноз на месяц</span>
        </v-btn>
        <v-btn text :to="{name: 'Region'}" v-if="!sideBar">
          <v-icon>mdi-map-search-outline</v-icon>
          <span>Мой регион</span>
        </v-btn>
        <v-btn text :to="{name: 'Favorites'}" v-if="!sideBar">
          <v-icon>mdi-star</v-icon>
          <span>Избранное</span>
        </v-btn>

      </div>

    </v-app-bar>

    <v-navigation-drawer
        v-if="sideBar"
        v-model="drawer"
        absolute
        temporary
        class="pt-16"
    >
      <v-list
          nav
          dense
      >
        <v-list-item :to="{name: '10Days'}">
          <v-list-item-title>
            <v-icon>mdi-format-list-bulleted</v-icon>
            <span>Прогноз на 10 дней</span></v-list-item-title>
        </v-list-item>

        <v-list-item :to="{name: 'Month'}">
          <v-list-item-title>
            <v-icon>mdi-calendar</v-icon>
            <span>Прогноз на месяц</span></v-list-item-title>
        </v-list-item>

        <v-list-item :to="{name: 'Region'}">
          <v-list-item-title>
            <v-icon>mdi-map-search-outline</v-icon>
            <span>Мой регион</span>
          </v-list-item-title>
        </v-list-item>

        <v-list-item :to="{name: 'Favorites'}">
          <v-list-item-title>
            <v-icon>mdi-star</v-icon>
            <span>Избранное</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>

</template>

<script>
export default {
name: "Header",
  data(){
    return{
      drawer: false,
      sideBar: false
    }
  },
  methods:{
    onResize(){
      this.sideBar = window.innerWidth < 1000;
    }
  }
}
</script>

<style scoped>

</style>
