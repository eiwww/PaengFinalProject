<template>
<div>
      <v-col>
<formfill/>
      </v-col>
    <v-col>
        <form-upload/>
    </v-col>
</div>
 
</template>

<script>
import formUpload from '~/layouts/upload/form-upload.vue'
import Formfill from '~/layouts/upload/formfill.vue'
export default {
      layout: 'default',
  components: {formUpload, Formfill},
}
</script>
<style scoped>

</style>