<template>
  <div>
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
              <h3>ເພີ່ມເຕີມ</h3>
              <v-text-field
                v-model="note"
                label="ເພີ່ມເຕີມ"
                single-line
                solo
                color="black"
                hint="charecter"
              ></v-text-field>
            </v-col>
            <v-col>
              <h3>ຊື່ພືດ</h3>
              <v-text-field
                v-model="VernacularName"
                label="ພາສາລາວ"
                single-line
                solo
                color="black"
                hint="charecter"
              ></v-text-field>
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
                v-model="Location.Latitude"
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
                v-model="Location.Longtitude"
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
                v-model="Location.Altitude"
                single-line
                solo
                type="number"
                color="black"
                hint="charecter and number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3>ເວລາ</h3>
              <v-menu
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
                    v-model="formatDate"
                    label="ເລືອກວັນທີ່"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    ຍົກເລີກ
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    ຕົກລົງ
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="mb-5">
              <h3>ປະເພດ</h3>
              <v-select
                v-model="findingmd"
                :items="finding"
                label="ການຄົ້ນພົບ"
                :item-text="Finding_Name"
                :item-value="Finding_id"
                solo
                @input="getFinding"
              ></v-select>
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
                multiple
              ></v-select>
            </v-col>
          </v-row>

          <div class="upload-area">
            <h1 class="upload-area__title"></h1>
            <label>
              <input
                type="file"
                id="file"
                ref="file"
                multiple
                accept="image/*|image/heic|image/heif"
              />
            </label>
          </div>

          <div class="text-center mt-10" color>
            <v-btn color="cyan darken-4" dark @click="savelocate"
              >ເພີ່ມຂໍ້ມູນການອັບໂຫຼດ</v-btn
            >
          </div>
        </v-card-text>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import dateformat from "dateformat";

export default {
  layout: "none",

  data() {
    return {
      // show1: false,
      // show2: false,
      //file input
      files: [],
      file: [],

      //date
      date: "",

      note: "",
      VernacularName: "",

      get_species: [],
      Species_id: null,
      species: [],
      get_Speciesid: "",
      get_Spec: [],

      get_province: [],
      Province_id: null,
      province: [],

      get_district: [],
      District_id: null,
      district: [],

      get_village: [],
      Village_id: null,
      village: [],
      get_Vill: [],
      get_Villid: "",

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
      // Collector_id: null,
      collector: [],
      collectormd: [],
      getcollectmd: [], //to pherm = v-model khong select
      get_res_id: [], //same

      get_finding: [],
      Finding_id: null,
      finding: [],
      getfind: "",

      collec_id: [],

      user: {
        email: "",
        id: "",
        role: "",
        Name: "",
        Surname: ""
      },

      max_flora_id: "",
      max_upload: "",

      Location: {
        id: "",
        Latitude: "",
        Longtitude: "",
        Village_Name: "",
        District_Name: "",
        Province_Name: "",
        Altitude: "",
        Finding_Name: "",
        status: ""
      },
      getFloraid: [],

      userid: null,

      id: "",

      get_vill: [],
      test2: null,

      step: 1,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

      menu: false
    };
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "ອັບໂຫຼດຂໍ້ມູນ";
        default:
          return "Acount create";
      }
    },
    formatDate() {
      return dateformat(this.date, "dd-mm-yyyy");
    }
  },
  mounted() {
    this.fetchprovine();
    this.fetchcollector();
    this.fectchfamily();
    this.getid();
    this.fetchfinding();
    this.getName();
  },

  methods: {
    async getName() {
      try {
        const token = localStorage.getItem("access-token");
        console.log(token);
        await axios({
          method: "get",
          url: "http://localhost:5000/signup/us/",
          headers: {
            authorization: "Bearer " + token
          }
        }).then(res => {
          //2. usrole_id 3.user_id
          console.log(res.data);
          this.user.email = res.data.user[0];
          this.user.role = res.data.user[1];
          this.user.id = res.data.user[2];
          this.user.Name = res.data.user[3];
          this.user.Surname = res.data.user[4];
        });
      } catch (err) {
        console.log(err);
      }
    },
    getid() {
      axios.get("http://localhost:5000/upload/getReport").then(res => {
        this.getFloraid = res.data;
        console.log(this.getFloraid);
      });
    },
    async savelocate() {
      //flora dai leo
      await this.$axios
        .post(`http://localhost:5000/flora`, {
          Species_id: this.get_Speciesid,
          note: this.note,
          Vernacular_Name: this.VernacularName,
          Finding_id: this.getfind
        })
        .then(res => {
          console.log(res);
          if (!res) {
            console.log("error");
          } else {
            this.$axios
              .get("http://localhost:5000/flora/Select/getFlora")
              .then(res2 => {
                this.max_flora_id = res2.data;
                if (!this.max_flora_id) {
                  console.log("error id");
                } else {
                  for (let i = 0; i < this.$refs.file.files.length; i++) {
                    const formData = new FormData();
                    formData.append("image_Name", this.$refs.file.files[i]);
                    formData.append("Flora_id", this.max_flora_id);

                    this.$axios
                      .post("http://localhost:5000/picture", formData)
                      .then(res3 => {
                        console.log("succeed");
                      })
                      .then(function() {
                        console.log("SUCCESS!!");
                      })
                      .catch(function() {
                        console.log("FAILURE!!");
                      });
                  }

                  if (!this.get_Villid) {
                    console.log("error vill id");
                  } else {
                    console.log("max Id " + this.max_flora_id);
                    console.log("Vill " + this.get_Villid);
                    console.log("lat " + this.Location.Latitude);
                    console.log("long " + this.Location.Longtitude);
                    console.log("date " + this.date);
                    console.log("user " + this.user.id);
                    console.log("al " + this.Location.Altitude);

                    if (!this.user.id) {
                      console.log("d");
                    } else {
                      this.$axios
                        .post("http://localhost:5000/upload", {
                          //Flora_id,Village_id,Latitude,Longtitude,Date_identify,User_id,Altitude
                          Flora_id: this.max_flora_id,
                          Village_id: this.get_Villid,
                          Latitude: this.Location.Latitude,
                          Longtitude: this.Location.Longtitude,
                          Date_identify: this.date,
                          //date: this.date
                          User_id: this.user.id,
                          Altitude: this.Location.Altitude
                        })
                        .then(res4 => {
                          this.$axios
                            .get(
                              "http://localhost:5000/upload/Select/getUploadid"
                            )
                            .then(res5 => {
                              this.max_upload = res5.data;
                              if (!this.max_upload) {
                                console.log("error upload id");
                              } else {
                                axios
                                  .get("http://localhost:5000/collector")
                                  .then(res6 => {
                                    this.get_collector = res6.data;
                                    this.getcollectmd = this.collectormd;
                                    this.collec_id = [];
                                    this.get_res_id = [];

                                    for (let i in this.getcollectmd) {
                                      const tt = this.getcollectmd[i];
                                      this.collec_id.push(tt);
                                      for (let j in this.get_collector) {
                                        if (
                                          String(tt).valueOf() ===
                                          String(
                                            this.get_collector[j].Colletor_Name
                                          ).valueOf()
                                        ) {
                                          this.get_res_id.push(
                                            this.get_collector[j].Collector_id
                                          );
                                        } else {
                                          //console.log("haha");
                                        }
                                      }
                                    }

                                    // console.log(this.get_res_id)
                                    // console.log(this.collec_id)

                                    for (
                                  let i = 0;
                                  i <= this.get_res_id.length - 1;
                                  i++
                                ) {
                                  this.$axios
                                    .post(
                                      "http://localhost:5000/collectordetail",
                                      {
                                        Collector_id: this.get_res_id[i],
                                        id: this.max_upload
                                      }
                                    )
                                    .then(res7 => {
                                      console.log("COMPLETE");
                                    })
                                    .catch("error");
                                }
                                  });

                                
                                // this.$axios.post("http://localhost:5000/collectordetail",{
                                //   Collector_id: this.collec_id,
                                //   id: this.max_upload
                                // }).then(res6 => {
                                //   console.log("COMPLETE");
                                // })
                              }
                            });
                        })
                        .catch(console.log("err"));
                        location.reload()
                    }
                  }
                }
              });
          }
        });
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
    async getSpecies() {
      try {
        axios.get("http://localhost:5000/species").then(res => {
          this.get_Spec = res.data;
          console.log(JSON.stringify(res.data));
          for (let i = 0; i <= this.get_Spec.length; i++) {
            let fname = this.get_Spec[i].Species_Name;
            if (String(this.speciesmd).valueOf() == String(fname).valueOf()) {
              this.get_Speciesid = this.get_Spec[i].Species_id;
            }
          }
        });
      } catch (error) {
        alert(error);
      }
    },
    fetchfinding() {
      try {
        axios.get("http://localhost:5000/finding").then(res => {
          this.get_finding = res.data;
          for (let i = 0; i <= this.get_finding.length; i++) {
            this.finding.push(this.get_finding[i].Finding_Name);
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    async getFinding() {
      try {
        axios.get("http://localhost:5000/finding").then(res => {
          this.get_finding = res.data;
          for (let i = 0; i <= this.get_finding.length; i++) {
            let fname = this.get_finding[i].Finding_Name;
            if (String(this.findingmd).valueOf() == String(fname).valueOf()) {
              this.getfind = this.get_finding[i].Finding_id;
            }
          }
        });
      } catch (err) {
        alert(err);
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

    //get Village ID
    async getVillage() {
      try {
        axios.get("http://localhost:5000/village").then(res => {
          this.get_Vill = res.data;
          console.log(JSON.stringify(res.data));
          for (let i = 0; i <= this.get_Vill.length; i++) {
            let fname = this.get_Vill[i].Village_Name;
            if (String(this.villagemd).valueOf() == String(fname).valueOf()) {
              this.get_Villid = this.get_Vill[i].Village_id;
            }
          }
        });
      } catch (error) {
        alert(error);
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
  }
};
</script>

<style lang="scss" scoped>
input[type="file"] {
  background-color: #4caf50;
  overflow: hidden;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  display: inline-block;
}
</style>
