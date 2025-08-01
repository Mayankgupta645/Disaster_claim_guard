const express = require('express');
const router = express.Router();
const user = require('../models/userschema');
const askGemini = require('../../llm/llm');

router.post('/query', async (req, res) => {
  try {
    const { username, age, problem, area, country, phoneNo } = req.body;

    const person = new user({
      username,
      age,
      problem,
      area,
      country,
      phoneNo,
    });

    const savedUser = await person.save();
    const aiResponse = await askGemini(problem);  // ✅ no need to parse again

    res.status(201).json({
      savedUser,
      aiResult: aiResponse,
    });

  } catch (err) {
    console.error("Error in /query route:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
