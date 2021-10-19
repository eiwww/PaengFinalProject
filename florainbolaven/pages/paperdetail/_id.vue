<template>
  <div>
    
    <iframe
    :src="paper.pdf"
      frameBorder="0"
      scrolling="auto"
      height="500"
      style="border:none;"
    ></iframe>
  <iframe
    src="http://localhost:5000/public/test/2007_Neman%20et%20al._Checklist%20of%20Laos%20Vascular%20Plants.pdf"
    frameBorder="0"
    scrolling="auto"
    height="500"
style="border:none;"
></iframe>
        <!-- <v-img height="200" :src="manga.image_Name"></v-img> -->

    <h1>{{paper.Paper_Name}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paeng: [],
      paper: []
    };
   
  },
  methods: {
    async fetchPaper() {
      await this.$axios
        .get(`http://localhost:5000/paper/getPaperid/` + this.$route.params.id)
        .then(res => {
          //this.paper = res.data[0];
             console.log("access");
        const handleimage = (list, prop) => {
          console.log("access1");
          return list.map(item => {
            console.log("name:" + item.pdf);
            var url = "http://localhost:5000/";
            const obj = Object.assign({}, item);
            obj[prop] = url.concat(obj[prop]);
            return this.im.push(obj);
          });
        };
        handleimage(res.data, "pdf");
        this.paper = this.im;
        console.log(this.paper.pdf);
        });
    }
  
  },
  mounted() {
    this.fetchPaper();
  }
};
</script>

<style></style>
