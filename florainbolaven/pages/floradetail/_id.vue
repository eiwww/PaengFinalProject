<template>
  <v-container class="white">
    <v-row>
      <v-col cols="6" md="4">
        <v-card class="pa-2" outlined tile>
          <v-row justify="left">
            <v-carousel hide-delimiters style="width:400px;height:auto;">
              <v-carousel-item
                cycle
                v-for="(img, i) in imagee"
                :key="i"
                :src="img"
                :title="'img' + i"
              ></v-carousel-item>
            </v-carousel>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <div class="text-center">
          <h2 class="mt-5">
            ຊະນິດພືດ <v-icon color="teal">mdi-flower</v-icon>
          </h2>

          <span>ຊະນິດ: {{ flora.Genus_Name }} {{ flora.Species_Name }}</span
          ><br />
          <h2 class="mt-5">ຕະກຸນພືດ <v-icon color="teal">mdi-tree</v-icon></h2>
          <span>ຕະກຸນ: {{ flora.Family_Name }}<br /></span>
          <h2 class="mt-5">ສະຖານທີ່ <v-icon color="blue">mdi-home</v-icon></h2>
          <span
            >ບ້ານ: {{ location.Village_Name }}, ເມືອງ:
            {{ location.District_Name }}, ແຂວງ: {{ location.Province_Name }}<br
          /></span>
          <h2 class="mt-5">
            ຈຸດພິກັດ (GPS) <v-icon color="red">mdi-google-maps</v-icon>
          </h2>
          <span>
            ເສັ້ນຂະໜານ: {{ location.Latitude }} <br />
            ເສັ້ນແວງ: {{ location.Longtitude }}</span
          ><br />
          <h2 class="mt-5">
            ລະດັບຄວາມສູງ <v-icon color="brown">mdi-image-filter-hdr</v-icon>
          </h2>
          <span> ລະດັບຄວາມສູງ: {{ location.Altitude }} m<br /></span>
          <h2 class="mt-5">
            ຜູ້ເກັບກໍາ <v-icon color="purple">mdi-nature-people</v-icon>
          </h2>
          <span> {{CollectorName}} <br /></span>
          <h2 class="mt-5">
            ວັນທີທີ່ຄົ້ນພົບ <v-icon color="green">mdi-clock</v-icon>
          </h2>
          <span> ວັນທີ: 12-12-2019 <br /></span>
          <h2 class="mt-5">
            ປະເພດການຄົ້ນພົບ <v-icon color="yellow">mdi-spa</v-icon>
          </h2>
          <span> {{ location.Finding_Name }} <br /></span>
        </div>

        <!-- <v-row justify="center">
      <v-slide-group class="pa-4" center-active
      show-arrows>
        <v-slide-item v-for="(img, i) in imagee" :key="i">
          <img height="200"  :src="img" :title="'img' + i" />
        </v-slide-item>
      </v-slide-group>
    </v-row> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
      layout: 'default',
  data() {
    return {
      flora: [
        {
          Species_Name: "",
          Genus_Name: "",
          Family_Name: ""
        }
      ],
      location: [
        {
          id: "",
          Latitude: "",
          Longtitude: "",
          Village_Name: "",
          District_Name: "",
          Province_Name: "",
          Altitude: "",
          Finding_Name: "",
          Collector_name: ""
        }
      ],

      CollectorName: '',

      image: [],
      imagee: []
    };
  },
  methods: {
    

    async fetchfloradata() {
      this.$axios
        .get(`http://localhost:5000/flora/getFloraid/` + this.$route.params.id)
        .then(res => {
          this.flora = res.data[0];
          console.log(res.data[0]);
        });
      this.$axios
        .get(
          `http://localhost:5000/upload/getLocation/` + this.$route.params.id
        )
        .then(res => {
          this.location = res.data[0];
          console.log(res.data[0]);

          this.$axios.get(`http://localhost:5000/collectordetail/Upload/${this.location.id}`).then(res=>{
          
          this.CollectorName = '';
          //this.location.CollectorName = '';
          if(res.data.length === 0){
            this.CollectorName = res.data[i].Collector_name
          }else{
            for(let i=0; i< res.data.length; i++){
              if(i === 0){
this.CollectorName = res.data[i].Collector_name
              }else{
                const txt = res.data[i].Collector_name
            this.CollectorName = this.CollectorName + ", "+ txt
              }
            //wao u wa bor dai yin lei
            //discord jao br dai
          }
          }
          
          console.log(this.CollectorName)
          
        }).catch("err")
        });

      this.$axios
        .get(
          `http://localhost:5000/picture/getImageid/` + this.$route.params.id
        )
        .then(res => {
          this.image = res.data;
          for (var i = 0; i <= res.data.length; i++) {
            let url = "http://localhost:5000/" + res.data[i].image_Name;
            this.imagee.push(url);
            console.log(res.data[i].image_Name);
          }
          console.log(res.data);
        });
    }
  },
  mounted() {
    this.fetchfloradata();
  }
};
</script>

<style></style>
