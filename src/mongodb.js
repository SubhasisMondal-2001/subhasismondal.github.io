const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/LoginSign")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String, 
        required:true
    }

})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

const contactUsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subject:{
        type:String, 
        required:true
    }
    
})

const ContactUs=new mongoose.model('ContactUs',contactUsSchema)

module.exports=LogInCollection
module.exports=ContactUs