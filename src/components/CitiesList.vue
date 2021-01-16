<template>
  <v-list :style="{'max-height': maxHeight || 'unset', overflow: 'auto'}" >
    <v-list-item v-for="(city, index) in cities" :key="index" link :to="{name: 'City', params: {id: city.id}}">
      <v-list-item-content>
        <v-list-item-title>
          <span v-if="positions">{{index + 1}})</span> {{city.name}}
        </v-list-item-title>
        <v-list-item-subtitle>
          Население: {{city.populationString}}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>

export default {
name: "CitiesList",
  props:{
    maxHeight: String,
    cities: Array,
    positions: Boolean
  }
}
</script>

<style scoped>

</style>
