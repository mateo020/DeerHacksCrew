const PORT = 8000;
const API_KEY = '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';
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
console.log("Running");
app.post('/completions', async (request, response) => {
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
                content: "what is 2 + 2?"
            }],
            max_tokens: 100
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        response.send(data);
    } catch (error) {
        console.error(error);
    }
});
app.listen(PORT, () => {
    console.log("PORT: " + PORT);
});

