<template lang="html">
  <div>
    <div class="d-flex flex-wrap">
      <v-card
        v-for="manga in results"
        :key="manga.Family_id"
        class="ma-2"
        max-width="400"
        outlined
        @click="handleMangaClick(manga)"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">ລະຫັດຕະກຸນ: {{ manga.Family_id }}</div>
            <v-list-item-title class="headline mb-1">
              ຊື່ຕະກຸນພືດ: {{ manga.Family_Name }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item> 
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      query: "",
      results: {},
      Family_id: "",
      Family_Name: ""
    };
  },

  methods: {
   async handleMangaClick() {
      //const url = `https://api.jikan.moe/v3/search/anime?q=${this.query}`
      const url = `http://localhost:5000/family?q=${this.query}`;
     await axios.get(url).then(res => {
        console.log(res.data);
        this.results = res.data;
        this.Family_id = res.data.Family_id;
        this.Family_Name = res.data.Family_Name;
      });
    },
    handleMangaClick(manga) {
      console.log("MANGA", manga);
      window.location = manga.url;
    }
  },

  mounted() {
    const url = `http://localhost:5000/family?q=${this.query}`;
    axios.get(url).then(res => {
      console.log(res.data);
      this.results = res.data;
      this.Family_id = res.data.Family_id;
      this.Family_Name = res.data.Family_Name;
    });
  }
};
</script>
