const express = require("express");
const app = express();


app.get("/", (req, res) => {
    res.send("Express on Vercel");
  });
  
  app.listen(5000, () => {
    console.log("Running on port 5000.");
  });
  

//app.get("/", async function(req, res, next) {
//
//    console.log("Connection good")
//
//    const browser = await puppeteer.launch();
//    const page = await browser.newPage();
//    await page.goto('https://www.gunviolencearchive.org/reports/mass-shooting')
//
//    const data = await page.evaluate(() => {
//        return Array.from(document.querySelectorAll(".odd td")).map(x => x.textContent)
//    })
//
//    res.send(data)
//});

app.listen(5000, () => {
    console.log('running on port 5000');
});

module.exports = app;