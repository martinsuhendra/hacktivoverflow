<template>
    <div v-if="!questions.length">
        <img src="../../public/undraw_no_data_qbuo.svg" alt="" srcset="" style="max-width: 100%;">
    </div>
  <v-container grid-list-md text-xs-center fluid v-else>
    <v-layout row wrap align-start justify-start>
      <div class="display-1 font-weight-light">Top Question</div>
      <v-spacer></v-spacer>
      <div>
        <v-btn color="info">Ask Question</v-btn>
      </div>
    </v-layout>
    <br>
    <hr>
    <br>
    <v-layout
      row
      wrap
      align-start
      justify-start
      v-for="(question, index) in questions"
      :key="index"
      class="mb-4"
    >
      <!-- LEFT-->
      <v-flex xs1>
        <div class="body-2">0</div>
        <span class="body-1">Votes</span>
      </v-flex>
      <v-flex xs1>
        <div class="body-2">{{question.answers.length}}</div>
        <span class="body-1">Answers</span>
      </v-flex>
      <v-flex xs10 class="title pl-4">
        <div class="subheading text-truncate mb-2">{{question.title}}</div>
        <span class="caption">author : {{question.user.name}}</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
    created() {
      this.$store.state.questions = []
      this.getQuestions(localStorage.getItem('id'))
    },
    computed: {
        ...mapState(['questions'])
    },
    methods: {
        ...mapActions(['getQuestions'])
    },
}
</script>

<style scoped>
image.center {
    position:absolute;
    z-index:0;
}
</style>
