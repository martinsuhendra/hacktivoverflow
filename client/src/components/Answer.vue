<template>
  <v-container fluid grid-list-sm>
    <v-layout align-start justify-start column fill-height>
      <v-flex xs-12 style="width:100%">
        <div class="title">Your Answer</div>
        <v-text-field v-model="title" color="cyan darken" placeholder="Title..." loading>
          <template v-slot:progress>
            <v-progress-linear :title="progress" :color="color" height="7"></v-progress-linear>
          </template>
        </v-text-field>
      </v-flex>

      <v-flex xs-12>
        <ckeditor :editor="editor" v-model="answer"></ckeditor>
        <v-btn depressed small color="primary" @click="setAnswer">Submit</v-btn>
        <v-btn depressed small color="primary" @click="clear">Clear</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      editor: ClassicEditor,
      title: "",
      answer: "Input Your Answer Here..."
    };
  },
  methods: {
    ...mapActions(["createAnswer"]),
    setAnswer() {
      let newAnswer = {
        title: this.title,
        description: this.answer,
        user: localStorage.getItem("id"),
        question : this.$route.params.questionId
      };
      this.createAnswer(newAnswer);
    },
    clear() {
      (this.title = ""), (this.answer = "");
    }
  },
  computed: {
    progress() {
      return Math.min(100, this.title.length * 10);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    }
  }
};
</script>

<style>
</style>
