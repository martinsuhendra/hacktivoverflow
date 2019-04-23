<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap align-start justify-start>
      <div class="display-1 font-weight-light">Top Question</div>
      <v-spacer></v-spacer>
      <div>
        <router-link to = "/questions" style="text-decoration : none">
          <v-btn color="info">Ask Question</v-btn>
        </router-link>
      </div>
    </v-layout>
    <br>
    <hr>
    <br>
    <v-layout row wrap align-start justify-start>
      <!-- LEFT-->
      <v-flex xs1>
        <div class="headline">{{votes}}</div>
        <span class="body-1">Votes</span>
      </v-flex>
      <v-flex xs1>
        <div class="headline">{{answers}}</div>
        <span class="body-1">Answers</span>
      </v-flex>
       <!-- right-->
      <v-flex xs8>
        <div class="headline">{{question}}</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'LandingPage',
  data: () => ({
    votes : 0,
    answers : 0,
    question : "Question is here..."
  })
};
</script>

<style>
</style>
