const PORT = process.env.PORT || 8000;
const HOST = '0.0.0.0';
const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const app = express()



app.get('/', (req,res) => {
    res.json('Welcome to my API')
})

app.get('/data', (req,res) => {
    axios.get('https://www.gunviolencearchive.org/reports/mass-shooting', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36' }  })
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const info = {};

            console.log($('tr').count)
            $("table > tbody > tr").each( (index, element) => {
                const date = $(element)  
                    .children('td')
                    .eq(1)
                    .text();
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
            });
            res.json(info);

        }).catch(err => {
            console.log(err.code);
            console.log(err.message);
            console.log(err.stack);
    })
        
});

app.listen(PORT, HOST, () => {
    console.log('server is running on PORT ' + PORT)
});