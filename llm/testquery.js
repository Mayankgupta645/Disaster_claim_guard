
const gemini = require('./llm');

gemini("My brother died because of a flood")
  .then((result) => {
    try {
      const parsed = JSON.parse(result);
      console.log(" Structured Response:", parsed);
    } catch (err) {
      console.error(" Failed to parse AI response:", result);
    }
  })
  .catch(console.error);
