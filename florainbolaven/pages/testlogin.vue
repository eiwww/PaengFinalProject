<template>
  <v-container>
    <div>
      <form @submit.prevent="userLogin">
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

            <!-- <div class="text-center mt-4">
                  <v-btn class="mx-2" fab color="blue" outlined>
                    <v-icon>mdi-facebook</v-icon>
                  </v-btn>

                  <v-btn class="mx-2" fab color="green" outlined>
                    <v-icon>mdi-google</v-icon>
                  </v-btn>
                </div> -->

            <h4 class="text-center mt-10"></h4>
            <v-form>
              <v-text-field
                v-model="user.username"
                label="Username or E-mail"
                single-line
                prepend-icon="mdi-email"
                solo
                color="black"
                type="email"
                hint="charecter and number"
              ></v-text-field>
              <v-text-field
              v-model="user.password"
                label="Password"
                single-line
                prepend-icon="mdi-lock"
                solo
                color="deep-purple darken-4"
                :type="show1 ? 'text' : 'password'"
                hint="At least 8 characters"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-form>
               <v-breadcrumbs :items="items"
    ></v-breadcrumbs>
         
    
          </v-card-text>
          <div class="text-center mt-1">
            <v-btn color="light-blue darken-4" dark @click="login"
              >ເຂົ້າສູ່ລະບົບ</v-btn
            >
               
          </div>
         
          <v-card-actions>
            <v-btn color="deep-blue lighten-2" text>
              Create account
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
      </form>
 
    </div>
   
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  
  data() {
    return {
      step: 1,
      show1: false,
      user: {
          username: '',
          password: ''
      },
      items: [
        {
          text: 'ລືມລະຫັດຜ່ານ ?',
          disabled: false,
          href: '/register',
        },
      ],
    };
  },
  mounted() {
    //this.fetchdata();
  },
  methods: {
// login(){
//     //this.$store.dispatch('loginuser/logInUser', this.user)
     
// }
async userLogin(){
  try {
    let res = await this.$auth.loginWith('local',{data:this.user})
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
}
}
</script>

<style></style>
