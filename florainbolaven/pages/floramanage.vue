<template>
 <v-card
     flat
    tile
  >
     <div class="text-right">
               <!-- <h4> ເວລາ: {{nowTime}} </h4> -->
    </div>
   <h2 class="text-center mt-2">{{ currentTitle }}</h2>
    <v-card-title class="text-h6 text-center font-weight-regular justify-space-between">   
    </v-card-title>
  
    <v-window v-model="step">
      <v-window-item :value="1">
      <family/>
      </v-window-item>

      <v-window-item :value="2">
     <genus/>
      </v-window-item>

      <v-window-item :value="3">
<species/>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :disabled="step === 1"
        text
        @click="step--"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="step === 3"
        color="blue"
        depressed
        @click="step++"
      >
        <v-icon>
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Family from '~/layouts/flora/family.vue';
import Genus from '~/layouts/flora/genus.vue';
import Species from '~/layouts/flora/species.vue';

export default {
      layout: 'default',

  components: {Family, Genus, Species, },

  
  
  data: () => ({
      step: 1,
    }),

    computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return 'ຈັດການຂໍ້ມູນຕະກຸນ'
          case 2: return 'ຈັດການຂໍ້ມູນສະກຸນ'
          default: return 'ຈັດການຂໍ້ມູນຊະນິດ'
        }
      },
    },
 methods: {
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
      let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
      let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
      let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
      // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
             // return year + "of" + month + "month" + date + "date" + "" + hh + ":" + mm;
             this.nowTime = date + "/" + month + "/" + year + "" + " " + hh + ":" + mm ;
    },
 // timer function
    nowTimes(){
      this.timeFormate(new Date());
      setInterval(this.nowTimes,30*1000);
    },

  },
  created() {
    this.nowTimes();
  },
  mounted() {
    this.nowTimes();
  },
  
};
</script>

<style></style>
