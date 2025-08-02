const mongoose= require('mongoose');
require('dotenv').config();
const mongodURl=process.env.url

/
mongoose.connect(mongodURl);
const db=mongoose.connection;
db.on('connected',()=>{
    console.log("mongod is connected");
})
db.on('disconnected',()=>{
    console.log("mongod is disconnected");
})

module.exports=db;