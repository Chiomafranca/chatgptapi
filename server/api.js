const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const openRouter = axios.create({
  baseURL: 'https://openrouter.ai/api/v1', // OpenRouter base URL
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

module.exports = openRouter;
