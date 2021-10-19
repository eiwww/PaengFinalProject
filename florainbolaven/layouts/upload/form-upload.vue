<template>
  <v-data-table :headers="headers" :items="Upload" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title><v-icon>mdi-pencil-plus</v-icon></v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800">
          <v-card>
            <v-card-title>
              <span class="text-h5 text-center">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
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
                      {{ currentTitle }}
                    </h2>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-card-text>
                      <h2 class="mb-5 text-center">ຊະນິດພືດ</h2>
                      <v-spacer></v-spacer>
                      <v-row>
                        <v-col>
                          <!-- <h3>ຕະກຸນ</h3> -->
                          <v-text-field
                            v-model="editedItem.id"
                            label="ຊື່ຕະກຸນພືດ"
                            color="teal"
                            append-icon="mdi-tree-outline"
                            prepend-inner-icon="mdi-plus"
                            disabled
                            solo
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <!-- <h3>ສະກຸນ</h3> -->
                          <v-text-field
                            v-model="editedItem.Species_Name"
                            label="ຊື່ຕະກຸນພືດ"
                            color="teal"
                            append-icon="mdi-tree-outline"
                            prepend-inner-icon="mdi-plus"
                            disabled
                            solo
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <!-- <h3>ຊະນິດ</h3> -->
                          <v-text-field
                            v-model="editedItem.Genus_Name"
                            label="ຊື່ຕະກຸນພືດ"
                            color="teal"
                            append-icon="mdi-tree-outline"
                            prepend-inner-icon="mdi-plus"
                            disabled
                            solo
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <h2 class="mb-5 text-center">ສະຖານທີ່</h2>

                      <v-row>
                        <v-col>
                          <!-- <h3>ແຂວງ</h3> -->
                          <v-text-field
                            v-model="editedItem.Family_Name"
                            label="ຊື່ຕະກຸນພືດ"
                            color="teal"
                            append-icon="mdi-tree-outline"
                            prepend-inner-icon="mdi-plus"
                            disabled
                            solo
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <!-- <h3>ເມືອງ</h3> -->
                          <v-text-field
                            v-model="editedItem.Village_Name"
                            label="ຊື່ຕະກຸນພືດ"
                            color="teal"
                            append-icon="mdi-tree-outline"
                            prepend-inner-icon="mdi-plus"
                            disabled
                            solo
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <!-- <h3>ບ້ານ</h3> -->
                          <v-text-field
                            v-model="editedItem.District_Name"
                            label="ຊື່ຕະກຸນພືດ"
                            color="teal"
                            append-icon="mdi-tree-outline"
                            prepend-inner-icon="mdi-plus"
                            disabled
                            solo
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <h2 class="mb-5 text-center">ຈຸດພິກັດ</h2>

                      <v-row>
                        <v-col>
                          <!-- <h3>ເສັ້ນຂະໜານ</h3> -->
                          <v-text-field
                            v-model="editedItem.Province_Name"
                            label="ຊື່ຕະກຸນພືດ"
                            color="teal"
                            append-icon="mdi-tree-outline"
                            prepend-inner-icon="mdi-plus"
                            disabled
                            solo
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <!-- <h3>ເສັ້ນແວງ</h3> -->
                          <v-text-field
                            v-model="editedItem.Latitude"
                            label="ຊື່ຕະກຸນພືດ"
                            color="teal"
                            append-icon="mdi-tree-outline"
                            prepend-inner-icon="mdi-plus"
                            disabled
                            solo
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <!-- <h3>ລະດັບຄວາມສູງ</h3> -->
                          <v-text-field
                            v-model="editedItem.Longtitude"
                            label="ຊື່ຕະກຸນພືດ"
                            color="teal"
                            append-icon="mdi-tree-outline"
                            prepend-inner-icon="mdi-plus"
                            disabled
                            solo
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-text-field
                        v-model="editedItem.Altitude"
                        label="ຊື່ຕະກຸນພືດ"
                        color="teal"
                        append-icon="mdi-tree-outline"
                        prepend-inner-icon="mdi-plus"
                        disabled
                        solo
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.Finding_Name"
                        label="ຊື່ຕະກຸນພືດ"
                        color="teal"
                        append-icon="mdi-tree-outline"
                        prepend-inner-icon="mdi-plus"
                        disabled
                        solo
                      ></v-text-field>
                      <h2 class="mb-5 text-center">ວັນທີທີ່ຄົ້ນພົບ</h2>

                      <v-row>
                        <v-col>
                          <!-- <h3>ເວລາ</h3> -->
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
                                v-model="date"
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
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(date)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col class="mb-5">
                          <!-- <h3>ຜູ້ເກັບກໍາ</h3> -->
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
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="teal darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="teal darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div class="text-center">
          <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            top
            color="teal lighten-3"
          >
            {{ text }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </div>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="teal darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="teal darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template slot="items" slot-scope="prop">
      <td>{{ prop.Upload.id }}/td></td>
      <td class="text-xs-right">{{ prop.item.Species_Name }}</td>
      <td class="text-xs-right">{{ prop.item.Genus_Name }}</td>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <!-- <v-icon small class="mr-2" color="primary" @click="editItem(item)">
        mdi-pencil
      </v-icon> -->
      <!-- @click="editItem(item)" -->
      <!-- link   :to="'/uploaddetail/' + item.Flora_id" -->
      <v-btn
        color="teal"
        text
        class="mr-2"
        prepend-icon="mdi-heart"
              link   :to="'/uploaddetail/' + item.Flora_id"
        >View</v-btn
      >
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    show1: false,
    show2: false,
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

    Upload: [],
    hh: [],

    family: [],
    test2: null,
    get_fam: [],
    dialog: false,
    dialogDelete: false,
    snackbar: false,
    text: "ແກ້ໄຂຂໍ້ມູນສໍາເລັດ",
    timeout: 2000,
    headers: [
      {
        text: "ລະຫັດ",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "ສະກຸນ", value: "Species_Name" },
      { text: "ຊະນິດ", value: "Genus_Name" },
      { text: "ຕະກຸນ", value: "Family_Name" },
      { text: "ບ້ານ", value: "Village_Name" },
      { text: "ເມືອງ", value: "District_Name" },
      { text: "ແຂວງ", value: "Province_Name" },
      { text: "ເສັ້ນຂະໜານ", value: "Latitude" },
      { text: "ເສັ້ນແວງ", value: "Longtitude" },
      { text: "ລໍາດັບຄວາມສູງ(m)", value: "Altitude" },
      { text: "ສະຖານະ", value: "status" },
      { text: "ແກ້ໄຂ", value: "actions", sortable: false }
    ],

    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "ອັບໂຫຼດຂໍ້ມູນ" : "ແກ້ໄຂ";
    },

  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  created() {
    this.initialize();
    this.init();
  },
  mounted() {
    this.fetchdata();
    this.fetchfam();
    this.fetchprovine();
    this.fetchcollector();
    this.fectchfamily();
   // this.fetch();
  },

  methods: {
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
    },
    async fetchfam() {
      try {
        axios.get("http://localhost:5000/family").then(res => {
          this.get_fam = res.data;
          for (let i = 0; i <= this.get_fam.length; i++) {
            this.family.push(this.get_fam[i].Family_Name);
          }
        });
      } catch (error) {
        alert(error);
      }
    },

//     fetch(){
// axios.get("http://localhost:5000/upload/getReport").then(res => {
//         this.Upload = res.data;
//         console.log(res.data);
//     })
//     },

    fetchdata() {
    this.Upload= []
      axios.get("http://localhost:5000/upload/getReport").then(res => {
        // this.Upload = res.data;
        // console.log(res.data);
        const handledata = (list,prop)=>{
          return list.map((item)=>{
            var result = ''
            const obj = Object.assign({},item)
            if(obj[prop] == '1'){
              result = 'ເຜີຍແຜ່'
            }else{
              result = 'ກວດສອບ'
            }
            obj[prop] = result
            return this.hh.push(obj)
          })
        }
        handledata(res.data, 'status')
        this.Upload = this.hh
      });
    },
    initialize() {
      this.fetchdata();
    },

    init() {
      this.fetchfam();
    },

    editItem(item) {
      this.editedIndex = this.Upload.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.Upload.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.Upload.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    test() {
      try {
        axios.get("http://localhost:5000/family").then(res => {
          this.get_fam = res.data;
          for (let i = 0; i <= this.get_fam.length; i++) {
            let fname = this.get_fam[i].Family_Name;
            if (
              String(this.editedItem.Family_Name).valueOf() ==
              String(fname).valueOf()
            ) {
              this.test2 = this.get_fam[i].Family_id;
            }
          }
        });
      } catch (error) {
        alert(error);
      }
    },

    async save() {
      if (this.editedIndex > -1) {
        console.log("edit data");
        await axios
          .put("http://localhost:5000/upload", {
            id: this.editedItem.id
          })
          .then(res => {
            console.log(res);
          });
        this.snackbar = true;
        Object.assign(this.Upload[this.editedIndex], this.editedItem);
        location.reload();
      } else {
        try {
          await axios
            .post("http://localhost:5000/upload", {
              Genus_Name: this.editedItem.Genus_Name,
              Family_id: this.test2
            })
            .then(res => {
              console.log(res);
            });
        } catch (error) {
          console.log(error);
        }

        this.Upload.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
