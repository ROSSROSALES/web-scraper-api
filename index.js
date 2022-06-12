const PORT = process.env.port || 8000
const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const app = express()

const config = {
    headers:{
        'X-Originating-IP': '127.0.0.1'
        'X-Forwarded-For': '127.0.0.1'
        'X-Forwarded': '127.0.0.1'
        'Forwarded-For': '127.0.0.1'
        'X-Remote-IP': '127.0.0.1'
        'X-Remote-Addr': '127.0.0.1'
        'X-ProxyUser-Ip': '127.0.0.1'
        'X-Original-URL': '127.0.0.1'
        'Client-IP': '127.0.0.1'
        'True-Client-IP': '127.0.0.1'
        'Cluster-Client-IP': '127.0.0.1'
        'X-ProxyUser-Ip': '127.0.0.1'
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
        'accept-language': 'en-US,en;q=0.9'
    }
  };

const data = []

app.get('/', (req,res) => {
    res.json('Welcome to my API')
})

app.get('/data', async (req,res) => {
    axios.get('https://www.gunviolencearchive.org/reports/mass-shooting', config)
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
        }).catch(err => {
            console.log(err.code);
            console.log(err.message);
            console.log(err.stack);
        })
        
});

app.listen(PORT, () => {
    console.log('server is running on PORT ' + PORT)
});


