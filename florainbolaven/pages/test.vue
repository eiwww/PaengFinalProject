<template>
  <div>
    <v-file-input
      v-model="file"
      color="deep-purple accent-4"
      counter
      label="File input"
      multiple
      placeholder="Select your files"
      prepend-icon="mdi-paperclip"
      outlined
      :show-size="1000"
    >
      <template v-slot:selection="{ index, text }">
        <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
          {{ text }}
        </v-chip>

        <span
          v-else-if="index === 2"
          class="text-overline grey--text text--darken-3 mx-2"
        >
          +{{ files.length - 2 }} File(s)
        </span>
      </template>
    </v-file-input>
    <v-btn color="success" @click="Submit">Save</v-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      file: []
    };
  },
  methods: {
    async Submit() {
      //et formData = new FormData();

    //      for (let i = 0; i < this.files.length; i++) {
    //   const formData = new FormData();
    //   formData.append("image_name", this.$refs.files.files[0]);

    //  await axios
    //     .post(
    //       "http://localhost:5000/pic",
    //       formData
    //     )
    //     .then(function() {
    //       console.log("SUCCESS!!");
    //     })
    //     .catch(function() {
    //       console.log("FAILURE!!");
    //     });
  //  }
   for(let i=0; i<this.$refs.file.files.length;i++){
          const formData = new FormData();
          formData.append("image_name",this.$refs.file.files[i]);
          
          console.log(this.$refs.file.files[0]);
          // this.file[i]=[
          //   this.get_Image[i]
          // ]
        await axios
        .post(
          "http://localhost:5000/pic",
          formData
        )
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
   }

  }

  }
};
</script>

<style></style>
