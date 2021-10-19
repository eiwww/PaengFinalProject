<template>
  <v-data-table :headers="headers" :items="Genus" :search="search" class="elevation-1">
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
                      v-model="editedItem.Genus_id"
                      label="ລະຫັດສະກຸນພືດ"
                      readonly
                      append-icon="mdi-tree-outline"
                      prepend-inner-icon="mdi-flower-outline"
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h3>ສະກຸນ</h3>
                    <v-text-field
                      v-model="editedItem.Genus_Name"
                      label="ຊື່ສະກຸນພືດ"
                      color="teal"
                      append-icon="mdi-tree-outline"
                      prepend-inner-icon="mdi-plus"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h3>ຕະກຸນພືດ</h3>
                    <v-select
                      :items="family"
                      v-model="editedItem.Family_Name"
                      :item-text="Family_Name"
                      :item-value="Family_id"
                      @input="test"
                      prepend-inner-icon="mdi-flower-tulip"
                      label="ເລືອກຕະກຸນພືດ..."
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
      <td>{{ prop.Genus.genus_id }}</td>
      <td class="text-xs-right">{{ prop.item.genus_Name }}</td>
      <td class="text-xs-right">{{ prop.item.family_Name }}</td>
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
    Genus: [],
    search: '',
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
        value: "Genus_id"
      },
      { text: "ຊື່ສະກຸນພືດ", value: "Genus_Name" },
      { text: "ຊື່ຕະກຸນພືດ", value: "Family_Name" },
      { text: "Actions", value: "actions", sortable: false }
    ],

    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "ເພີ່ມຂໍ້ມູນຕະກຸນພືດ" : "ແກ້ໄຂ";
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
    this.fetchfam();
  },

  methods: {
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
    // if (
    //        String(this.editedItem.Family_Name).valueOf() ==
    //       String(fname).valueOf()
    //     ) {
    //       this.test2 = this.get_fam[i].Family_id;
    //      }

    fetchdata() {
      axios.get("http://localhost:5000/genus").then(res => {
        this.Genus = res.data;
        console.log(res.data);
      });
    },
    initialize() {
      this.fetchdata();
    },

    init() {
      this.fetchfam();
    },

    editItem(item) {
      this.editedIndex = this.Genus.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.Genus.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.Genus.splice(this.editedIndex, 1);
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
          .put("http://localhost:5000/genus", {
            Genus_id: this.editedItem.Genus_id,
            Genus_Name: this.editedItem.Genus_Name
          })
          .then(res => {
            console.log(res);
          });
        this.snackbar = true;

        Object.assign(this.Genus[this.editedIndex], this.editedItem);
      } else {
        try {
          await axios
            .post("http://localhost:5000/genus", {
              Genus_Name: this.editedItem.Genus_Name,
              Family_id: this.test2
            })
            .then(res => {
              console.log(res);
            });
        } catch (error) {
          console.log(error);
        }

        this.Genus.push(this.editedItem);
        window.location.reload()
      }
      this.close();
    }
  }
};
</script>
