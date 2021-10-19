<template>
  <v-app app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <!-- v-show="role=='User'" -->
      <v-list>
        <v-list-item>
          <v-list-item-avatar class="mx-15" height="15vh" width="15vh">
            <v-img :src="require('../assets/image/fof.png')"></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-p text-center">
              ລະບົບຈັດການຂໍ້ມູນພືດໃນເຂດ<br/>ພູພຽງບໍລະເວນ
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
      <v-list nav dense>
        <v-list-item to="/UserForm/UserLoginForm" @click="messages++">
          <v-list-item-icon>
            <v-icon color="teal">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>ໜ້າຫຼັກ</v-list-item-title>
        </v-list-item>
        <v-list-group :value="true" prepend-icon="mdi-playlist-plus"       v-show="user.role == 'Admin'"
>
          <template v-slot:activator>
            <v-list-item-title>ຈັດການຂໍ້ມູນ</v-list-item-title>
          </template>

          <v-list-item
            v-for="(item, i) in flora"
            :key="i"
            :to="item.to"
            router
            exact
            
          >
            <v-list-item-action>
              <v-icon color="teal">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item to="/upload"  v-show="user.role == 'Admin'">
          <v-list-item-icon>
            <v-icon color="blue">mdi-upload-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>ອັບໂຫຼດຂໍ້ມູນ</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/report"  v-show="user.role == 'Admin'">
          <v-list-item-icon>
            <v-icon color="red">mdi-file-chart</v-icon>
          </v-list-item-icon>
          <v-list-item-title>ລາຍງານ</v-list-item-title>
        </v-list-item>
   <v-list-item to="/reasearchupload"  v-show="user.role == 'Researcher'">
          <v-list-item-icon>
            <v-icon color="blue">mdi-upload-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>ອັບໂຫຼດຂໍ້ມູນ</v-list-item-title>
        </v-list-item>
         <v-list-item link to="/report"  v-show="user.role == 'Researcher'">
          <v-list-item-icon>
            <v-icon color="red">mdi-file-chart</v-icon>
          </v-list-item-icon>
          <v-list-item-title>ລາຍງານ</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="cyan darken-4"
      height="80"
    >
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
      <v-btn icon color="white" @click.stop="miniVariant = !miniVariant" >
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <v-switch
        class="mt-6"
        v-model="$vuetify.theme.dark"
        inset
        persistent-hint
      >
      </v-switch>
      <!-- <v-btn
        class="mr-3"
        height="40"
        text
        color="white"
        v-model="test"
        @click.stop="bt = !bt"
        to='/login'
        >SING IN</v-btn
      > -->
      <!-- <v-btn class="mr-3" height="40" text color="white" @click="testlong"
        >SIGN OUT</v-btn
      > -->
      <div>
        <v-menu bottom min-width="200px" rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-avatar size="46px">
                <img alt="Avatar" :src="require('../assets/image/profile.gif')" />
                <!-- <span class="white--text text-h5">{{ user.Name }}</span> -->
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="grey" size="px">
                  <span class="white--text text-h5">{{ u_name }}</span>
                </v-avatar>

                <h4>{{ user.Name }} {{ user.Surname }}</h4>
                <p class="text-caption mt-1" >
                  {{ user.email }} <br/>
                </p>
                 <p class="text-caption mt-1"  v-show="user.role == 'Admin'" >
                  {{ user.role }}
                </p>
                  <p class="text-caption mt-1"  v-show="user.role == 'Researcher'" >
                  {{ user.role }}
                </p>
                <!-- <v-divider class="my-3"></v-divider> -->
                <!-- <v-btn depressed rounded text to="/user/edituser" >
                  ແກ້ໄຂຂໍ້ມູນສ່ວນຕົວ
                </v-btn> -->
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
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.stop="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar.vue";
export default {
  components: { Navbar },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      bt: true,
      test: false,
      user: {
        email: "",
        role: "",
        Name: "",
        Surname: ""
      },

      admins: [
        ["Management", "mdi-account-multiple-outline"],
        ["Settings", "mdi-cog-outline"]
      ],
      flora: [
        {
          title: "ຜູ້ເກັບກໍາ",
          to: "/collector/collectormanage"
        },
        {
          title: "ຜູ້ໃຊ້",
          to: "/showdata"
        },
        {
          title: "ລໍາດັບພືດ",
          to: "/floramanage"
        },
        // {
        //   title: "ພືດ",
        //   to: "/flora/detailflora"
        //  },
        {
          title: "ປະເພດການຄົ້ນພົບ",
          to: "/finding/findingdetail"
        },
        {
          title: "ສະຖານທີ່",
          to: "/location"
        }
      ]
    };
  },
  computed: {
    logInUser: {
      get() {
        return this.$store.state.loginuser;
      }
    },
    loginuser: {
      get() {
        return this.$store.state.loginuser.user;
      }
    },
    toggleDrawer: function() {
      this.$store.commit("toggleDrawerState");
    }
  },
  methods: {
    logout() {},
    testlong() {
      localStorage.clear();
      this.$router.push("/");
    },
    async getName() {
      try {
        const token = localStorage.getItem("access-token");
        console.log(token);
        // await  this.$axios.get(`http://localhost:5000/signup/us/`, {
        //     Headers: {
        //       authorization: 'Bearer ' + tk
        //     }
        //   }).then(res => {
        //     console.log(res.data)
        //     this.u_name = res.data
        //   })
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
    checktoken() {
      if (!localStorage.getItem("access-token")) {
        this.$router.push("/login");
      }
    }
  },
  mounted() {
    this.getName();
    this.checktoken();
  },
  created() {
    //this.$store.dispatch('loginuser/logInUser', this.user)
    this.$store.dispatch("loginuser/getUser");
  }
};
</script>
