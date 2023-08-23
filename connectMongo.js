const mongoose= require('mongoose');


async function connectMongo(){
     return mongoose.connect('mongodb://127.0.0.1:27017/short-url-generator')
     .then(()=>{ console.log("connection successful...")})
     .catch((err)=>{
        console.log("connection failed...",err)
     });
}


module.exports= connectMongo;