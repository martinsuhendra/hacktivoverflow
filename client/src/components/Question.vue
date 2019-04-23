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
        <ckeditor :editor="editor" v-model="question"></ckeditor>
        <v-btn depressed small color="primary" @click="setQuestion">Submit</v-btn>
        <v-btn depressed small color="primary" @click="clear">Clear</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapActions } from 'vuex'
export default {
  name: "Question",
  components: {},
  data() {
    return {
      title: "",
      editor: ClassicEditor,
      question: "Input Your Question Here..."
    };
  },
  methods: {
      clear() {
          this.question = "",
          this.title = ""
      },
      setQuestion() {
          let newQuestion = {
              title : this.title,
              description : this.question,
              user : localStorage.getItem('id')
          }
          this.createQuestion(newQuestion)
      },
      ...mapActions(['createQuestion'])
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
