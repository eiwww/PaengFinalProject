<template>
<v-app>
  <v-app-bar 
  flat
  color="teal"
  height="100vh"
>
              <v-spacer></v-spacer>
    <!-- <v-btn class="mr-3" height="40" text color="white">SING IN</v-btn>     -->
</v-app-bar>

    <v-content>
  <nuxt/>
    </v-content>
</v-app>

</template>

<script>
export default {
 
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
    }
  } ,
  mounted(){
  }  
}
</script>
