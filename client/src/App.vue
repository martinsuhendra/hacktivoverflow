<template>
  <v-app>
    <v-toolbar dark color="primary">
      <!--LOGO-->
      <span>hackticvoverflow</span>

      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3>
        <v-text-field placeholder="Search"></v-text-field>
      </v-flex>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <router-link to = "/auth">
            <v-icon dark v-on="on" @click="getAuth('login')">account_circle</v-icon>
          </router-link>
        </template>
        <span>Login</span>
      </v-tooltip>

      <div></div>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <router-link to="/auth">
            <v-icon dark v-on="on" @click="getAuth('register')" style="margin-left:10px">fingerprint</v-icon>
          </router-link>
        </template>
        <span>Sign Up</span>
      </v-tooltip>
    </v-toolbar>

    <v-container grid-list-md fluid>
      <v-layout row wrap>
        <!-- LEFT -->
        <v-flex xs3>
          <div>
            <router-link to = "/" style="text-decoration: none">
              <v-btn color="blue-grey" class="white--text">
                Home
                <v-icon right dark>home</v-icon>
              </v-btn>
            </router-link>
          </div>
          <div>
            <v-btn color="blue-grey" class="white--text">
              Users
              <v-icon right dark>person</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <!-- CENTER -->
        <v-flex xs6 grow pa-1>
          <v-content>
            <router-view></router-view>
          </v-content>
        </v-flex>
        <!-- RIGHT -->
        <v-flex xs3></v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  components: {},
  data() {
    return {
      items: ["Home", "Users"]
    };
  },
  computed: {},
  methods: {
    getAuth(value) {
      this.setAuth(value);
    },
    ...mapMutations(["setAuth"])
  }
};
</script>
