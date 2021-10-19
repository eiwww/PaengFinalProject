<template>
  <div>
    <!-- <div>
<iframe
    src="http://localhost:5000/public/test/2007_Neman%20et%20al._Checklist%20of%20Laos%20Vascular%20Plants.pdf"
    frameBorder="0"
    scrolling="auto"
    height="500"
style="border:none;"
></iframe>
    </div> -->
    <v-row>
      <!-- <h3>ຊະນິດ</h3>
                    <v-select
            v-model="testmd"
            :items="test"
            label="test"
           :item-text="Name"
           :item-value="id"
            solo
            multiple
            @input="test2($event)"
          ></v-select> -->

      <v-text-field v-model="first" label="Name" solo> </v-text-field>
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

      <!-- <div>
        <p>{{ radios || "null" }}</p>
        <v-radio-group v-model="radios" mandatory>
          <v-radio label="Radio 1" value="ຍິງ"></v-radio>
          <v-radio label="Radio 2" value="male"></v-radio>
        </v-radio-group>
      </div> -->
      <!-- 
           <v-col>
   <h3 class="text-left mt-1">ປະເທດ</h3>
            <v-autocomplete
              ref="country"
              v-model="country"
              :rules="[() => !!country || 'This field is required']"
              :items="countries"
              label="ປະເທດ"
              placeholder="ເລືອກ..."
              required
              solo
            ></v-autocomplete>
              </v-col> -->

      <v-col class="mb-5">
        <v-select
          v-model="testmd"
          :items="test"
          label="Long"
          :item-text="Name"
          :item-value="id"
          solo
          chips
          multiple
        ></v-select>
      </v-col>

      <div class="text-center mt-2" color>
        <v-btn color="cyan darken-4" dark @click="save"
          >ເພີ່ມຂໍ້ມູນການອັບໂຫຼດ</v-btn
        >
      </div>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import dateformat from "dateformat";
export default {
  data() {
    return {
      select: { state: "Florida", abbr: "FL" },
      items: [
        { state: "Florida", abbr: "FL" },
        { state: "Georgia", abbr: "GA" },
        { state: "Nebraska", abbr: "NE" },
        { state: "California", abbr: "CA" },
        { state: "New York", abbr: "NY" }
      ],

      first: "",
      date: "",
      show1: false,
      show2: false,

      id: null,
      test: [],

      get_test: [],
      Test: null,
      test: [],
      Test_id: [],
      get_Testid: [],
      testmd: [],

      getid: [],

      get_res_id: [],

      getestmd: [],


      countries: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua &amp; Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin"
      ],
      country: null,

      radios: null,

      step: 1,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false
    };
  },
  computed: {
    formatDate() {
      return dateformat(this.date, "dd-mm-yyyy");
    }
  },
  mounted() {
    this.fetchtest();
  },

  methods: {
    fetchtest() {
      try {
        axios.get("http://localhost:5000/test").then(res => {
          this.get_test = res.data;
          for (let i = 0; i <= this.get_test.length; i++) {
            this.test.push(this.get_test[i].Name);
            //this.Test_id.push(this.get_test[i])
          }
          
        });
      } catch (err) {
        console.log(err);
      }
    },

    getTest() {
      try {
        axios.get("http://localhost:5000/test").then(res => {
          this.get_test = res.data;
          this.getestmd = this.testmd;

          this.Test_id = [];
          this.get_res_id = [];

          for(let i in this.getestmd){
            const tt = this.getestmd[i];
            this.Test_id.push(tt)
            for (let j in this.get_test) {
              
              //const res_name = this.get_test[j]
              
              if (String(tt).valueOf() === String(this.get_test[j].Name).valueOf()) {
                this.get_res_id.push(this.get_test[j].id);
                //console.log(this.Test_id)
                //console.log(this.get_res_id);
              } else {
                //console.log("haha");
                
              }
              // if(0===0){
              //   console.log(res_name.Name)
              // }
              
              
            }
            
          }
        console.log(this.get_res_id);

          // for (let i = 0; i <= this.get_test.length; i++) {
          // if (
          //   String(this.testmd).valueOf() ==
          //   String(this.get_test[i].Name).valueOf()
          // )
          // {
          //   this.Test_id = this.get_test[i].id;
          //   console.log(this.Test_id);
          // }
          // }

          // console.log(this.getestmd);
        });
      } catch (error) {
        console.log(error);
      }
      //  console.log(this.testmd);
    },
    async save() {
      // await axios
      //   .post("http://localhost:5000/test", {
      //     Name: this.country,
      //     date: this.Test_id
      //   })
      //   .then(res => {
      //     console.log(res);
      //     console.log(this.Test_id);
      //     console.log(this.date);
      //     //location.reload();
      //   });

      
      axios.get("http://localhost:5000/test").then(res => {
          this.get_test = res.data;
          this.getestmd = this.testmd;

          this.Test_id = [];
          this.get_res_id = [];

          for(let i in this.getestmd){
            const tt = this.getestmd[i];
            this.Test_id.push(tt)
            for (let j in this.get_test) {
              
              //const res_name = this.get_test[j]       
              if (String(tt).valueOf() === String(this.get_test[j].Name).valueOf()) {
                this.get_res_id.push(this.get_test[j].id);
                //console.log(this.Test_id)
                //console.log(this.get_res_id);
              } else {
                //console.log("haha");             
              }
              // if(0===0){
              //   console.log(res_name.Name)
              // }          
            }          
          }
          }
      )
      for(let i=0; i<=this.get_res_id.length-1;i++){
        await axios
        .post("http://localhost:5000/testpic", {
          name: this.first,
          id: this.get_res_id[i]
        })
        .then(res => {
          console.log(res);
          console.log(this.first);
          console.log(this.get_res_id[i]);
        }).catch("error");
    }
      }
      
  }
};
</script>

<style></style>
