<template>
<v-container>
 <v-row class="mt-5 text-center">
      <v-col cols="12">
        <v-carousel hide-delimiters height="400">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    
        </v-row>
 <v-row class="mt-15">
      <thisproject />
    </v-row>
     <v-row class="mt-15">
    </v-row>
</v-container>
</template>

<script>
import Graph from '~/layouts/flora/graph.vue'
import thisproject from '~/layouts/thisproject.vue'
export default {
  components: { thisproject, Graph },
  layout: 'noneuser',
data() {
    return {
          items: [
        {
          src: require("../../assets/image/flora1.jpg")
        },
        {
          src: require("../../assets/image/flora2.jpg")
        },
                {
          src: require("../../assets/image/pic3.jpg")
        },
        {
          src: require("../../assets/image/pic2.jpg")
        },
        {
          src: require("../../assets/image/pic4.jpg")
        }

      ]
    }
},
}


</script>

<style>

</style>