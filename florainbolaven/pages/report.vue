<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet
          color="white"
          elevation="6"
          height="150"
          shaped
          width="250"
          class="pa-2"
        >
          <h1 class="text-center mt-5">
            ຈໍານວນຕະກຸນພືດ {{ countFam }}
            <v-icon color="teal">mdi-spa</v-icon>
          </h1></v-sheet
        >
      </v-col>

      <v-col>
        <v-sheet
          color="white"
          elevation="4"
          height="150"
          shaped
          width="250"
          class="pa-2"
        >
          <h1 class="text-center mt-5">
            ຈໍານວນສະກຸນພືດ {{ countGenus }}
            <v-icon color="pink">mdi-tree-outline</v-icon>
          </h1></v-sheet
        >
      </v-col>

      <v-col>
        <v-sheet
          color="white"
          elevation="4"
          height="150"
          shaped
          width="250"
          class="pa-2"
        >
          <h1 class="text-center mt-5">
            ຈໍານວນຊະນິດພືດ
            <strong class="teal--text">{{ countSpecies }}</strong>
            <v-icon color="cyan">mdi-palm-tree</v-icon>
          </h1></v-sheet
        >
      </v-col>

      <!-- <v-col>
        <v-sheet
          color="white"
          elevation="4"
          height="150"
          shaped
          width="250"
          class="pa-2"
        >
          <h1 class="text-center mt-5">
            New Records {{ countNewRecords }}
            <v-icon color="teal">mdi-pine-tree</v-icon>
          </h1></v-sheet
        >
      </v-col> -->
      <v-col>
        <v-sheet
          color="white"
          elevation="4"
          height="150"
          shaped
          width="250"
          class="pa-2"
        >
          <h1 class="text-center mt-5">
            ຜູ້ເກັບກໍາ <br />
            {{ countCollector }}
            <v-icon color="teal">mdi-pine-tree</v-icon>
          </h1></v-sheet
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mt-15">
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="teal"
          elevation="12"
          max-width="calc(100% - 20px)"
        >
          <v-sparkline
            :labels="labels"
            :value="value"
            color="rgba(255, 255, 255, .7)"
            line-width="2"
            padding="16"
          ></v-sparkline>
        </v-sheet>
      </v-col>
    </v-row>
    <div>
      <report />
    </div>
  </v-container>
</template>

<script>
import Report from "~/layouts/report/report.vue";

export default {
  layout: "default",

  components: { Report },
  data() {
    return {
      labels: ["ສາລະວັນ", "ເຊກອງ", "ຈໍາປາສັກ", "ອັດຕະປື"],
      value: [],
      countFam: "",
      countGenus: "",
      countSpecies: "",
      countNewRecords: "",
      countCollector: "",
      countChampasak: "",
      countSalavan: "",
      countSekong: "",
      countAttapue: "",
      get_genus: ""
    };
  },
  computed: {},
  mounted() {
    this.fetchPaperdata();
  },

  methods: {
  async  fetchPaperdata() {
     await this.$axios.get(`http://localhost:5000/count`).then(res => {
        this.countFam = res.data;
        console.log(res.data);
        //console.log("value is",this.value.toString());
      });
     await this.$axios
        .get(`http://localhost:5000/count/getGenusCount/genus`)
        .then(res => {
          this.countGenus = res.data;
          console.log(res.data);
        });
      await this.$axios
        .get(`http://localhost:5000/count/getSpecies/species`)
        .then(res => {
          this.countSpecies = res.data;
          console.log(res.data);
        });
    await  this.$axios
        .get(`http://localhost:5000/count/getNewRecords/Report/`)
        .then(res => {
          this.countNewRecords = res.data;
          console.log(res.data);
          console.log(this.value.toString());
        });
     await this.$axios
        .get(`http://localhost:5000/count/getCollector/collector`)
        .then(res => {
          this.countCollector = res.data;
          //this.get_genus = this.countNewRecords;
          console.log(res.data);
        });
        await  this.$axios
        .get(`http://localhost:5000/count/getProvince/salavan/`)
        .then(res => {
          this.countSalavan = res.data;
          console.log(res.data);
          this.value.push(res.data);
        });
         await this.$axios
        .get(`http://localhost:5000/count/getProvince/sekong/`)
        .then(res => {
          this.countSekong = res.data;
          console.log(res.data);
          this.value.push(res.data);
        });
      this.$axios
        .get(`http://localhost:5000/count/getProvince/champasak/`)
        .then(res => {
          this.countChampasak = res.data;
          console.log(res.data);
          this.value.push(res.data);
        });
       
        this.$axios
        .get(`http://localhost:5000/count/getProvince/Attapue/`)
        .then(res => {
          this.countAttapue = res.data;
          console.log(res.data);
          this.value.push(res.data);
        });
       
    }
  }
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
