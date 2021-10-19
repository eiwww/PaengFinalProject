<template>
  <div>
    <h2 class="text-center mt-2">ຜູ້ເກັບກໍາ</h2>

    <v-data-table
      :headers="headers"
      :items="Collector"
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
          <v-dialog v-model="dialog" max-width="700px">
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
                        v-model="editedItem.Collector_id"
                        label="ຜູ້ເກັບກໍາ"
                        readonly
                        prepend-inner-icon="mdi-call-made"
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <h3>ຊື່ແທ້</h3>
                      <v-text-field
                        v-model="editedItem.Colletor_Name"
                        label="ຜູ້ເກັບກໍາ"
                        color="teal"
                        prepend-inner-icon="mdi-account-edit"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <h3>ນາມສະກຸນ</h3>
                      <v-text-field
                        v-model="editedItem.Collector_Surname"
                        label="ຜູ້ເກັບກໍາ"
                        color="teal"
                        prepend-inner-icon="mdi-account"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <h3>ຊື່ຫຍໍ້</h3>
                      <v-text-field
                        v-model="editedItem.Collector_name"
                        label="ຜູ້ເກັບກໍາ"
                        color="teal"
                        prepend-inner-icon="mdi-account-outline"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <h3>ສັນຊາດ</h3>
                      <v-select
                        v-model="editedItem.selectNation"
                        :items="nation"
                        solo
                        label="ຜູ້ເກັບກໍາ"
                        prepend-inner-icon="mdi-flag"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal darken-1" text @click="close">
                  ຍົກເລີກ
                </v-btn>
                <v-btn color="teal darken-1" text @click="save">
                  ບັນທຶກ
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
              <v-card-title class="text-h5 text-center"
                >ທ່ານໝັ້ນໃຈບໍ ?</v-card-title
              >
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
        <td>{{ prop.Collector.Collector_id }}</td>
        <td class="text-xs-right">{{ prop.item.Colletor_Name }}</td>
        <td class="text-xs-right">{{ prop.item.Collector_Surname }}</td>
        <td class="text-xs-right">{{ prop.item.Collector_name }}</td>
        <td class="text-xs-right">{{ prop.item.Nationality }}</td>

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
  </div>
</template>

<script>
import axios from "axios";
export default {
      layout: 'default',

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
    nation: ["Lao", "Japanese"],
    //selectNation: "Lao",
    headers: [
      {
        text: "ລະຫັດ",
        align: "start",
        sortable: false,
        value: "Collector_id"
      },
      { text: "ຊື່ແທ້", value: "Colletor_Name" },
      { text: "ນາມສະກຸນ", value: "Collector_Surname" },
      { text: "ຊື່ຫຍໍ້", value: "Collector_name" },
      { text: "ສັນຊາດ", value: "Nationality" },
      { text: "ແກ້ໄຂ", value: "actions", sortable: false }
    ],
    Collector: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "ເພີ່ມຂໍ້ມູນຜູ້ເກັບກໍາ" : "ແກ້ໄຂ";
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
  },

  methods: {

    fetchdata() {
      axios.get("http://localhost:5000/collector/").then(res => {
        this.Collector = res.data;
        //this.selectNation = res.data[0].Nationality;
        this.editedItem.selectNation = res.data[0].Nationality;
        console.log(res.data);
      });
    },
    initialize() {
      this.fetchdata();
    },

    editItem(item) {
      this.editedIndex = this.Collector.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.selectNation = item.Nationality
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.Collector.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.Collector.splice(this.editedIndex, 1);
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
        try {
          console.log("edit data");

          await axios
            .put("http://localhost:5000/collector", {
              Collector_id: this.editedItem.Collector_id,
              Colletor_Name: this.editedItem.Colletor_Name,
              Collector_Surname: this.editedItem.Collector_Surname,
              Collector_name: this.editedItem.Collector_name,
              Nationality: this.editedItem.selectNation
            })
            .then(res => {
              console.log(res);
              location.reload();
            });
          this.snackbar = true;
          Object.assign(this.Collector[this.editedIndex], this.editedItem);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await axios
            .post("http://localhost:5000/collector", {
              //Family_id : this.editedItem.Family_id,
              Colletor_Name: this.editedItem.Colletor_Name,
              Collector_Surname: this.editedItem.Collector_Surname,
              Collector_name: this.editedItem.Collector_name,
              Nationality: this.editedItem.selectNation
            })
            .then(res => {
              console.log(res);
              location.reload();
            });
          alert("dai leo");
          this.Collector.push(this.editedItem);
        } catch (err) {
          console.log(err);
        }
      }
      this.close();
    }
  }
};
</script>

<style></style>
