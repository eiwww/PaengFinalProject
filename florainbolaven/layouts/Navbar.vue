<template>
  <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
 
      <v-list>
         <v-list-item>
          <v-list-item-avatar class="mx-15" height="15vh" width="15vh">
          <v-img :src="require('../assets/image/fof.png')"></v-img>
          </v-list-item-avatar>
        </v-list-item>
         <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-p text-center">
ລະບົບຈັດການຂໍ້ມູນພືດໃນເຂດ<br>ພູພຽງບໍລະເວນ </v-list-item-title>
       
          </v-list-item-content>

        </v-list-item>
        <v-divider></v-divider>
      </v-list>
          <v-list
          nav
          dense
        >
          <v-list-item to='/'>
            <v-list-item-icon>
              <v-icon color="teal">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ໜ້າຫຼັກ</v-list-item-title>
          </v-list-item>
<v-list-group
:value="true"
 prepend-icon="mdi-playlist-plus"

>

  <template v-slot:activator>
          <v-list-item-title>ຈັດການຂໍ້ມູນ</v-list-item-title>
        </template>
        
          <v-list-item
          v-for="(item, i) in flora"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon color="teal">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>     
</v-list-group>

          <v-list-item to="/upload"  >
            <v-list-item-icon>
              <v-icon color="blue">mdi-upload-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ອັບໂຫຼດຂໍ້ມູນ</v-list-item-title>
          </v-list-item>
            <v-list-item to="/upload"  >
            <v-list-item-icon>
              <v-icon color="blue">mdi-upload-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ອັບໂຫຼດຂໍ້ມູນ</v-list-item-title>
          </v-list-item>
           
          <v-list-item  link @click="get_status_" >
            <v-list-item-icon>
              <v-icon color="red">mdi-file-chart</v-icon>
            </v-list-item-icon>
            <v-list-item-title >ລາຍງານ</v-list-item-title>
          </v-list-item>
          </v-list>
          <v-list-group
:value="true"
 prepend-icon="mdi-playlist-plus"

>

  <template v-slot:activator>
          <v-list-item-title>ລາຍງານ</v-list-item-title>
        </template>
        
          <v-list-item
          v-for="(item, i) in Report"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon color="teal">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>     
</v-list-group>
       
   
    </v-navigation-drawer>
    
    
</template>


<script>

export default {
 data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      get_status :false,
      items: [
        {
          icon: 'mdi-upload',
          title: 'ອັບໂຫຼດຂໍ້ມູນ',
          to: '/search'
        },
        {
          icon: 'mdi-file-chart',
          title: 'ລາຍງານ',
          to: '/pic'
        },
      ],
      admins: [
['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
              Report: [
        {
          title: 'ນັກຄົ້ນຄວ້າ',
          to: '/showdata'
        },

      ],
        flora: [
        {
          title: 'ນັກຄົ້ນຄວ້າ',
          to: '/showdata'
        },
          {
          title: 'ຜູ້ໃຊ້',
          to: '/showdata'
        },
        {
          title: 'ພືດ',
          to: '/floramanage'
        },
        //  {
        //   title: 'ພືດ',
        //   to: '/floramanage'
        // },
           {
          title: 'ລາຍລະອຽດພືດ',
          to: '/flora/detailflora'
        },
        {
          title: 'ສະຖານທີ່',
          to: '/location'
        },
         {
          title: 'ປຶ້ມຄົ້ນຄວ້າ',
          to: '/hahaha'
        }
      ],
    }
 },
 methods: {
   get_status_(){
     this.get_status==true;
     alert(this.get_status)
   }
 },
}
</script>

<style>

</style>