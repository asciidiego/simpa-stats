const express = require('express');
const https = require('https');
const cheerio = require('cheerio');
const app = express();
const port = 3000;
const obtener = https.get;

app.use(express.static('public'))

// TODO: Meter cache para no estar molestando a
// faceitanalyser tanto...
app.get('/', (req, res) => {
    obtener('https://faceitanalyser.com/stats/riicky96', (respuestaDeLaWeb) => {
respuestaDeLaWeb.setEncoding('utf8');
  let rawData = '';
  respuestaDeLaWeb.on('data', (chunk) => { rawData += chunk; });
  respuestaDeLaWeb.on('end', () => {
    try {
    //   console.log(rawData);
      const $ = cheerio.load(rawData);
      const infoDelManco = $(".stats_totals_block_item_value").contents().filter(i => i === 5).text()
      res.send(`
      <style>
      body {
          font-family: sans-serif
      }
      </style>
      <html>
      <body>
      <h1><strong>Simpa tracker</strong></h1>
      <h2>Qué es esto? 🧐</h2>
      <p>Ricardo es un puto manco que muere mucho, y yo, <a href="https://www.twitch.tv/dieguitohacker"><code>dieguitohacker</code></a> sé medio programar. Así que entre sus muertes y mi código podemos ver qué tan malo es en tiempo real 🥳.</p>
      
      <h4><code>riicky96</code> ha muerto ${infoDelManco} veces (según <i>faceit</i>) en el CSGO</h4>
      
      <p>Eso sí, pásate por su <a href="https://www.twitch.tv/riicky96">streaming</a>! 💸</p>

      <img src="simpa.png" alt="El manco es mi dueño" width="500" height="600">
      </body>
      </html>`);
    } catch (error) {
      console.error(error.message);
    }
  });
});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})