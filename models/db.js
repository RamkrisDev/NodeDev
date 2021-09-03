const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://ramakrishnan:ramu@web1.deis5.mongodb.net/NodeDB",(err)=>{
    if(!err){
        console.log("connected");
    }
    else{
        console.log("failed");
    }
})

module.exports=mongoose;
require("./user.model")