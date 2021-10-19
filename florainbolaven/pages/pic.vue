<template>
<div>
 <v-file-input
 v-model="files"
    multiple
    label="File input"
    ref="myfile"
  ></v-file-input>
   <v-btn color="primary"  @click="submitFiles">test</v-btn>
</div>
</template>

<script>
import axios from 'axios'
export default {
data() {
    return {
      files: null,
    }
},
methods: {
    submitFiles(){
        let formData = new FormData()

        if(this.files){

            for( let file in this.files){
                formData.append("cave", file)
            }

            console.log(formData.getAll("cave"))
            console.log(this.files)
            axios.post('http://localhost:8000/test', 
                        {
                            files: formData,
                        }, 
                        { 
                            headers: { 
                                'Content-Type': 'multipart/form-data'
                            } 
                        }).then( response => {
                            console.log('Success!')
                            console.log({response})
                        }).catch(error => {
                            console.log({error})
                        })
        }
        else {
            console.log('there are no files.')
        }
    }
},
}
</script>

<style>

</style>