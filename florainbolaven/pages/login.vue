<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6" sm="8" md="6">
        <v-card class="elevation-5">
          <v-img height="200px" :src="require('../assets/image/flora2.jpg')">
          </v-img>
          <v-card-text class="mt-5">
            <h2
              class="
              
                            text-center
                            display-5
                            black--text
                            text--accent-3
                          "
            >
              ລະບົບຈັດການຂໍ້ມູນພືດໃນເຂດພູພຽງບໍລະເວນ
            </h2>
            <!-- <div>Of course it's <strong class="success--text">Google</strong></div> -->

            <h4 class="text-center mt-10"></h4>
            <v-form>
              <v-text-field
                v-model="user.email"
                label="E-mail"
                single-line
                prepend-icon="mdi-email"
                solo
                color="black"
                type="email"
                hint="charecter and number"
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                label="ລະຫັດຜ່ານ"
                single-line
                prepend-icon="mdi-lock"
                solo
                color="deep-purple darken-4"
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-form>
            <!-- <v-breadcrumbs :items="items"></v-breadcrumbs> -->
          </v-card-text>
          <div class="text-center mt-1">
            <v-btn color="teal darken-4" dark @click="submit">SIGN IN</v-btn>
          </div>

          <v-card-actions>
            <v-btn color="deep-blue lighten-2" text to="/register">
              <div>
                Create <strong class="success--text">new account</strong>
              </div>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  layout: "none",
  data() {
    return {
      step: 1,
      show1: false,
      user: 
        {
          email: "",
          password: "",
          usrole_id: "",
          role: ""
        }
      ,


      drawer: "",

      items: [
        {
          text: "forgot password?",
          disabled: false,
          href: "/register"
        }
      ]
    };
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    async submit() {
      try {
        await axios
          .post("http://localhost:5000/signup/login", {
            email: this.user.email,
            password: this.user.password
            //usrole_id: this.usrole_id
          })
          .then(res => {
            {
              const token = res.data.token;
              if (token) {
                localStorage.setItem("access-token", token);
                // this.$router.push("/");
                //const tk = localStorage.getItem("access-token");
              } else {
              }
            }
          });
        const token = localStorage.getItem("access-token");
        console.log(token);
        await axios({
          method: "get", //you can set what request you want to be
          url: "http://localhost:5000/signup/us/",
          headers: {
            authorization: "Bearer " + token
          }
        }).then(res => {
          //2. usrole_id 3.user_id
          console.log(res.data);
          this.user.role = res.data.user[1];
          if (this.user.role === "User") {
            this.$router.push("/");
          } else {
            this.$router.push("/UserForm/UserLoginForm");
          }
        });
      } catch (err) {
        alert("bor dai");
        //console.log(err);
      }
    }
  }
};
</script>

<style></style>
