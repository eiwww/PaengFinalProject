<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <!-- <label>
        <input
          type="file"
          id="file"
          ref="file"
          multiple
          v-on:change="handleFileUpload()"
        />
      </label> -->
      <v-file-input
        accept="image/*"
        label="File input"
        @change="SelectFiles"
      ></v-file-input>
      <label for="fname">First name:</label>
      <input type="text" id="Flora_id" multiple name="Flora_id" /><br /><br />
      <span class="hiddenFileInput">
        <input type="file" name="theFile" multiple />
      </span>

      <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      file: [],
      Flora_id: "",
      get_Image: [],
      test: [],
      selectedFiles: undefined
    };
  },

  methods: {
    SelectFiles(files) {
      this.selectedFiles = files;
    },

    /*
        Submits the file to the server
      */
    async submitFile() {
      /*
                Add the form data we need to submit
            */

      for (let i = 0; i < this.$refs.file.files.length; i++) {
        const formData = new FormData();
        formData.append("image_name", this.$refs.file.files[i]);

        console.log(this.$refs.file.files[0]);

        
        // this.file[i]=[
        //   this.get_Image[i]
        // ]
        await axios
          .post("http://localhost:5000/pic", formData)
          .then(function() {
            console.log("SUCCESS!!");
          })
          .catch(function() {
            console.log("FAILURE!!");
          });
      }
    },

    /*
        Handles a change on the file upload
      */
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>
<style>
.hiddenFileInput > input {
  height: 100%;
  width: 100;
  opacity: 0;
  cursor: pointer;
}
.hiddenFileInput {
  border: 1px solid #4caf50;
  width: 100px;
  height: 100px;
  display: inline-block;
  overflow: hidden;
  background: center center no-repeat;
  background-size: 75% 75%;
  background-image: url("http://assets.stickpng.com/images/586abf66b6fc1117b60b2752.png");

  /* background-image:  linear-gradient(red, yellow); */
}
input[type="file"] {
  background-color: #4caf50;
  overflow: hidden;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  display: inline-block;
}
</style>
