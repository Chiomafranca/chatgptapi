const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const generate = async (queryDescription) => {
    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: `Convert the following description into a SQL query:\n\n${queryDescription}` }
            ],
            max_tokens: 100,
            temperature: 0,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating SQL query:', error.message);
        throw error;
    }
};

module.exports = generate;
