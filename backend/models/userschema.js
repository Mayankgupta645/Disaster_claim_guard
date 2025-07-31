const mongoose= require('mongoose');

const dataschema= new mongoose.Schema({
    username: {
    type: String,
    required: false
    
  },
  age: {
    type: Number,
    required: false
    
  },
  problem: {
    type: String,
    required: false
   
  },
  area: {
    type: String,
    required: false
    
  },
  country: {
    type: String,

  required: false
    
  },
  phoneNo: {
    type: String,
    required: false
    
  },
  imageUrl: {
    type: String, 
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    
  },
  extractedText:{
    type: String,
 

  } 

});
const user=mongoose.model('user',dataschema);
module.exports=user;