var pool = require('../db.config')

//create family object

var Family = function(family){
    this.Family_id = family.Family_id;
    this.Family_Name = family.Family_Name
};

Family.create = function(newFam, result){
    pool.query("insert into family set ?", newFam, function(err,res){
        if(err){
            console.log("error:" ,err);
            result(err,null)
        }else{
            console.log(res.InsertId);
            result(nul,res.InsertId);
        }
    })
}

Family.findById = function(Family_id, result){
    pool.query("select * from family where Family_id=?", Family_id, function(err,res){
        if(err){
            console.log("error:",err);
            result(err,null)
        }else{
            result(null,res)
        }
    })
}

Family.findAll = function(result){
    pool.query("select * from family",function(err,res){
        if(err){
            console.log("error:",err);
        }else{
            console.log('Family:' ,res);
            result(null,res)
        }
    })

    // pool.query('update image set image_Name = ? where Image_id = ? ', [image_Name,Image_id]).then((data)=>{
    //     res.status(200).json(data);
    //            }).catch((err)=>{
    //             res.status(500).json(err);
    //            });
                 
    // const sqlQuery = 'select * from family';
    // const rows =  pool.query(sqlQuery);
    // result(null,rows)
}

Family.update = function(id,family,result){
    pool.query("update family set Family_Name=? where Family_id = ?",[family.Family_Name], function(err, res){
        if(err){
            console.log("error:",err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

Family.delete = function(Family_id,result){
    pool.query("delete from family where Family_id=?",[Family_id], function(err,res){
        if(err){
            console.log("error:", err);
        }else{
            result(null,res);
        }
    })
}

module.exports = Family;


