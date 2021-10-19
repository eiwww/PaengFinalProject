<template>
  <div>
    <v-row>
      <v-col>
        <h2
          class="
                            text-center
                            display-5
                            black--text
                            text--accent-3
                            mt-3
                          "
        >
        ຂໍ້ມູນພືດ
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card-text>
          <v-row>
            <v-col>
              <h3>ຕະກຸນ</h3>
              <v-select
                v-model="familymd"
                :items="family"
                label="ຕະກຸນ"
                :item-text="Family_Name"
                :item-value="Family_id"
                solo
                @input="getFamily($event)"
              ></v-select>
            </v-col>
            <v-col>
              <h3>ສະກຸນ</h3>
              <v-select
                v-model="genusmd"
                :items="genus"
                label="ສະກຸນ"
                :item-text="Genus_Name"
                :item-value="Genus_id"
                solo
                @input="getGenus($event)"
              ></v-select>
            </v-col>
            <v-col>
              <h3>ຊະນິດ</h3>
              <v-select
                v-model="speciesmd"
                :items="species"
                label="ຊະນິດ"
                :item-text="Species_Name"
                :item-value="Species_id"
                solo
                @input="getSpecies"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3>ຊື່ລາວ</h3>
              <v-text-field
                label="ຊື່ລາວ"
                single-line
                solo
                color="black"
                hint="charecter and number"
              ></v-text-field>
            </v-col>
            <v-col>
              <h3>ເພີ່ມເຕີມ</h3>
              <v-text-field
                label="ເພີ່ມເຕີມ"
                single-line
                solo
                color="black"
                hint="charecter and number"
              ></v-text-field>
            </v-col>
              <v-col>
              <h3>ປະເພດການຄົ້ນພົບ</h3>
              <v-select
                v-model="speciesmd"
                :items="species"
                label="ເລຶອກ"
                :item-text="Species_Name"
                :item-value="Species_id"
                solo
                @input="getSpecies"
              ></v-select>
            </v-col>
          </v-row>
           
          <div class="text-center" color>
            <v-btn color="cyan darken-4" dark @click="savelocate">ເພີ່ມ</v-btn>
          </div>
        </v-card-text>
      </v-col>
    </v-row>
      <flora/>
  </div>
</template>

<script>
import axios from "axios";
import flora from '../../layouts/flora/flora.vue';
export default {
  components: { flora },
  data() {
    return {
      show1: false,
      show2: false,
      get_species: [],
      Species_id: null,
      species: [],

      get_family: [],
      family: [],
      Family_id: null,

      get_genus: [],
      genus: [],
      Genus_id: null,

      get_species: [],
      species: [],
      Species_id: null,

      get_collector: [],
      Collector_id: null,
      collector: [],

      step: 1,
      
      menu: false,
      items: [
        {
     
        }
      ]
    };
  },
  computed: {

  },
  mounted() {
    this.fectchfamily();
  },

  methods: {
    async savelocate(){
        
    },
    async fectchfamily() {
      try {
        await axios.get("http://localhost:5000/family").then(res => {
          this.get_family = res.data;
          for (let i = 0; i < this.get_family.length; i++) {
            this.family.push(this.get_family[i].Family_Name);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getFamily(getfamily) {
      if (getfamily != "") {
        for (var i in this.get_family)
          if (
            String(getfamily).valueOf() ==
            String(this.get_family[i].Family_Name).valueOf()
          ) {
            const fam_id = this.get_family[i].Family_id;
            await axios
              .get(`http://localhost:5000/genus/getgenus/${fam_id}`)
              .then(res => {
                this.get_genus = res.data;
                console.log(JSON.stringify(res.data));
                this.genus = [];
                for (var i in this.get_genus) {
                  this.genus.push(this.get_genus[i].Genus_Name);
                }
              });
          }
      }
    },

    async getGenus(getgenus) {
      if (getgenus != "") {
        for (var i in this.get_genus)
          if (
            String(getgenus).valueOf() ==
            String(this.get_genus[i].Genus_Name).valueOf()
          ) {
            const gen_id = this.get_genus[i].Genus_id;
            await axios
              .get(`http://localhost:5000/species/getspecies/${gen_id}`)
              .then(res => {
                this.get_species = res.data;
                console.log(JSON.stringify(res.data));
                this.species = [];
                for (var i in this.get_species) {
                  this.species.push(this.get_species[i].Species_Name);
                }
              });
          }
      }
    },

    async fetchprovine() {
      try {
        await axios.get("http://localhost:5000/province").then(res => {
          this.get_province = res.data;
          for (let i = 0; i <= this.get_province.length; i++) {
            this.province.push(this.get_province[i].Province_Name);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getProvince(getprovince) {
      if (getprovince != "") {
        for (var i in this.get_province)
          if (
            String(getprovince).valueOf() ==
            String(this.get_province[i].Province_Name).valueOf()
          ) {
            const pro_id = this.get_province[i].Province_id;
            await axios
              .get(`http://localhost:5000/district/getdistrict/${pro_id}`)
              .then(res => {
                this.get_district = res.data;
                console.log(JSON.stringify(res.data));
                this.district = [];
                for (var i in this.get_district) {
                  this.district.push(this.get_district[i].District_Name);
                }
              });
          }
      }
    },

    async getDistrict(getdistrict) {
      if (getdistrict != "") {
        for (var i in this.get_district)
          if (
            String(getdistrict).valueOf() ==
            String(this.get_district[i].District_Name).valueOf()
          ) {
            const dis_id = this.get_district[i].District_id;
            await axios
              .get(`http://localhost:5000/village/getvillage/${dis_id}`)
              .then(res => {
                this.get_village = res.data;
                console.log(this.get_village);
                console.log(JSON.stringify(res.data));
                this.village = [];
                for (var i in this.get_village) {
                  console.log(this.get_village);
                  this.village.push(this.get_village[i].Village_Name);
                }
              });
          }
      }
    },

    fetchcollector() {
      try {
        axios.get("http://localhost:5000/collector").then(res => {
          this.get_collector = res.data;
          for (let i = 0; i <= this.get_collector.length; i++) {
            this.collector.push(this.get_collector[i].Colletor_Name);
          }
        });
      } catch (error) {}
    },
    getCollector() {
      try {
        axios.get("http://localhost:5000/collector").then(res => {
          this.get_collector = res.data;
          for (let i = 0; i <= this.get_collector.length; i++) {
            if (
              String(this.collectormd).valueOf() ==
              String(this.get_collector[i].Colletor_Name).valueOf()
            ) {
              this.collec_id = this.get_collector[i].Collector_id;
            }
          }
        });
      } catch (error) {
        alert(error);
      }
    }
  }
};
</script>

<style></style>
