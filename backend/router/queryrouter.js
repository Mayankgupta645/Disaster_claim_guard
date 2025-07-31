const express=require('express');
const router=express.Router();
const  user=require('../models/userschema');
const askGemini=require('./../../llm/llm');



router.post('/query',async(req,res)=>{
    try{

        const {username ,age, problem ,area, country, phoneNo } = req.body;
        const person =  new user({
            username,
            age,
            problem,
            area,
            country,
            phoneNo,
           
            


        });
        const response=await person.save();
        const aiRawResponse = await askGemini(problem);
    
    let aiResponse;
    try {
      aiResponse = JSON.parse(aiRawResponse); 
    } catch (parseError) {
      console.warn("Failed to parse AI response. Returning raw text.");
      aiResponse = { raw: aiRawResponse };
    }

   
    res.status(201).json({
      savedUser: response,
      aiResult: aiRawResponse
    });

  } catch (err) {
    console.error("Error in /query route:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;