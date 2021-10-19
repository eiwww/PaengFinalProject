<template>
  <v-container>
    <div><h2>ລະບົບຈັດການຂໍ້ມູນຄວາມຫຼາກຫຼາຍຂອງພືດໃນເຂດພູພຽງບໍລະເວນຂອງຄະນະ ຄປມ</h2></div>
    <v-row class="mt-5 text-center">
      <v-col cols="9">
        <v-carousel hide-delimiters height="400">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
        <div v-if="$auth.loggedIn">
          {{ $auth.user.username }}
        </div>
      </v-col>
      <v-col cols="3">
        <v-row>
          <!-- <v-col>
            <v-card width="350">
              <v-img
                height="200px"
                :src="require('../../assets/image/flora1.jpg')"
              >
                <v-app-bar flat color="rgba(0, 0, 0, 0)">
                  <v-toolbar-title class="text-h6 white--text pl-0 mt-10">
                    New Species<br />ພືດຊະນິດໃໝ່ໂລກ
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-app-bar>
                <v-card-title class="text-h5"> </v-card-title>

                <v-card-subtitle class="text-right mt-15"> 
                   <v-btn text color="white" to="/testtable">ເພີ່ມເຕີມ</v-btn>
                </v-card-subtitle>
              </v-img> 
            </v-card>
          </v-col> -->
          <v-col>
            <v-card width="350">
              <v-img
                height="200px"
                :src="require('../../assets/image/flora2.jpg')"
              >
                <v-app-bar flat color="rgba(0, 0, 0, 0)">
                  <v-toolbar-title class="text-h6 white--text pl-0 mt-10">
                    <br />
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-app-bar>
                <v-card-title class="text-h5"> </v-card-title>
                <v-card-subtitle class="text-right mt-15">
                  <v-btn text color="white" to="/image">ເພີ່ມເຕີມ</v-btn>
                </v-card-subtitle>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-15">
      <thisproject />
    </v-row>
    <div>
      <h1>your coordinate</h1>
      <GMap
        ref="gMap"
        language="en"
        :cluster="{ options: { styles: clusterStyle } }"
        :center="{ lat: locations[0].lat, lng: locations[0].lng }"
        :options="{ fullscreenControl: false, styles: mapStyle }"
        :zoom="6"
      >
        <GMapMarker
          v-for="location in locations"
          :key="location.id"
          :position="{ lat: location.lat, lng: location.lng }"
          :options="{
            icon:
              location === currentLocation ? pins.selected : pins.notSelected
          }"
          @click="currentLocation = location"
        >
          <GMapInfoWindow :options="{ maxWidth: 200 }">
            <code> lat: {{ location.lat }}, lng: {{ location.lng }} </code>
          </GMapInfoWindow>
        </GMapMarker>
        <GMapCircle :options="circleOptions" />
      </GMap>
    </div>
  </v-container>
</template>

<script>
import thisproject from "~/layouts/thisproject.vue";

export default {
    layout: 'default',

  components: { thisproject },
  data() {
    return {
      currentLocation: {},
      circleOptions: {},
       locations: [
      {
        lat: 44.933076,
        lng: 15.629058
      },
      {
        lat: 45.815,
        lng: "15.9819"
      },
      {
        lat: "45.12",
        lng: "16.21"
      }
    ],
      pins: {
        selected: "data:image/png;base64,iVBORw0KGgo...",
        notSelected: "data:image/png;base64,iVBORw0KGgo..."
      },
      mapStyle: [],
      clusterStyle: [
        {
          url:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
          width: 56,
          height: 56,
          textColor: "#fff"
        }
      ],
      items: [
        {
          src: require("../../assets/image/flora1.jpg")
        },
        {
          src: require("../../assets/image/pic1.jpg")
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
    };
  }
};
</script>

<style></style>

