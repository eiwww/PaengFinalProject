<template>
  <div>
      <!-- form fill flora information -->
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
              <h3>ແຂວງ</h3>
              <v-select
                v-model="provincemd"
                :items="province"
                label="ແຂວງ"
                :item-text="Province_Name"
                :item-value="Province_id"
                solo
                @input="getProvince($event)"
              ></v-select>
            </v-col>
            <v-col>
              <h3>ເມືອງ</h3>
              <v-select
                v-model="districtmd"
                :items="district"
                label="ເມືອງ"
                :item-text="District_Name"
                :item-value="District_id"
                solo
                @input="getDistrict($event)"
              ></v-select>
            </v-col>
            <v-col>
              <h3>ບ້ານ</h3>
              <v-select
                v-model="villagemd"
                :items="village"
                label="ບ້ານ"
                :item-text="Village_Name"
                :item-value="Village_id"
                solo
                @input="getVillage"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3>ເສັ້ນຂະໜານ</h3>
              <v-text-field
                v-model="saveflora.Latitude"
                label="ເສັ້ນຂະໜານ"
                single-line
                solo
                color="black"
                hint="charecter and number"
              ></v-text-field>
            </v-col>
            <v-col>
              <h3>ເສັ້ນແວງ</h3>
              <v-text-field
                v-model="saveflora.Longtitude"
                label="ເສັ້ນແວງ"
                single-line
                solo
                color="black"
                hint="charecter and number"
              ></v-text-field>
            </v-col>
            <v-col>
              <h3>ລະດັບຄວາມສູງ</h3>
              <v-text-field
                label="ລະດັບຄວາມສູງ"
                v-model="saveflora.Alttitude"
                single-line
                solo
                color="black"
                hint="charecter and number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3>ເວລາ</h3>
              <!-- <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="ເລືອກວັນທີ່"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="Location.date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu> -->
            </v-col>
            <v-col class="mb-5">
              <h3>ຜູ້ເກັບກໍາ</h3>
              <v-select
                v-model="collectormd"
                :items="collector"
                label="ຜູ້ເກັບກໍາ"
                :item-text="Colletor_Name"
                :item-value="Collector_id"
                solo
                chips
                @input="getCollector"
                multiple
              ></v-select>
            </v-col>
          </v-row>
          <v-file-input
            v-model="files"
            color="deep-purple accent-4"
            counter
            label="ຮູບພາບ"
            multiple
            placeholder="Select your files"
            prepend-icon="mdi-paperclip"
            outlined
            :show-size="1000"
          >
          </v-file-input>
          <div class="text-center" color>
            <v-btn color="cyan darken-4" dark @click="savelocate"
              >ເພີ່ມຂໍ້ມູນການອັບໂຫຼດ</v-btn
            >
          </div>
        </v-card-text>
      </v-col>
    </v-row>
<v-col>

</v-col>
<v-col>

</v-col>
  </div>
</template>

<script>
import axios from 'axios'
export default {
data() {
    return {
        files: {},
          get_species: [],
      Species_id: null,
      species: [],

      get_province: [],
      Province_id: null,
      province: [],

      get_district: [],
      District_id: null,
      district: [],

      get_village: [],
      Village_id: null,
      village: [],

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

      saveflora: [],

      Location: [{
          id: "",
          Latitude: "",
          Longtitude: "",
          Village_Name: "",
          District_Name: "",
          Province_Name: "",
          Altitude: "",
          Finding_Name: "",
          status: ""
        }],
      getFloraid : [],
    }
},
 mounted() {
    this.fetchprovine();
    this.fetchcollector();
    this.fectchfamily();
    this.getid();
  },
methods: {
    getid() {
      axios.get("http://localhost:5000/upload/getReport").then(res => {
        this.getFloraid = res.data;
        console.log(this.getFloraid);
      });
      
    },
    async savelocate(){
     try {
          //Flora_id,Village_id,Latitude,Longtitude,Altitude,Date_identify,User_id = req.body;
          await axios
            .post("http://localhost:5000/upload", {
              Latittude: this.Location.Latittude,
              Longtitude: this.Location.Longtitude,
              Alttitude: this.Location.Alttitude,
              Flora_id,
              Date_identify: this.Location.date,
              Village_id,

            })
            .then(res => {
              console.log(res);
            });
        } catch (error) {
          console.log(error);
        }
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
      } catch (err) {
        console.log(err);
      }
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
        console.log(error);
      }
    }
  },
}
</script>

<style>

</style>