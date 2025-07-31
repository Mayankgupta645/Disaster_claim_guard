require('dotenv').config();
const fs = require('fs');
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { env } = require('process');

const genAI = new GoogleGenerativeAI('AIzaSyAGdATkubbW6_Dj1qSAdKO-9F3zG3E6lNE');


const filePath = path.join(__dirname, "sample_policy.txt");
const data = fs.readFileSync(filePath, "utf8");

async function askGemini(userQuery) {
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
You are a disaster claim assistant. Use the policy document below to answer this query.

Policy:
${documentText}

Query:
${userQuery}

Return the result in structured JSON like this:
{
  "decision": "approved" | "rejected",
  "amount": "₹50000",
  "justification": "Clause X of the policy allows flood-related compensation for deceased family members."
}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    console.error("Failed to parse Gemini response:", err);
    return { raw: text };
  }
}

module.exports = askGemini;
