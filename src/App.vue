<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import {Coords, IpApi} from "@/classes";
import {mapActions} from 'vuex'
export default {
  name: 'App',

  components: {
    Header
  },

  data: () => ({
    //
  }),
  methods:{
    ...mapActions(['setTimeInterval', 'loadStartData', 'getRegions'])
  },
  mounted() {
    this.setTimeInterval()
    navigator.geolocation.getCurrentPosition(async location => {
      this.loadStartData(new Coords(location.coords))
    }, async () => {
      let location = await new IpApi().getCoordsByIp()
      this.loadStartData(location)
    }, undefined )
    this.getFavorites()
    this.getRegions()
  }
};
</script>
