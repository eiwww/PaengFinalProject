<template>
  <v-container>
    <!-- <div class="d-flex flex-wrap">
      <v-row dense>
        <v-col v-for="paper in papers" :key="paper.Paper_id" cols="12">
          <v-card link :to="'/paperdetail/' + paper.Paper_id">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="paper.Description"
                ></v-card-title>
                <v-card-subtitle v-text="paper.Paper_Name"></v-card-subtitle>
              </div>
              <v-avatar class="ma-3" size="125" tile>
            <v-img  :src="require('../assets/image/flora2.jpg')"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
        <a href="https://padme.rbge.org.uk/laos/list/">For more information</a>
      </v-row>
    </div>
  </v-container> -->
  <graph/>
  </v-container>
</template>

<script>
import graph from '~/layouts/flora/graph.vue';
export default {
  layout: 'noneuser',
  components: { graph },
  data() {
    return {
      papers: [],
      paper: [
        {
          Create_date: "",
          Paper_Name: "",
          Description: "",
          pdf: ""
        }
      ],
    }
  },
  methods: {
    fetchPaperdata() {
      this.$axios.get(`http://localhost:5000/paper`).then(res => {
        this.papers = res.data;
        console.log(res.data);
      });
      
    },
    //  this.$axios
    //     .get(
    //       `http://localhost:5000/picture/getImageid/` + this.$route.params.id
    //     )
    //     .then(res => {
    //       this.image = res.data;
    //       for (var i = 0; i <= res.data.length; i++) {
    //         let url = "http://localhost:5000/" + res.data[i].image_Name;
    //         this.imagee.push(url);
    //         console.log(res.data[i].image_Name);
    //       }

    //       console.log(res.data);
    //     });
  },
  mounted() {
    this.fetchPaperdata();
  }
};
</script>

<style></style>
