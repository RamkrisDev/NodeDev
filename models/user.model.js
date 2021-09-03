const mongoose=require("mongoose")
const bcrpty =require("bcryptjs")
const jwt =require("jsonwebtoken")


var userSchema= new mongoose.Schema({

    firstname:{
        type:String,
        required:"firstname can\'t be empty"
    },
    lastname:{
        type:String,
        required:"lastname can\'t be empty"
    },
    email:{
        type:String,
        required:"mail can\'t be empty"
    },
    password:{
        type:String,
        required:"name can\'t be empty"
    },
    role:{
        type:String,
        required:"role can\'t be empty"
    },
    address:{
        type:String,
        required:"address can\'t be empty"
    },
    saltSecret:String

})


//email custom validate
userSchema.path('email').validate((val)=>{
    emailRegEx=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(val);
},'Invalid email');


//event
userSchema.pre('save',function(next){
    bcrpty.genSalt(10,(err,salt)=>{
        bcrpty.hash(this.password,salt,(err,hash)=>{
            this.password=hash;
            this.saltSecret=salt;
            next();
        })
    })
})

//method for verify
userSchema.methods.verifyPassword=function(password){
    return bcrpty.compareSync(password,this.password);
}

userSchema.methods.generateJwt=function(){
    return jwt.sign({_id:this._id},
        "SECRET#123",{
            expiresIn:"2m"
        });
}








module.exports=mongoose.model("User",userSchema);
