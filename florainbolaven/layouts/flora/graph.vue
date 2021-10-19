<template>
  <v-container>
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
   
  </v-container>
</template>

<script>

export default {
      layout: 'default',

  components: { 
      
   },
  data() {
    return {
      labels: ["ສາລະວັນ", "ເຊກອງ", "ຈໍາປາສັກ", "ອັດຕະປື"],
      value: [],
      countFam: "",
      countGenus: "",
      countSpecies: "",
      countNewRecords: "",
      countCollector: "",
      get_genus: '',
    };
  },
  computed: {},
  mounted() {
    this.fetchPaperdata();
  },

  methods: {
    fetchPaperdata() {
      this.$axios.get(`http://localhost:5000/count`).then(res => {
        this.countFam = res.data;
        console.log(res.data);
     this.value.push(res.data)
     //console.log("value is",this.value.toString());
      });
      this.$axios
        .get(`http://localhost:5000/count/getGenusCount/genus`)
        .then(res => {
          this.countGenus = res.data;
          console.log(res.data);
          this.value.push(res.data)
        });
      this.$axios
        .get(`http://localhost:5000/count/getSpecies/species`)
        .then(res => {
          this.countSpecies = res.data;
          console.log(res.data);
          this.value.push(res.data)
        });
      this.$axios
        .get(`http://localhost:5000/count/getNewRecords/Report/`)
        .then(res => {
          this.countNewRecords = res.data;
          console.log(res.data);
          this.value.push(res.data)
          console.log(this.value.toString())
        });
           this.$axios
        .get(`http://localhost:5000/count/getCollector/collector`)
        .then(res => {
          this.countCollector = res.data;
          console.log(res.data);
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
