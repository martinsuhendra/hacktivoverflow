<template>
  <v-container fluid grid-list-sm>
    <v-layout align-start justify-start column fill-height>
      <v-flex xs-12 style="width:100%">
        <div class="title">Title</div>
        <v-text-field v-model="title" color="cyan darken" placeholder="Start typing..." loading>
          <template v-slot:progress>
            <v-progress-linear :title="progress" :color="color" height="7"></v-progress-linear>
          </template>
        </v-text-field>
      </v-flex>

      <v-flex xs-12>
        <ckeditor :editor="editor" v-model="answer"></ckeditor>
        <v-btn
          depressed
          small
          color="primary"
          @click="getUpdateAnswer(params)"
        >Update</v-btn>
        <v-btn depressed small color="primary" @click="clear">Clear</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapActions, mapState } from "vuex";
import axios from 'axios';
const baseURL = 'http://localhost:3000'
export default {
  name: "Question",
  components: {},
  data() {
    return {
      title: "",
      editor: ClassicEditor,
      answer: "",
      params : "",
      question: "",
      user : ""
    };
  },
  created() {
    this.params = this.$route.params.answerId;
    
    axios
      .get(`${baseURL}/answers/detail/${this.$route.params.answerId}`)
      .then(({ data }) => {
          this.title = data.title,
          this.answer = data.description
          this.question = data.question
          this.user = data.user._id
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    clear() {
      (this.answer = ""), (this.title = "");
    },
    getUpdateAnswer(id) {
      this.updateAnswer({ answerId: id, title: this.title, description: this.answer, question: this.question, user: this.user});
    },
    ...mapActions(["createQuestion", "getAnswerDetails", "updateAnswer"])
  },
  computed: {
    ...mapState(["title, answer"]),
    progress() {
      return Math.min(100, this.title.length * 10);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    }
  },
  mounted() {
  }
};
</script>

<style>
</style>
