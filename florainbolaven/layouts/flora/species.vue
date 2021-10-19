<template>
  <v-data-table
    :headers="headers"
    :items="Species"
    :search="search"
    class="elevation-1"
  >
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
                      v-model="editedItem.Species_id"
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
                      v-model="editedItem.Species_Name"
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
                      :items="genus"
                      v-model="editedItem.Genus_Name"
                      :item-text="Genus_Name"
                      :item-value="Genus_id"
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
      <td>{{ prop.Species.Species_id }}</td>
      <td class="text-xs-right">{{ prop.item.Species_Name }}</td>
      <td class="text-xs-right">{{ prop.item.Genus_Name }}</td>
      <td class="text-xs-right">{{ prop.item.Family_Name }}</td>
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
    Species: [],
    search: "",
    genus: [],
    test2: null,
    get_gen: [],
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
        value: "Species_id"
      },
      { text: "ຊື່ຊະນິດພືດ", value: "Species_Name" },
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
    this.fetchgen();
  },

  methods: {
    async fetchgen() {
      try {
        axios.get("http://localhost:5000/genus").then(res => {
          this.get_gen = res.data;
          for (let i = 0; i <= this.get_gen.length; i++) {
            this.genus.push(this.get_gen[i].Genus_Name);
          }
        });
      } catch (error) {
        alert(error);
      }
    },

    fetchdata() {
      axios.get("http://localhost:5000/species").then(res => {
        this.Species = res.data;
        console.log(res.data);
      });
    },
    initialize() {
      this.fetchdata();
    },

    init() {
      this.fetchgen();
    },

    editItem(item) {
      this.editedIndex = this.Species.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.Species.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.Species.splice(this.editedIndex, 1);
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
        axios.get("http://localhost:5000/genus").then(res => {
          this.get_gen = res.data;
          for (let i = 0; i <= this.get_gen.length; i++) {
            let fname = this.get_gen[i].Genus_Name;
            if (
              String(this.editedItem.Genus_Name).valueOf() ==
              String(fname).valueOf()
            ) {
              this.test2 = this.get_gen[i].Genus_id;
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
          .put("http://localhost:5000/species", {
            Species_id: this.editedItem.Species_id,
            Species_Name: this.editedItem.Species_Name,
            Genus_id: this.test2
          })
          .then(res => {
            console.log(res);
          });
        this.snackbar = true;

        Object.assign(this.Species[this.editedIndex], this.editedItem);
      } else {
        try {
          await axios
            .post("http://localhost:5000/species", {
              Species_Name: this.editedItem.Species_Name,
              Genus_id: this.test2
            })
            .then(res => {
              console.log(res);
            });
        } catch (error) {
          console.log(error);
        }

        this.Species.push(this.editedItem);
        location.reload();
      }
      this.close();
    }
  }
};
</script>
