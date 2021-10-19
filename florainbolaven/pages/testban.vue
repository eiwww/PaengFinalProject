<template>
  <div id="content">
    <v-btn color="success" @click="csvExport(csvData)">Export to CSV </v-btn>

    <table id="example" class="display" style="width:100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Age</th>
          <th>Start date</th>
          <th>Salary</th>
          <!-- <th>(v-for="th in ['name', 'username/email', 'address', 'phone', 'website', 'company']") {{th}}
    <tr>(v-for="userData in users")
      <td> {{userData.name}}
      <td>
        small {{userData.username}}
          br
          | {{userData.email}}
      <td>
        dl.dl(v-for="(val,key) in userData.address")
          <dt> {{key}}
          dd : {{val}}
      <td> {{userData.phone}}
      <td>
        a(href="#") {{userData.website}}
      <td>
        dl.dl(v-for="(val,key) in userData.company")
          dt {{key}}
          dd : {{val}}
        </tr> -->
        </tr>
      </thead>
      <tbody>
        <h1>{{ heading }}</h1>
        <tr>
          <td>Gavin Joyce</td>
          <td>Developer</td>
          <td>Edinburgh</td>
          <td>42</td>
          <td>2010/12/22</td>
          <td>$92,575</td>
        </tr>
        <tr>
          <td>Jennifer Chang</td>
          <td>Regional Director</td>
          <td>Singapore</td>
          <td>28</td>
          <td>2010/11/14</td>
          <td>$357,650</td>
        </tr>
        <tr>
          <td>Brenden Wagner</td>
          <td>Software Engineer</td>
          <td>San Francisco</td>
          <td>28</td>
          <td>2011/06/07</td>
          <td>$206,850</td>
        </tr>
        <tr>
          <td>Fiona Green</td>
          <td>Chief Operating Officer (COO)</td>
          <td>San Francisco</td>
          <td>48</td>
          <td>2010/03/11</td>
          <td>$850,000</td>
        </tr>
        <tr>
          <td>Shou Itou</td>
          <td>Regional Marketing</td>
          <td>Tokyo</td>
          <td>20</td>
          <td>2011/08/14</td>
          <td>$163,000</td>
        </tr>
        <tr>
          <td>Michelle House</td>
          <td>Integration Specialist</td>
          <td>Sydney</td>
          <td>37</td>
          <td>2011/06/02</td>
          <td>$95,400</td>
        </tr>
        <tr>
          <td>Suki Burks</td>
          <td>Developer</td>
          <td>London</td>
          <td>53</td>
          <td>2009/10/22</td>
          <td>$114,500</td>
        </tr>
        <tr>
          <td>Prescott Bartlett</td>
          <td>Technical Author</td>
          <td>London</td>
          <td>27</td>
          <td>2011/05/07</td>
          <td>$145,000</td>
        </tr>
        <tr>
          <td>Gavin Cortez</td>
          <td>Team Leader</td>
          <td>San Francisco</td>
          <td>22</td>
          <td>2008/10/26</td>
          <td>$235,500</td>
        </tr>
        <tr>
          <td>Martena Mccray</td>
          <td>Post-Sales support</td>
          <td>Edinburgh</td>
          <td>46</td>
          <td>2011/03/09</td>
          <td>$324,050</td>
        </tr>
        <tr>
          <td>Unity Butler</td>
          <td>Marketing Designer</td>
          <td>San Francisco</td>
          <td>47</td>
          <td>2009/12/09</td>
          <td>$85,675</td>
        </tr>
        <tr>
          <td>Howard Hatfield</td>
          <td>Office Manager</td>
          <td>San Francisco</td>
          <td>51</td>
          <td>2008/12/16</td>
          <td>$164,500</td>
        </tr>
        <tr>
          <td>Hope Fuentes</td>
          <td>Secretary</td>
          <td>San Francisco</td>
          <td>41</td>
          <td>2010/02/12</td>
          <td>$109,850</td>
        </tr>
      </tbody>
    </table>
    <br />
    <v-btn color="teal" dark @click="generatePDF">PDF</v-btn>
    <r-row>
      <v-col>
        <li v-for="item in items" :key="item.id">
          {{ item.title }} - {{ item.body }}
        </li>
      </v-col>
    </r-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: [],
      heading: "hii",
      items: [
        { title: "Item 1", body: "I am item 1 body text" },
        { title: "Item 2", body: "I am item 2 body text" },
        { title: "Item 3", body: "I am item 3 body text" },
        { title: "Item 4", body: "I am item 4 body text" }
      ],
      margins: {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
      }
    };
  },
  computed:{
csvData() {  
      return this.users.map(item => ({
        ...item,
        Family_id: 'адрес', //item.address.city,
        Family_Name: 'компания'//item.company.name
      }));
    }
  },
mounted() {
   fetch("http://localhost:5000/family")
 .then(resp => resp.json())
 .then(json => (this.users = json));

},

  methods: {
    csvExport(arrData) {
      // ...your code
    //   let csvContent = "data:text/csv;charset=utf-8,";
    //   csvContent += [Object.keys(arrData[0]).join(";"),
    //   ...arrData.map(item => Object.values(item).join(";"))
    //   ]
    //   .join("\n")
    //  .replace(/(^\[)|(\]$)/gm, "");
    //    const data = encodeURI(csvContent);
    //        const link = document.createElement("a");
    //      link.setAttribute("href", data);
    //   link.setAttribute("download", "export.csv");
    //   link.click();    
      var csvContent = "data:text/csv;charset=utf-8,";
      csvContent += this.users.map(function(d){
        console.log(d);
        return JSON.stringify(d);
      })
      .join('\n') 
      .replace(/(^\{)|(\}$)/mg, '');
      const data = encodeURI(csvContent);
           const link = document.createElement("a");
         link.setAttribute("href", data);
      link.setAttribute("download", "export.csv");
      link.click();
    }
  }
};
</script>

<style>

</style>
