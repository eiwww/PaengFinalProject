<template>
  <div>
    <v-spacer></v-spacer>
    <v-card>
      <v-col>
        <v-tooltip bottom>
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="green"
              dark
              v-bind="attrs"
              v-on="on"
              @click="csvExport(csvData)"
            >
              EXCEL
            </v-btn>
          </template> -->
          <!-- <span>EXCEL</span> -->
        </v-tooltip>
        <!-- <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red"
          dark
          v-bind="attrs"
          v-on="on"
        >
          PDF
        </v-btn>
      </template>
      <span>PDF</span>
    </v-tooltip>    -->
      </v-col>
      <v-card-title>
        ຂໍ້ມູນພືດ
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ຄົ້ນຫາ"
          single-line
          hide-details
        ></v-text-field>
        <v-col class="d-flex mt-5" cols="12" sm="6">
          <v-select
            :items="finding"
            label="ພືດຊະນິດໃໝ່"
            v-model="getSelectNewFinding"
            @change="SelectNewFinding"
          ></v-select>
        </v-col>
      </v-card-title>

      <v-data-table :headers="headers" :items="getFlora" :search="search">
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <v-img height="80" width="120" :src="item.image_Name"></v-img>
            </td>
            <td>{{ item.Species_Name }}</td>
            <td>{{ item.Genus_Name }}</td>
            <td>{{ item.Family_Name }}</td>
            <td>{{ item.Village_Name }}</td>
            <td>{{ item.District_Name }}</td>
            <td>{{ item.Province_Name }}</td>
            <td>{{ item.note }}</td>
            <td>{{ item.Latitude }}</td>
            <td>{{ item.Longtitude }}</td>
            <td>{{ item.Altitude }}</td>
            <td>{{ item.Finding_Name }}</td>
            <!-- <td>{{ item.status }}</td> -->
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      get_finding: [],
      finding: [],
      im: [],
      headers: [
        {
          text: "ຮູບພາບ",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "ສະກຸນ", value: "Species_Name" },
        { text: "ຊະນິດ", value: "Genus_Name" },
        { text: "ຕະກຸນ", value: "Family_Name" },
        { text: "ບ້ານ", value: "Village_Name" },
        { text: "ເມືອງ", value: "District_Name" },
        { text: "ແຂວງ", value: "Province_Name" },
        { text: "ເພີ່ມເຕີມ", value: "note" },
        { text: "ເສັ້ນຂະໜານ", value: "Latitude" },
        { text: "ເສັ້ນແວງ", value: "Longtitude" },
        { text: "ລໍາດັບຄວາມສູງ(m)", value: "Altitude" },
        { text: "ການຄົ້ນພົບ", value: "Finding_Name" },
        // { text: "ສະຖານະ", value: "status" }
      ],
      getFlora: [],
      getNewFinding: [],
      getSelectNewFinding: ""
    };
  },
  computed: {
    csvData() {
      return this.users.map(item => ({
        ...item,
        Species_Name: "адрес", //item.address.city,
        Genus_Name: "компания", //item.company.name
        Village_Name: "",
        District_Name: "",
        Province_Name: ""
      }));
    },
    convert() {
      let image = this.getFlora.map(item => item.image_Name);
      return image;
    }
  },
  mounted() {
    this.fetchfloradata();
    fetch("http://localhost:5000/upload/getReport/")
      .then(resp => resp.json())
      .then(json => (this.users = json));
  },
  methods: {
    csvExport() {
      var csvContent = "data:text/csv;charset=utf-8,";
      csvContent += this.users
        .map(function(d) {
          console.log(d);
          return JSON.stringify(d);
        })
        .join("\n")
        .replace(/(^\{)|(\}$)/gm, "");
      const data = decodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "export.csv");
      link.click();
    },
    SelectNewFinding() {
      if (this.getSelectNewFinding) {
        this.getFlora = [];
        this.getFlora = this.getNewFinding.filter(
          item => String(item.Finding_Name) == String(this.getSelectNewFinding)
        );
      }
    },
    async fetchfloradata() {
      this.$axios.get(`http://localhost:5000/picture`).then(res => {
        console.log("ma leo");
      });
      this.$axios.get(`http://localhost:5000/finding`).then(res => {
        this.get_finding = res.data;
        for (let i = 0; i <= this.get_finding.length; i++) {
          this.finding.push(this.get_finding[i].Finding_Name);
        }
      });
    //    fetchdata() {
    // this.Upload= []
    //   axios.get("http://localhost:5000/upload/getReport").then(res => {
    //     // this.Upload = res.data;
    //     // console.log(res.data);
    //     const handledata = (list,prop)=>{
    //       return list.map((item)=>{
    //         var result = ''
    //         const obj = Object.assign({},item)
    //         if(obj[prop] == '1'){
    //           result = 'ເຜີຍແຜ່'
    //         }else{
    //           result = 'ກວດສອບ'
    //         }
    //         obj[prop] = result
    //         return this.hh.push(obj)
    //       })
    //     }
    //     handledata(res.data, 'status')
    //     this.Upload = this.hh
    //   });

      
      this.$axios.get(`http://localhost:5000/upload/getReport/`).then(res => {
        console.log("access");
        const handleimage = (list, prop) => {
          console.log("access1");
          return list.map(item => {
            console.log("name:" + item.image_Name);
            var url = "http://localhost:5000/";
            const obj = Object.assign({}, item);
            obj[prop] = url.concat(obj[prop]);
            return this.im.push(obj);
          });
        };
        handleimage(res.data, "image_Name");
        this.getFlora = this.im;
        this.getNewFinding = this.getFlora;
        console.log(this.getFlora);
        //console.log(this.results.image_Name);
      });
    }
  }
};
</script>
<style></style>
