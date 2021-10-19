<template lang="html">
  <div>
    <v-row>
      <v-col class="mt-6">
        <v-text-field
          text-color="white"
          placeholder="search"
          outlined
          round
          v-model="search"
          @input="SearchRecords()"
          prepend-inner-icon="mdi-magnify"
          type="text"
          clearable
        >
          <v-btn> <v-icon>mdi-close</v-icon></v-btn></v-text-field
        >
      </v-col>
    </v-row>
    <div class="d-flex flex-wrap">
      <template v-for="manga in results">
        <!-- <v-card
        link
        :to="'/floradetail/' + manga.Flora_id"
        class="ma-5"
        max-width="220"
        v-for="manga in results"
        :key="manga.id"
      > -->
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
            max-width="210"
            class="ma-2"
            link
            :to="'/floradetail/' + manga.Flora_id"
          >
            <v-img height="200" :src="manga.image_Name"></v-img>
            <v-card-title>ຕະກຸນ: {{ manga.Family_Name }}</v-card-title>
            <v-card-text>
              <div class="my-4 text-subtitle-1">
                ຊະນິດ: {{ manga.Species_Name }} {{ manga.Genus_Name }}
              </div>
            </v-card-text>
          </v-card>
        </v-hover>

      </template>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      overlay: false,
      query: "",
      results: [],
      id: "",
      flora: [],
      im: [],
      search: "",
      GetSearchNewRecords: []
    };
  },

  methods: {
    SearchRecords() {
      if (this.search == "") {
        this.fetchdata();
      } else {
        this.$axios
          .get(`http://localhost:5000/upload/searchLocate/${this.search}`)
          .then(res => {
            console.log("access");
            this.im = [];
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
            this.results = this.im;
            //this.GetSearchNewRecords = this.results;
            console.log(this.results);
            //console.log(this.results.image_Name);
          });
        //this.results = this.results.filter(item => String(item.Family_Name).match(String(this.search)))
      }
    },
    fetchdata() {
      //data show when status=1
      this.$axios.get(`http://localhost:5000/upload/getLocate`).then(res => {
        console.log("access");
        this.im = [];
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
        this.results = [];
        this.results = this.im;
        //this.GetSearchNewRecords = this.results;
        console.log(this.results);
      });
    },
    fetchsearchdata() {
      this.$axios
        .get(`http://localhost:5000/upload/searchLocate/${this.search}`)
        .then(res => {
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

          this.results = this.im;
          console.log(this.results);
        });
    }

    // toFloraDetail($param) {
    //   this.$router.push({ name: "floradetail-_flora", params: { id: $param } });
    // }
  },
  computed: {},

  mounted() {
    this.fetchdata();
  }
};
</script>
<style>
.v-card:not(.on-hover) {
  opacity: 0.85;
}
.v-card {
  transition: opacity 0.4s ease-in-out;
}
</style>
