const mongoose=require("mongoose");
const passport = require("passport");
const User=mongoose.model("User")
const _ =require("lodash")
module.exports.home=(req,res,next)=>{
    res.send('respond with a resource');
}

module.exports.register=(req,res,next)=>{
    console.log("some",req)
    var user=new User();

    user.firstname=req.body.firstname;
    user.lastname=req.body.lastname;
    user.email=req.body.email;
    user.password=req.body.password;
    user.role=req.body.role;
    user.address=req.body.address
   

    user.save((err,doc)=>{ 

        if(!err){
            res.send(doc)
        }
       
            
        
        
     })

}



module.exports.authenticate=(req,res,next)=>{
    //call for passport authnetiacte
    passport.authenticate('local',(err,user,info)=>{
        //error from passport middleware
        if(err){
            return res.status(400).json(err);
        }
        //registerd user
        else if(user){ return res.status(200).json({"token" :user.generateJwt() })
        }
        //unknown user
        else
            return res.status(404).json(info)
    })(req,res);
}

module.exports.userprofile=(req,res,next) =>{
    console.log("im here")
    User.findOne({_id:req._id},(err,user)=>{
        if(!user){
            return res.send(404).json({status:false,message:"user not found"})
        }   
        else{
            return res.status(200).json({status:true,user:_.pick(user,['firstname','lastname','email','address','role'])})
        }
    })
}




module.exports.totalData=(req,res,next)=>{
    User.find((err,doc)=>{
        if(!err){
            res.send(doc);
        }
    })
}