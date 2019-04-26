<template>
  <v-container grid-list-md text-xs-center fluid>
    <v-layout row wrap align-start justify-start>
      <div class="display-1 font-weight-light">Top Question</div>
      <v-spacer></v-spacer>
      <div>
        <v-btn color="info" @click="getQuestion">Ask Question</v-btn>
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
      v-for="(question, index) in filtered"
      :key="index"
      class="mb-4"
    >
      <!-- LEFT-->
      <v-flex xs1>
        <div class="body-2">{{Math.abs(question.upvotes.length - question.downvotes.length)}}</div>
        <span class="body-1">Votes</span>
      </v-flex>
      <v-flex xs1>
        <div class="body-2">{{question.answers.length}}</div>
        <span class="body-1">Answers</span>
      </v-flex>
      <v-flex xs10 class="title pl-4">
        <router-link :to="{ name: 'oneQuestion', params: { questionId: question._id }}">
            <div class="subheading text-truncate mb-2">{{question.title}}</div>
        </router-link>
        <span class="caption">author : {{question.user.name}}</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "LandingPage",
  props: ['search'],
  data: () => ({}),
  created() {
    this.$store.state.questions = []
    this.getQuestions();
  },
  computed: {
    ...mapState(["questions"]),
      filtered() {
            return this.questions.filter((entry)=> {
                return entry.title.toLowerCase().match(this.search)
            })
        }
  },
  methods: {
    ...mapActions(["getQuestions"]),
    getQuestion() {
      if (!localStorage.getItem("token")) {
        this.$router.push({ path: "/auth" });
        this.$swal("Ooops", "please login to continue", "warning");
      } else {
        this.$router.push({ path: "/questions" });
      }
    }
  }
};
</script>

<style scoped>
</style>
