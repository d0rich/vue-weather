<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <div class="d-flex align-center">
      <v-btn text :to="{name: 'City', params: {id:0}}">
        <v-icon>mdi-weather-windy-variant</v-icon>
        <span>Погода</span>
      </v-btn>
      <v-btn text :to="{name: 'Region'}">
        <span>Мой регион</span>
      </v-btn>

    </div>

    <v-spacer></v-spacer>

    <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
    >
      <span class="mr-2">Latest Release</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
name: "Header"
}
</script>

<style scoped>

</style>
