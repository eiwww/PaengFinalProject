const express = require('express')
const router = express.Router()


//user Regis 
router.post('/register-user', async(req,res)=>{

})

//admin Regis
router.post('/register-admin', async(req,res)=>{
    
})

//super admin regis
router.post('/register-superadmin', async(req,res)=>{
    
})

//user login
router.post('/login-user', async(req,res)=>{
    
})
//admin login 
router.post('/login-admin', async(req,res)=>{
    
})

//super admin regis
router.post('/login-superadmin', async(req,res)=>{
    
})

//profile route
router.get('profile', async(req,res)=>{

})

//user protect route
router.post('/user-protected', async(req,res)=>{
    
})

//admin protect route
router.post('/admin-protected', async(req,res)=>{
    
})
//super admin protect route
router.post('/superadmin-protected', async(req,res)=>{
    
})



module.exports = router;