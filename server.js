const express = require('express');
const axios = require('axios');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/weather', async(req, res)=> {
    const {city} = req.query;

    if(!city){
        return res.status(400).send({error: "City is required"});
    }

    const apiKey = process.env.WEATHERSTACK_API_KEY;
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    try{
        const response = await axios.get(url);
        res.send(response.data);
    }catch(error){
        res.status(500).send({error: "Failed to fetch weather data"});
    }
});

app.listen(PORT,()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});
