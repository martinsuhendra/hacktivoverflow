<template>
  <!-- REGISTER -->
  <form v-if="this.$store.state.auth == 'register'">
    <h2 class="text-xs-center">Sign Up Form</h2>
    <v-text-field v-model="name" label="Name" required></v-text-field>
    <v-text-field v-model="email" label="E-mail" required></v-text-field>
    <v-text-field type="password" v-model="password" label="Password" required></v-text-field>

    <v-btn @click="getRegister">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>

  <!-- LOGIN -->
  <form v-else-if="this.$store.state.auth == 'login' || this.$store.state.isLogin == false">
    <h2 class="text-xs-center">Login Form</h2>
    <v-text-field v-model="email" label="E-mail" required></v-text-field>
    <v-text-field type="password" v-model="password" label="Password" required></v-text-field>

    <v-btn @click="getLogin">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "RegisterSign",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  created() {
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    clear() {
      console.log('masuk clear');
      this.name = "";
      this.email = "";
      this.password = "";
    },
    getRegister() {
      let newUser = {
          name : this.name,
          email : this.email,
          password : this.password
      }
      this.register(newUser);
    },
    getLogin() {
      let loginUser = {
        email : this.email,
        password : this.password
      }
      this.signIn(loginUser);
    },
    ...mapActions(["register","signIn"])
  }
};
</script>

<style>
</style>
