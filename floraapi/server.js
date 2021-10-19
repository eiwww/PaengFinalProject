const express = require("express");
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const cors = require('cors')
//const fileupload = require('express-fileupload')
var path = require('path');
var createError = require('http-errors');
const maria = require('mariadb')


//var upload = multer({ dest: './public/test2' })


app.use(express.json());
//template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
//app.use(fileupload()); 
maria.Promise = global.Promise;
app.use(express.static(__dirname));
app.use('/public', express.static('public'));
//app.use(express.static('public/flora_image/'));
//app.use(express.static(path.join(__dirname, '../florainbolaven/assets')));
 

dotenv.config({path: '.env-local'});
  
const PORT = process.env.PORT || 5000;

//middleware
//app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//
// app.all('/', function (req, res, next) {
//   console.log('Accessing the secret section ...')
//   res.myobj = 1; 
//   next() //
// })


//routes
app.get('/',(req,res)=>{
//   // res.status(200).send("this is not why you're here")
//  // res.status(200).json({name:'monethip'});
 //console.log(res.myobj);
res.render('index')
})

//1.family
const userRouter= require('./routes/family');
app.use('/family',userRouter);
//2.collector
const colloctorRouter= require('./routes/collector');
app.use('/collector',colloctorRouter);
//3.province
const provinceRouter = require('./routes/province')
app.use('/province',provinceRouter)
//4.district
const districtRouter = require('./routes/district')
app.use('/district',districtRouter)
//5.genus
const genusRouter = require('./routes/genus')
app.use('/genus',genusRouter)
//6.village
const villageRouter = require('./routes/village')
app.use('/village',villageRouter)
//7.species
const speciesRouter = require('./routes/species')
app.use('/species',speciesRouter)
//8. regiator
const registuserRouter = require('./routes/register')
app.use('/signup',registuserRouter)
//9. role
const roleRouter = require('./routes/role')
app.use('/role',roleRouter)
//10. pic
const pic = require('./routes/pic')
app.use('/pic',pic)
//11. flora
const flora= require('./routes/flora')
app.use('/flora',flora)
//12. finding
const finding = require('./routes/finding');
app.use('/finding',finding)
//13. finding
const loginRouter = require('./routes/login');
app.use('/login/',loginRouter)
//13. researcher
const researcher = require('./routes/researcher');
app.use('/add',researcher)
//13. researcher
const picture = require('./routes/picture');
app.use('/picture',picture)
//13. researcher
const uploadRouter = require('./routes/upload');
app.use('/upload',uploadRouter)
//13. paper
const paperRouter = require('./routes/paper');
app.use('/paper',paperRouter)
//13. paper
const countRouter = require('./routes/count');
app.use('/count',countRouter)
//2.collectordetail
const colloctorDertailRouter= require('./routes/collector_detail');
app.use('/collectordetail',colloctorDertailRouter)


//test new Family
const newfamilyRouter = require('./routes/family.route')
//using as middleware
app.use('/api/newfamily',newfamilyRouter)




const testRouter =require('./routes/test');
app.use('/test',testRouter)


const testPic =require('./routes/testpic');
app.use('/testpic',testPic)




const paengRouter = require('./api/users/user.router')
app.use('/api/user',paengRouter)


//start listening
app.listen(PORT, () =>{
    console.log(`Listening for requests on port ${PORT}`);
})


