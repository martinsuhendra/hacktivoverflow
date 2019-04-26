<template>
  <v-container grid-list-md text-xs-center fluid>
    <!-- Questions -->

    <v-layout row wrap align-start justify-start>
      <div class="display-1 font-weight-light">Question</div>
      <v-spacer></v-spacer>
      <div>
        <v-btn color="info">Ask Question</v-btn>
      </div>
    </v-layout>
    <br>
    <hr>
    <br>
    <v-layout row wrap align-start justify-start class="mb-4">
      <!-- LEFT-->
      <v-flex xs2 class="pt-4">
        <div class="body-2" @click="getUpvote('questions', questions._id)">
          <v-btn fab dark small grey darken-1>
            <i class="material-icons">arrow_drop_up</i>
          </v-btn>
        </div>
        {{countQuestion}}
        <div class="body-2">
          <v-btn fab dark small grey darken-1 @click="getDownvote('questions', questions._id)">
            <i class="material-icons">arrow_drop_down</i>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs8 class="title pl-4">
        {{questions.title}}
        <div class="caption pl-4 pt-2 text-sm-left">{{questions.description}}</div>
        <div class="body-2 pl-4 pt-2 text-sm-left">author : {{questions.user.name}}</div>
      </v-flex>
    </v-layout>

    <!-- Answers -->
    <v-layout row wrap align-start justify-start>
      <div class="display-1 font-weight-light">Answers</div>
      <v-spacer></v-spacer>
      <div>
        <v-btn color="info" @click="Answer">Create Answer</v-btn>
      </div>
    </v-layout>
    <br>
    <hr>
    <br>
    <div v-if="answers.length > 0">
       <v-layout row wrap align-start justify-start class="mb-4" v-for="(answer, index) in answers" :key="index">
      <!-- LEFT-->
      <v-flex xs2 class="pt-4">
        <div class="body-2">
          <v-btn fab dark small grey darken-1 @click="getUpvote('answer',answer._id)">
            <i class="material-icons">arrow_drop_up</i>
          </v-btn>
        </div>
        <div class="body-1" v-if="answers">{{+answer.upvotes.length - +answer.downvotes.length}}</div>
        <div class="body-2">
          <v-btn fab dark small grey darken-1 @click="getDownvote('answer', answer._id)">
            <i class="material-icons">arrow_drop_down</i>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs8 class="title pl-4" v-if="answer.user">
        {{answer.title}}
        <div class="caption pl-4 pt-2 text-sm-left">{{answer.description}}</div>
        <div class="body-2 pl-4 pt-2 text-sm-left">author : {{answer.user.name}}</div>
         <v-btn color="warning" v-if="answer.user._id == userId" @click="getUpdateAnswer(answer._id)">Update</v-btn>
      </v-flex>
    </v-layout>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      userId: localStorage.getItem("id"),
      totalVote: 0,
      ready: false
    };
  },
  created() {
    this.$store.state.questions = [];
    this.getQuestionDetails(this.$route.params.questionId);
    this.getAnswer(this.$route.params.questionId);
  },
  computed: {
    ...mapState(["questions", "answers", "countQuestion", "countAnswer"])
  },
  methods: {
    ...mapActions([
      "getQuestionDetails",
      "getAnswer",
      "upvote",
      "downvote",
      "updateAnswer"
    ]),
    Answer() {
      if (!localStorage.getItem("token")) {
        this.$swal("Sorry", "please login to continue", "warning");
      } else {
        this.$router.push({
          name: "answers",
          params: { questionId: this.$route.params.questionId }
        });
      }
    },
    getUpvote(value, id) {
      if (value == "questions") {
        this.upvote({ questionId: this.$route.params, value: "questions" });
      } else {
        this.upvote({ answerId: id, value: "answers" });
      }
    },
    getDownvote(value, id) {
      if (value == "questions") {
        this.downvote({ questionId: this.$route.params, value: "questions" });
      } else {
        this.downvote({ answerId: id, value: "answers" });
      }
    },
    getUpdateAnswer(answerId) {
      this.$router.push({
        name: "updateAnswer",
        params: { answerId }
      });
    }
  }
};
</script>

<style>
</style>
