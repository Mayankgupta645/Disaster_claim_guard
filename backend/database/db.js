const mongoose= require('mongoose');
require('dotenv').config({ path: __dirname + './../.env' });
const mongodURl=process.env.MONGO_URL;
mongoose.connect(mongodURl);
const db=mongoose.connection;
console.log("Mongo URI:", process.env.url);

db.on('connected',()=>{
    console.log("mongod is connected");
})
db.on('disconnected',()=>{
    console.log("mongod is disconnected");
})

module.exports=db;