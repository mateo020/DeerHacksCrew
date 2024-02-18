
const PORT = 8000;
const API_KEY = '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';
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.post('/interpreter', async (req, res) => {
    console.log(req.query);
    const overpassOptions = {
        method: "POST",
        body: "data=" + encodeURIComponent(`[out:json];
(
  node["amenity"="university"](area:Canada);
  way["amenity"="university"](area:Canada);
  relation["amenity"="university"](area:Canada);
);
out body;
>;
out skel qt;`)//${res.query}
    };
    var overpassResult = await fetch(
        "https://overpass-api.de/api/interpreter", overpassOptions
    ).then(
        (data) => data.json()
    )
    console.log(JSON.stringify(overpassResult, null, 2))
});

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
        console.log("(SS) Attempting to fetch data from OpenAI");
        console.log("(SS) CS input: " + req.body.message + " CS input end");
        const OpenAIResponse = await fetch("https://api.openai.com/v1/chat/completions", options);
        console.log("(SS) OpenAIResponse: " + OpenAIResponse);
        const OpenAIData = await OpenAIResponse.json();
        console.log("(SS) OpenAIData: " + OpenAIData);
        res.send(OpenAIData);
    } catch (error) {
        console.error(error)
    }
});

app.listen(PORT, () => {
    console.log("running on port " + PORT);
});
