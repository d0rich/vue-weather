<template>
  <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="modal.show"
      @click:outside="closeModal"
  >
    <template>
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >Успешно</v-toolbar>
        <v-card-text>
          <div class="pt-3">{{modal.text}}</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
              text
              color="red"
              @click="closeModal"
          >Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
name: "Modal",
  computed:{
    ...mapState(["modal"])
  },
  methods:{
    ...mapMutations(["closeModal"])
  }
}
</script>

<style scoped>

</style>
