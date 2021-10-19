<template>
  <div>
    <v-card class="mx-auto" max-width="500" color="white lighten-5">
     
      <v-row>
        <v-col>


          <v-card-text>
            <v-row>
              <v-col>
                <h3>ຊື່</h3>
                <v-text-field
                v-model="show.Name"
                  label= "name"
                  single-line
                  solo
                  color="black"
                  hint="charecter and number"
                ></v-text-field>
              </v-col>
              <v-col>
                <h3>ນາມສະກຸນ</h3>
                <v-text-field
                  label="ນາມສະກຸນ"
                  single-line
                  solo
                  color="black"
                  hint="charecter and number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h3 class="text-center">ເພດ</h3>
                <v-radio-group v-model="row" row>
                  <v-radio label="ຍິງ" value="radio-1" class="ml-5"></v-radio>
                  <v-radio label="ຊາຍ" value="radio-2" class="ml-5"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col>
    
                <h3>ສະຖາບັນ</h3>
                <v-text-field
                  label="ສະຖາບັນ"
                  single-line
                  solo
                  color="black"
                  hint="charecter and number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-col>
   <h3 class="text-left mt-1">ປະເທດ</h3>
            <v-autocomplete
              ref="country"
              v-model="country"
              :rules="[() => !!country || 'This field is required']"
              :items="countries"
              label="ປະເທດ"
              placeholder="ເລືອກ..."
              required
              solo
            ></v-autocomplete>
              </v-col>
    
            <h3>E-mail</h3>
            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <v-text-field
                v-model="email"
                :error-messages="errors"
                label="E-mail"
                required
              ></v-text-field>
            </validation-provider>
            <v-text-field
              label="E-mail"
              single-line
              solo
              color="black"
              type="email"
              hint="charecter and number"
            ></v-text-field>
           

            <div class="mt-2" color>
              <v-btn color="cyan darken-4" dark block>sign up</v-btn>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {

  data() {
    return {
      show1: false,
      show2: false,
      step: 1,
        user: {
        email: "",
        role: "",
        Name: "",
        Surname: ""
      },
      show: {},
      items: [
        {
          text: "sign in ",
          disabled: false,
          href: "/login"
        }
      ],
      countries: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua &amp; Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia &amp; Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Cape Verde",
        "Cayman Islands",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Cote D Ivoire",
        "Croatia",
        "Cruise Ship",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Polynesia",
        "French West Indies",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kuwait",
        "Kyrgyz Republic",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nepal",
        "Netherlands",
        "Netherlands Antilles",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Pakistan",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Pierre &amp; Miquelon",
        "Samoa",
        "San Marino",
        "Satellite",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "South Africa",
        "South Korea",
        "Spain",
        "Sri Lanka",
        "St Kitts &amp; Nevis",
        "St Lucia",
        "St Vincent",
        "St. Lucia",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        `Timor L'Este`,
        "Togo",
        "Tonga",
        "Trinidad &amp; Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks &amp; Caicos",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Venezuela",
        "Vietnam",
        "Virgin Islands (US)",
        "Yemen",
        "Zambia",
        "Zimbabwe"
      ],
      country: null
    };
  },
  mounted() {
      this.getName();
  },
  methods: {
       async getName() {
      try {
        const token = localStorage.getItem("access-token");
        console.log(token);

        await axios({
          method: "get", //you can set what request you want to be
          url: "http://localhost:5000/signup/us/",
          headers: {
            authorization: "Bearer " + token
          }
        }).then(res => {
          //2. usrole_id 3.user_id
          console.log(res.data);
          this.user.email = res.data.user[0];
          this.user.role = res.data.user[1];
          this.user.Name = res.data.user[3];
          this.user.Surname = res.data.user[4];
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
     currentTitle() {
      switch (this.step) {
        case 1:
          return "ລົງທະບຽນ";
        case 2:
          return "ລົງຊື່ເຂົ້າໃຊ້ລະບົບ";
        default:
          return "Acount create";
      }
    }
  }
};
</script>

<style></style>
