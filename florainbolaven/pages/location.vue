<template>
 <v-card
     flat
    tile
  >
    <v-card-title class="text-h6 text-center font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
    
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <province/>
    
      </v-window-item>

      <v-window-item :value="2">
       <district/>
      </v-window-item>

      <v-window-item :value="3">
  <ban/>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :disabled="step === 1"
        text
        @click="step--"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="step === 3"
        color="blue"
        depressed
        @click="step++"
      >
        <v-icon>
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Ban from '~/layouts/location/ban.vue';
import District from '~/layouts/location/district.vue';
import Province from '~/layouts/location/province.vue';

export default {
      layout: 'default',

  components: {  Ban, District,Province },

  data: () => ({
      step: 1,
    }),

    computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return 'ຈັດການຂໍ້ມູນແຂວງ'
          case 2: return 'ຈັດການຂໍ້ມູນເມືອງ'
          default: return 'ຈັດການຂໍ້ມູນບ້ານ'
        }
      },
    },
  
};
</script>

<style></style>
