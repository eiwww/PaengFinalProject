<template>
  <div class="mt-10">
    <v-card class="mx-auto" max-width="500" color="white lighten-5">
      <v-row>
        <v-col>
          <h2
            class="
                            text-center
                            display-5
                            black--text
                            text--accent-3
                            mt-3
                          "
          >
            {{ currentTitle }}
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-text>
            <v-row>
              <v-col>
                <h3>ຊື່</h3>
                <v-text-field
                  v-model="Name"
                  label="ຊື່"
                  single-line
                  solo
                  color="black"
                  hint="charecter and number"
                ></v-text-field>
              </v-col>
              <v-col>
                <h3>ນາມສະກຸນ</h3>
                <v-text-field
                  v-model="surname"
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
                <v-radio-group v-model="gender" row>
                  <v-radio label="ຍິງ" value="female" class="ml-5"></v-radio>
                  <v-radio label="ຊາຍ" value="male" class="ml-5"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col>
                <h3>ສະຖາບັນ</h3>
                <v-text-field
                  v-model="institution"
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
            <!-- <validation-provider
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
            </validation-provider> -->
            <v-text-field
              label="E-mail"
              single-line
              solo
              color="black"
              type="email"
              v-model="email"
              hint="charecter and number"
            ></v-text-field>
            <v-row>
              <v-col>
                <h3>ລະຫັດຜ່ານ</h3>
                <v-text-field
                  v-model="password"
                  label="ລະຫັດຜ່ານ"
                  single-line
                  solo
                  color="black"
                  :type="show1 ? 'text' : 'password'"
                  persistent-hint
                  hint="At least 8 characters"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
              <v-col>
                <h3 class="text-left mt-1">ຢືນຢັນລະຫັດຜ່ານ</h3>
                <v-text-field
                  label="ຢືນຢັນ"
                  single-line
                  solo
                  color="black"
                  :type="show2 ? 'text' : 'password'"
                  hint="At least 8 characters"
                  persistent-hint
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show2 = !show2"
                ></v-text-field>
              </v-col>
            </v-row>

            <div class="mt-2" color>
              <v-btn color="cyan darken-4" dark block @click="saveUser"
                >Next</v-btn
              >
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  layout: "none",

  data() {
    return {
      show1: false,
      show2: false,

      step: 1,
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
      country: null,

      gender: null,

      Name: "",
      surname: "",
      institution: "",
      password: ""
    };
  },

  methods: {
    async saveUser() {
      try {
        await axios
          .post(`http://localhost:5000/signup`, {
            User_Name: this.Name,
            User_Surname: this.surname,
            Gender: this.gender,
            Institution: this.institution,
            Country: this.country,
            email: this.email,
            password: this.password
          })
          .then(res => {
            console.log(res);
            console.log(this.gender);
            console.log(this.country);
            console.log(this.email);
            console.log(this.password);
            this.$router.push("/login");
          });
      } catch (err) {
        console.log(err);
      }
    }
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
