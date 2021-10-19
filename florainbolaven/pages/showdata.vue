<template>
  <v-data-table
    :headers="headers"
    :items="User"
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

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mt-1" v-bind="attrs" v-on="on" flat text>
              <v-icon color="cyan darken-4">mdi-plus</v-icon>
            </v-btn>
          </template>
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
                      v-model="editedItem.User_id"
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
                    <h3>ຊື່</h3>
                    <v-text-field
                      v-model="editedItem.User_Name"
                      label="ຊື່"
                      color="teal"
                      append-icon="mdi-tree-outline"
                      prepend-inner-icon="mdi-plus"
                      readonly
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h3>ນາມສະກຸນ</h3>
                    <v-text-field
                      v-model="editedItem.User_Surname"
                      label="ນາມສະກຸນ"
                      color="teal"
                      append-icon="mdi-tree-outline"
                      prepend-inner-icon="mdi-plus"
                      readonly
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h3>ປະເທດ</h3>
                    <v-text-field
                      v-model="editedItem.Country"
                      label="ຊື່ຕະກຸນພືດ"
                      color="teal"
                      append-icon="mdi-tree-outline"
                      prepend-inner-icon="mdi-plus"
                      readonly
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h3>ສະຖາບັນ</h3>
                    <v-text-field
                      v-model="editedItem.Institution"
                      label="ສະຖາບັນ"
                      color="teal"
                      append-icon="mdi-tree-outline"
                      prepend-inner-icon="mdi-plus"
                      readonly
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h3>e-mail</h3>
                    <v-text-field
                      v-model="editedItem.email"
                      label="e-mail"
                      color="teal"
                      append-icon="mdi-tree-outline"
                      prepend-inner-icon="mdi-plus"
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h3>ສິດທິ</h3>
                    <!-- <v-text-field
                      v-model="editedItem.usrole_name"
                      label="ສິດທິ"
                      color="teal"
                      append-icon="mdi-tree-outline"
                      prepend-inner-icon="mdi-plus"
                    ></v-text-field> -->
                    <v-select
                      :items="userrole"
                      v-model="editedItem.usrolename"
                      :item-text="usrole_name"
                      :item-value="usrole_id"
                      @input="test"
                      prepend-inner-icon="mdi-flower-tulip"
                      label="ເລືອກສິດທິ..."
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
  layout: "default",
  components: {},
  data: () => ({
    responseData: [],
    logItems: {},

    userrole: [],
    test2: null,
    get_user: [],

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
        value: "User_id"
      },
      { text: "ຊື່", value: "User_Name" },
      { text: "ນາມສະກຸນ", value: "User_Surname" },
      { text: "ສິດທິ", value: "usrole_name" },
      { text: "ເພດ", value: "Gender" },
      { text: "ປະເທດ", value: "Country" },
      { text: "ສະຖາບັນ", value: "Institution" },
      { text: "E-mail", value: "email" },
      { text: "ແກ້ໄຂ", value: "actions", sortable: false }
    ],
    User: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    resultCount() {
      return Object.keys(this.logItems).length;
    },

    formTitle() {
      return this.editedIndex === -1 ? "ເພີ່ມຂໍ້ມູນຕະກຸນພືດ" : "ແກ້ໄຂ";
    },
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Sign-up";
        case 2:
          return "Create a password";
        default:
          return "Account created";
      }
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
    this.fetchcount();
    this.fetchrole();
  },

  methods: {
    async fetchcount() {
      await axios.get("http://localhost:5000/count").then(res => {
        this.logItems = res.data[0];
        console.log(res.data[0]);
      });
    },
    fetchdata() {
      axios.get("http://localhost:5000/signup/userdata").then(res => {
        this.User = res.data;
        console.log(res.data);
      });
    },
    initialize() {
      this.fetchdata();
    },

    editItem(item) {
      this.editedIndex = this.User.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.User.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.User.splice(this.editedIndex, 1);
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

    async fetchrole() {
      try {
        axios.get("http://localhost:5000/role").then(res => {
          this.get_user = res.data;
          for (let i = 0; i <= this.get_user.length; i++) {
            this.userrole.push(this.get_user[i].usrole_name);
          }
        });
      } catch (error) {
        alert(error);
      }
    },
    test() {
      try {
        axios.get("http://localhost:5000/role").then(res => {
          this.get_user = res.data;
          for (let i = 0; i <= this.get_user.length; i++) {
            let fname = this.get_user[i].usrole_name;
            if (
              String(this.editedItem.usrolename).valueOf() ==
              String(fname).valueOf()
            ) {
              this.test2 = this.get_user[i].usrole_id;
              console.log(this.test2);
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
          .put("http://localhost:5000/signup", {
            User_id: this.editedItem.User_id,
            usrole_id: this.test2
          })
          .then(res => {
            console.log(res);
            location.reload();
          });
        this.snackbar = true;

        Object.assign(this.User[this.editedIndex], this.editedItem);
      } else {
        await axios
          .post("http://localhost:5000/signup", {
            //Family_id : this.editedItem.Family_id,
            Family_Name: this.editedItem.Family_Name
          })
          .then(res => {
            console.log(res);
            location.reload();
          });

        this.User.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style></style>
