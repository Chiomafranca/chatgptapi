const express = require('express');
const cors = require('cors');
const generate = require('./generate');  // Assuming you have the correct generate function

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hello from our API");
});

app.post('/generate', async (req, res) => {
    const query = req.body.query;
    try {
        const sqlQuery = await generate(query);  
        res.json({ response: sqlQuery });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating SQL query');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
