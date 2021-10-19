<template>
  <v-app >
    <v-app-bar app  height="100">
      <template v-slot:extension>
        <v-col>
          <v-tabs v-model="tab" align-with-title 
>
            <v-tabs-slider color="teal"></v-tabs-slider>
            <v-tab v-for="tab in tabs" :key="tab.id" :to="tab.route">{{
              tab.name
            }}</v-tab>
            <v-tabs-items v-model="activeTab">
              <v-tab-item v-for="tab in tabs" :key="tab.id" :to="tab.route">
              </v-tab-item>
            </v-tabs-items>
                <v-tab link to="/paper" v-show="user.nl == 'no'">Statistic</v-tab>

          </v-tabs>
          
        </v-col>
      </template>
      <v-spacer></v-spacer>
          <v-switch
        class="mt-6"
        v-model="$vuetify.theme.dark"
        inset
        persistent-hint
      >
      </v-switch>
      <v-btn
        color="teal"
        text
        outlined
        @click="login"
        v-show="user.nl === 'yes'"
      >
        <span class="mr-2">Log in</span>
      </v-btn>
      <div>
        <v-menu bottom min-width="200px" rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on" v-show="user.nl === 'no'">
              <!-- <v-avatar color="yellow" size="46px"> </v-avatar> -->
              <!-- <span class="white--text text-h5">{{ user.Name }}</span> -->
            <!-- </v-btn> -->
            <v-avatar color="grey" size="46px">
                  <span class="white--text text-h5">{{ user.Name }}</span>
                </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="grey" size="46px">
                  <span class="white--text text-h5">{{ user.Name }}</span>
                </v-avatar>

                <h4>{{ user.Name }} {{ user.Surname }}</h4>
                <p class="text-caption mt-1">{{ user.email }} <br /></p>
                <!-- <p class="text-caption mt-1">
                  {{ user.role }}
                </p> -->
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text @click="testlong">
                  Sign out
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>

    <v-footer :absolute="!fixed" app>
      <span class="text-center">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      tab: null,
      activetab: "",
      tabs: [
        { id: "1", name: "Home", route: `/` },
        { id: "2", name: "About", route: `/UserForm/About` }
      ],
      user: {
        email: "",
        role: "",
        Name: "",
        Surname: "",
        nl: ""
      }
    };
  },
  mounted() {
    this.getName();
    this.checktoken();
  },

  methods: {
    testlong() {
      localStorage.clear();
      this.user.nl = "yes";
      this.$router.push("/");
    },
    checktoken() {
      if (!localStorage.getItem("access-token")) {
        this.user.nl = "yes";
        this.$router.push("/");
      } else {
        this.user.nl = "no";
      }
    },
    async getName() {
      try {
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
          this.user.email = res.data.user[0];
          this.user.role = res.data.user[1];
          this.user.Name = res.data.user[3];
          this.user.Surname = res.data.user[4];
        });
      } catch (err) {
        console.log(err);
      }
    },

    login() {
      this.$router.push("/login");
    }
  }
};
</script>
