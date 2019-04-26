<template>
  <v-app>
    <v-toolbar dark color="primary">
      <!--LOGO-->
      <span>hackticvoverflow</span>

      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3>
        <v-text-field placeholder="Search" v-model="search"></v-text-field>
      </v-flex>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <router-link to = "/auth" v-if="!isLogin">
            <v-icon dark v-on="on" @click="getAuth('login')">lock_open</v-icon>
          </router-link>
          <router-link to = "/"  v-else-if="isLogin">
            <v-icon dark v-on="on" @click="clear">lock_outline</v-icon>
          </router-link>
        </template>
        <span v-if="!isLogin">Login</span>
        <span v-else-if="isLogin">Logout</span>
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
        <v-flex xs2>
          <div>
            <router-link to = "/" style="text-decoration: none">
              <v-btn color="blue-grey" class="white--text">
                Home
                <v-icon right dark>home</v-icon>
              </v-btn>
            </router-link>
          </div>
          <div>
            <v-btn color="blue-grey" class="white--text" @click="getUserQuestions">
              Users
              <v-icon right dark>person</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <!-- CENTER -->
        <v-flex xs8 grow pa-1>
          <v-content>
            <router-view :search="search"></router-view>
          </v-content>
        </v-flex>
        <!-- RIGHT -->
        <v-flex xs2></v-flex>
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
      items: ["Home", "Users"],
      search : ""
    };
  },
  created() {
    if (localStorage.getItem('token')) {
      this.$store.state.isLogin = true
    } else {
      this.$store.state.isLogin = false
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    clear() {
      localStorage.clear()
      this.$store.state.isLogin = false
      this.$swal("success","Successfully logout","success")
    },
    getAuth(value) {
      this.setAuth(value);
    },
    getUserQuestions() {
      if (!localStorage.getItem('token')) {
         this.$swal("Sorry","Please login to continue","warning")
      } else {
         this.$router.push({ path: `/questions/myList` });
      }
    },
    ...mapMutations(["setAuth"])
  }
};
</script>
