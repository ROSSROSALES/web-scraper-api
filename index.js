const PORT = process.env.PORT || 8000
const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const app = express()

const data = []

app.get('/', (req,res) => {
    res.json('Welcome to my API')
})

app.get('/data', async (req,res) => {
    axios.get('https://www.gunviolencearchive.org/reports/mass-shooting')
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
            const info = {}

            
            $('tr').each( (index, element) => {
                const date = $(element)  
                    .children('td')
                    .eq(1)
                    .text() ;
                    info[index] = { date };
                const state = $(element)
                    .children('td')
                    .eq(2)
                    .text();

                const city = $(element)
                    .children('td')
                    .eq(3)
                    .text();

                const killed = $(element)
                    .children('td')
                    .eq(5)
                    .text();
                const injured = $(element)
                    .children('td')
                    .eq(6)
                    .text();
                info[index] = { date, state, city, killed, injured };
                data.push(info)
            })
            res.json(data);
        })//.catch(err => console.log(err))
        
});

app.listen(PORT, () => {
    console.log('server is running on PORT ' + PORT)
});


