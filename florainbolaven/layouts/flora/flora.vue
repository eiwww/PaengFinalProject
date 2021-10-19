<template>
  <v-data-table
    :headers="headers"
    :items="Flora"
    :search="search"
    sort-by="calories"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title
          ><v-icon color="cyan darken-3"
            >mdi-pencil-plus-outline</v-icon
          ></v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ຄົ້ນຫາ"
          single-line
          hide-details
        ></v-text-field>

        <!-- <h6 class="mt-2">ເພີ່ມ</h6> -->
        <v-dialog v-model="dialog" max-width="500px">
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn class="mt-1" v-bind="attrs" v-on="on" flat text>
              <v-icon color="cyan darken-4">mdi-plus</v-icon>
            </v-btn>
          </template> -->
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
              <v-spacer></v-spacer>

            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <h3>ລະຫັດ</h3>
                    <v-text-field
                      v-model="editedItem.Family_id"
                      label="ລະຫັດ"
                      readonly
                      append-icon="mdi-tree-outline"
                      prepend-inner-icon="mdi-flower-tulip"
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h3>ຊື່ຕະກຸນ</h3>
                    <v-text-field
                      v-model="editedItem.Family_Name"
                      label="ຊື່ຕະກຸນພືດ"
                      color="teal"
                      append-icon="mdi-tree-outline"
                      prepend-inner-icon="mdi-plus"
                    ></v-text-field>
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
            <v-card-title class="text-h5">ແນ່ໃຈບໍ</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="teal darken-1" text @click="closeDelete"
                >ຍົກເລີກ</v-btn
              >
              <v-btn color="teal darken-1" text @click="deleteItemConfirm"
                >ຕົກລົງ</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template slot="items" slot-scope="prop">
      <td>{{ prop.Family.Family_id }}</td>
      <td class="text-xs-right">{{ prop.item.Family_Name }}</td>
      <td class="has-text-centered">
        <v-btn icon @click="deleteItem(prop.item)"
          ><v-icon>mdi-heart</v-icon></v-btn
        >
      </td>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" color="teal" @click="editItem(item)">
        mdi-account-edit
      </v-icon>
      <v-icon small color="red" @click="deleteItem(item)">
        mdi-trash-can-outline
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
  components: {},
  data: () => ({
    search: "",
    step: 1,
    dialog: false,
    dialogDelete: false,
    alert: false,
    snackbar: false,
    text: "ແກ້ໄຂຂໍ້ມູນສໍາເລັດ",
    timeout: 2000,
    headers: [
      {
        text: "ລະຫັດ",
        align: "start",
        sortable: false,
        value: "Flora_id"
      },
      { text: "ຊະນິດ", value: "Species_Name" },
      { text: "ສະກຸນ", value: "Genus_Name" },
      { text: "ຕະກຸນ", value: "Family_Name" },
      { text: "ຊື່ລາວ", value: "Vernacular_Name" },
      { text: "ເພີ່ມເຕີມ", value: "note" },
      { text: "ປະເພດການຄົ້ນພົບ", value: "Finding_Name" },

      { text: "ແກ້ໄຂ", value: "actions", sortable: false }
    ],
    Flora: [],
    editedIndex: -1,
    editedItem: {
      Family_id: "",
      amily_Name: 0
    },
    defaultItem: {}
  }),

  computed: {
    resultCount() {
      return Object.keys(this.logItems).length;
    },

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
  },
  mounted() {
    this.fetchdata();
  },

  methods: {
    fetchdata() {
      axios.get("http://localhost:5000/flora/").then(res => {
        this.Flora = res.data;
        console.log(res.data);
      });
    },
    initialize() {
      this.fetchdata();
    },

    editItem(item) {
      this.editedIndex = this.Family.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.Family.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.Family.splice(this.editedIndex, 1);
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

    async save() {
      if (this.editedIndex > -1) {
        console.log("edit data");

        await axios
          .put("http://localhost:5000/family", {
            Family_id: this.editedItem.Family_id,
            Family_Name: this.editedItem.Family_Name
          })
          .then(res => {
            console.log(res);
          });
        this.snackbar = true;

        Object.assign(this.Family[this.editedIndex], this.editedItem);
      } else {
        await axios
          .post("http://localhost:5000/family", {
            //Family_id : this.editedItem.Family_id,
            Family_Name: this.editedItem.Family_Name
          })
          .then(res => {
            console.log(res);
            location.reload();
          });

        this.Family.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style></style>
