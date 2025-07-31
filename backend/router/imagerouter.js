const express = require('express');
const router = express.Router();
const multer = require('multer');
const os = require('os');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Tesseract = require('tesseract.js');
const user = require('../models/userschema');
require('dotenv').config();
const {askAi}=require('./../../llm/llm');


cloudinary.config({
  cloud_name: 'dotq58zgw',
  api_key: process.env. api_key,
  api_secret:process.env.secretkey
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

const upload = multer({ storage });


router.post('/uploads', upload.single('photo'), async (req, res) => {
  try {
    const path = req.file?.path;
    const { username, age, problem, area, country, phoneNo } = req.body;

    if (!path) {
      return res.status(400).json({ error: 'Image upload failed' });
    }


    const { data: { text } } = await Tesseract.recognize(path, 'eng');

    const person = new user({
      username,
      age,
      problem,
      area,
      country,
      phoneNo,
      imageUrl: path,
      extractedText: text.trim() 
    });

    const response = await person.save();
    console.log("Saved to DB:", response);
    res.status(201).json({ message: "Upload & OCR complete", data: response });

  } catch (err) {
    console.error("Upload/OCR error:", err);
    res.status(500).json({ error: "Internal server error", details: err });
  }
});

module.exports = router;
