<template>
  <v-data-table
    :headers="headers"
    :items="Province"
    sort-by="calories"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
   <v-toolbar-title
          ><v-icon color="green"
            >mdi-home-city</v-icon
          ></v-toolbar-title
        >        <v-divider class="mx-4" inset vertical></v-divider>
 <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ຄົ້ນຫາ"
          single-line
          hide-details
        ></v-text-field>         <v-dialog v-model="dialog" max-width="500px">
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
                    <v-text-field
                      v-model="editedItem.Province_id"
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
                    <v-text-field
                      v-model="editedItem.Province_Name"
                      label="ຊື່แຂວງ"
                      color="red"
                       append-icon="mdi-map-marker"
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
      <td>{{ prop.Province.Province_id }}</td>
      <td class="text-xs-right">{{ prop.item.Province_Name }}</td>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" color="primary" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon color="red" small @click="deleteItem(item)">
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
    search: '',
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
        value: "Province_id"
      },
      { text: "ຊື່แຂວງ", value: "Province_Name" },
      { text: "ແກ້ໄຂ", value: "actions", sortable: false}
    ],
    Province: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0
    }
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
  },
  mounted() {
    this.fetchdata();;
  },

  methods: {
    fetchdata() {
      axios.get("http://localhost:5000/province").then(res => {
        this.Province = res.data;
        console.log(res.data);
      });
    },
    initialize() {
      this.fetchdata();
    },

    editItem(item) {
      this.editedIndex = this.Province.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.Province.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.Province.splice(this.editedIndex, 1);
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
        await axios.put("http://localhost:5000/province",{  
               Province_id: this.editedItem.Province_id,      
               Province_Name: this.editedItem.Province_Name                  
                })
                .then(res=>{
                  console.log(res);
                
                }) 
                this.snackbar = true

        Object.assign(this.Province[this.editedIndex], this.editedItem);
      } else {
        await axios
          .post("http://localhost:5000/province", {
            Province_Name: this.editedItem.Province_Name,
          })
          .then(res => {
            console.log(res);
          });

        this.Province.push(this.editedItem);
      window.location.reload()
      }
      this.close();
    }
  }
};
</script>
