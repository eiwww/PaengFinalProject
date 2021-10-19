<template>
  <v-data-table :headers="headers" :items="District" :search="search" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title><v-icon>mdi-pencil-plus</v-icon></v-toolbar-title>
       <v-divider class="mx-4" inset vertical></v-divider>
       <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ຄົ້ນຫາ"
          single-line
          hide-details
        ></v-text-field>
        <!-- <v-spacer></v-spacer> -->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mt-1" v-bind="attrs" v-on="on" flat text>
              <v-icon color="cyan darken-4">mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <h3>ລະຫັດ</h3>
                    <v-text-field
                      v-model="editedItem.District_id"
                      label="ລະຫັດເມືອງ"
                      readonly
                      append-icon="mdi-tree-outline"
                      prepend-inner-icon="mdi-flower-outline"
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h3>ເມືອງ</h3>
                    <v-text-field
                      v-model="editedItem.District_Name"
                      label="ຊື່ເມືອງ"
                      color="teal"
                      append-icon="mdi-tree-outline"
                      prepend-inner-icon="mdi-plus"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h3>ແຂວງ</h3>
                    <v-select
                      :items="province"
                      v-model="editedItem.Province_Name"
                      :item-text="Province_Name"
                      :item-value="Province_id"
                      @input="test"
                      prepend-inner-icon="mdi-flower-tulip"
                      label="ເລືອກແຂວງ..."
                      color="teal"
                    ></v-select>
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
      <td>{{ prop.District.District_id }}</td>
      <td class="text-xs-right">{{ prop.item.District_Name }}</td>
      <td class="text-xs-right">{{ prop.item.Province_Name}}</td>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" color="primary" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small color="red" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
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
    District: [],
    search: '',
    province: [],
    test2: null,
    get_pro: [],
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
        value: "District_id"
      },
      { text: "ຊື່ເມືອງ", value: "District_Name" },
      { text: "ຊື່ແຂວງ", value: "Province_Name" },
      { text: "Actions", value: "actions", sortable: false }
    ],

    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "ເພີ່ມຂໍ້ມູນເມືອງ" : "ແກ້ໄຂ";
    }
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
    this.fetchpro();
  },

  methods: {
    async fetchpro() {
      try {
        axios.get("http://localhost:5000/province").then(res => {
          this.get_pro = res.data;
          for (let i = 0; i <= this.get_pro.length; i++) {
            this.province.push(this.get_pro[i].Province_Name);
          }
        });
      } catch (error) {
        alert(error);
      }
    },

    fetchdata() {
      axios.get("http://localhost:5000/district").then(res => {
        this.District = res.data;
        console.log(res.data);
      });
    },
    initialize() {
      this.fetchdata();
    },

    init() {
      this.fetchpro();
    },

    editItem(item) {
      this.editedIndex = this.District.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.District.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.District.splice(this.editedIndex, 1);
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
        axios.get("http://localhost:5000/province").then(res => {
          this.get_pro = res.data;  
          for (let i = 0; i <= this.get_pro.length; i++) {
            let fname = this.get_pro[i].Province_Name;
            if (
              String(this.editedItem.Province_Name).valueOf() ==
              String(fname).valueOf()
            ) {
              this.test2 = this.get_pro[i].Province_id;
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
          .put("http://localhost:5000/district", {
            District_id: this.editedItem.District_id,
            District_Name: this.editedItem.District_Name
          })
          .then(res => {
            console.log(res);
          });
        this.snackbar = true;

        Object.assign(this.District[this.editedIndex], this.editedItem);
      } else {
        try {
          await axios
            .post("http://localhost:5000/district", {
              District_Name: this.editedItem.District_Name,
              Province_id: this.test2
            })
            .then(res => {
              console.log(res);
            });
        } catch (error) {
          console.log(error);
        }

        this.District.push(this.editedItem);
        window.location.reload()
      }
      this.close();
    }
  }
};
</script>
