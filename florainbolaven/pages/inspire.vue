<template>
  <div class="hi">
    <div id="app">
      <input type="file" @change="onFileSelected">
      <!-- <div v-if="!image">
        <h2>Select an image</h2>
        <input type="file" @change="onFileChange" multiple/>
      </div>
      <div v-else> 
        <img :src="image" />
        <v-btn color="success" @click="removeImage" >Remove image</v-btn> -->
         <!-- <button @click="removeImage">Remove image</button> --> -->
      <!-- </div> -->
      <!-- <v-text-field v-model="first" label="Name" solo> </v-text-field> --> -->

      <!-- <button @click="onUpload">Upload</button> -->
      <v-btn @click="onUpload">test</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selectedFile: null,

      files: {},

      image: ""
    };
  },
  methods: {
    async submitFiles() {
      try {
        if (this.files) {
          let formData = new FormData();
          // files
          for (let file of this.files) {
            formData.append("image_name", file, file.name);
          }

          // additional data
          //formData.append("Flora_id", this.first);

          await axios
            .post("http://localhost:5000/pic", formData)
            .then(res => {
              console.log("Success!");
              console.log(res);
            })
            .catch(error => {
              console.log({ error });
            });
        } else {
          console.log("there are no files.");
        }
      } catch (err) {
        console.log(err);
      }
    },
    onFileSelected(event) {
      console.log(event);
      this.selectedFile = event.target.files[0];
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function(e) {
      this.image = "";
    },

    async onUpload() {
      try {
        const fd = new FormData();

        fd.append("image_name", this.selectedFile,this.selectedFile.name);
        //fd.append("Flora_id", this.first);
        await axios.post("http://localhost:5000/pic", fd).then(res => {
          console.log(res);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
#app {
  text-align: center;
}
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
input[type="file"] {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  
}
</style>
