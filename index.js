require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyparser = require('body-parser');
const dns = require('dns');
const { url } = require('inspector');

var shorturl = 0 ;
var urlstack=[]; 
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyparser.urlencoded({extended : false}))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;

  // validating the http part alone
  if (!url || !(url.startsWith('http')) || !(url.startsWith('https'))) 
    {
    return res.status(400).send({ error: 'invalid url boom '});
    }

 // validating the hostname 
  dns.lookup(new URL(url).hostname, (err) => {
    if (err) {
      return res.status(404).send({ error: 'invalid url' });
    } else {
      shorturl =+ 1 ;
      let urlobject = {
        original_url : url ,
        short_url : shorturl
      };
       urlstack.push(urlobject);
       res.json(urlobject);
    }
  });

  console.log(`Listening to api shorturl\t`+new URL(url).hostname);
});

app.get('/api/shorturl/:', function(req, res) {
  
  
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
