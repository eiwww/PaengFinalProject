<template>
  <v-container>
  
    <v-row>
      <v-col  class="text-center ">
        <h3>ຊະນິດພືດ:</h3>
      </v-col>
  
      <v-col>
        <v-row>
          
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              name="name"
              label="ສະກຸນ"
              id="id"
              v-model="flora.Genus_Name"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
          name="name"
          label="ຊະນິດ"
          id="id"
          v-model="flora.Species_Name"
          disabled
        ></v-text-field>
        <v-text-field
          name="name"
          label="ຕະກຸນ"
          id="id"
          v-model="flora.Family_Name"
          disabled
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-10">
      <v-col cols="12" sm="6" class="text-center">
        <h3>ສະຖານທີ່:</h3>
      </v-col>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col>
            <v-text-field
              name="name"
              label="ບ້ານ"
              id="id"
              v-model="location.Village_Name"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
          name="name"
          label="ເມືອງ"
          id="id"
          v-model="location.District_Name"
          disabled
        ></v-text-field>
        <v-text-field
          name="ແຂວງ"
          label="label"
          id="id"
          v-model="location.Province_Name"
          disabled
        ></v-text-field>
        <v-text-field
          name="name"
          label="ເພີ່ມເຕີມ"
          id="id"
          v-model="flora.note"
         disabled
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-10">
      <v-col cols="12" sm="6" class="text-center ">
        <h3>ຈຸດພິກັດ:</h3>
      </v-col>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col>
            <v-text-field
              name="name"
              label="ເສັ້ນຂະໜານ"
              id="id"
              v-model="location.Latitude"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
          name="name"
          label="ເສນັ້ນແວງ"
          id="id"
          v-model="location.Longtitude"
          disabled
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-10">
      <v-col cols="12" sm="6" class="text-center ">
        <h3>ລະດັບຄວາມສູງ (m):</h3>
      </v-col>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col>
            <v-text-field
              name="name"
              label="ລະດັບຄວາມສູງ"
              id="id"
              v-model="location.Altitude"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-10">
      <v-col cols="12" sm="6" class="text-center ">
        <h3>ປະເພດການຄົ້ນພົບ:</h3>
      </v-col>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col>
            <v-text-field
              name="name"
              label="ປະເພດການຄົ້ນພົບ"
              id="id"
              v-model="location.Finding_Name"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-10">
       <v-col cols="12" sm="6" class="text-center ">
        <h3>ຜູ້ເກັບກໍາ:</h3>
      </v-col>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col>
             <v-text-field
              name="name"
              label="ຜູ້ເກັບກໍາ"
              id="id"
              v-model="location.Collector_name"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-10">
      <v-col cols="12" sm="6" class="text-center ">
        <h3>ສະຖານະການອັບໂຫຼດ:</h3>
      </v-col>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col>
            <v-text-field
              name="name"
              label="ສະຖານະ"
              id="id"
              v-model="statusName"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card-text>
          <div class="text-center" color>
            <!-- <v-btn color="success" @click="testlong">text</v-btn> -->
            <v-btn color="cyan darken-4" dark @click="testlong"
              >ບັນທຶກການກວດສອບ</v-btn
            >
          </div>
        </v-card-text>
      </v-col>
    </v-row>
      <!-- snackbar show when update status -->
     <div class="text-center">
          <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            top
            color="teal lighten-3"
          >
           ຂໍ້ມູນໄດ້ຮັບການເຜີຍແຜ່

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
          <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          ກວດສອບຂໍ້ມູນເຜີຍແຜ່
        </v-card-title>
        <v-card-text>ເມື່ອທ່ານຢືນຢັນວ່າຂໍ້ມູນຖືກຕ້ອງແລ້ວ.​ ສະຖານະຂໍ້ມູນຈະມີການປ່ຽນແປງ ແລະ ຂໍ້ມູນດັ່ງກ່າວຈະຖືກເຜີຍແຜ່ລົງໃນໜ້າຫຼັກ.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="UpdateStatus"
          >
            ຢຶນຢັນ
          </v-btn>
            <v-btn
            color="green darken-1"
            text
         @click="dialog = false"
          >
            ຍົກເລີກ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
      layout: 'default',

  data() {
    return {

     dialog: false,


      //snackbar
      snackbar: false,

      flora: [
        {
          Species_Name: "",
          Genus_Name: "",
          Family_Name: "",
          note: ""
        }
      ],
      location: [
        {
          id: "",
          Latitude: "",
          Longtitude: "",
          Village_Name: "",
          District_Name: "",
          Province_Name: "",
          Altitude: "",
          Finding_Name: "",
          status: "",
          Collector_name:"",
        }
      ],
      image: [],
      statusName: [],
      imagee: []
    };
  },
  methods: {
    async fetchfloradata() {
      this.$axios
        .get(`http://localhost:5000/flora/getFloraid/` + this.$route.params.id)
        .then(res => {
          this.flora = res.data[0];
          //console.log(res.data[0]);
        });
      this.$axios
        .get(
          `http://localhost:5000/upload/getLocation/` + this.$route.params.id
        )
        .then(res => {        
          this.location = res.data[0];
          console.log(res.data[0].status);
          const checkstt = res.data[0].status;
          if(checkstt===1){
              this.statusName = 'ເຜີຍແຜ່'
          }else{
            this.statusName = 'ກວດສອບ'
          }    
          // console.log("ma bor" + this.location);
        });
    },

    testlong(){
this.dialog = true;
    },

    async UpdateStatus() {
      try {
        await axios
          .put(`http://localhost:5000/upload/`, {
            id: this.location.id
          })
          .then(res => {
            console.log(res);
            console.log(this.location.id);
            location.reload();
          });
          
          //this.snackbar = true
      } catch (err) {
        console.log(err);
      }

     }
  },
  mounted() {
    this.fetchfloradata();
  }
};
</script>

<style></style>
