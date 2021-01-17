<template>
  <v-app-bar
      app
      color="primary"
      dark
      style="z-index: 1000"
  >
    <div class="d-flex align-center">
      <v-btn text :to="{name: 'City', params: {id:0}}">
        <v-icon>mdi-weather-windy-variant</v-icon>
        <span>Погода</span>
      </v-btn>
      <v-btn text :to="{name: 'Region'}">
        <span>Мой регион</span>
      </v-btn>
      <v-btn text :to="{name: 'Favorites'}">
        <span>Любимые города</span>
      </v-btn>

    </div>

  </v-app-bar>
</template>

<script>
export default {
name: "Header"
}
</script>

<style scoped>

</style>
