const PORT = 8000;
const API_KEY = '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';
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: req.body.message
            }],
            max_tokens: 100,
        })
    }
    try {
        console.log("Attempting to fetch response from openai");
        const APIResponse = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await APIResponse.json();
        res.send(data);
    } catch (error) {
        console.error(error)
    }
});
app.listen(PORT, () => {
    console.log("running on port " + PORT);
});

