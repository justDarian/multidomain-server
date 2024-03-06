// created by darian, and the express documentation

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const endpoints = require('./routes.js'); // ./ :fire:
const port = 80;

app.enable('trust proxy'); // wtf?? this was just in express example
app.use(express.json()); // never forget express.json
app.use(cors()); // this carried production ong, i kept getting cors errors :sob:

// make endpoint for the array in routes.js
endpoints.forEach(({ domain, endpoint, callback }) => {
  app.use((req, res, next) => {
    if (req.hostname === domain && req.url === endpoint) {
      callback(req, res, next);
    } else {
      next();
    }
  });
});

// send stuff in the domain folder
app.use((req, res, next) => {
  fs.appendFileSync(path.join(__dirname, "logs.txt"),`${(new Date().toLocaleString({hour12: true}))}   ${req.hostname}${req.url} - ${req.headers['x-forwarded-for'] || req.connection.remoteAddress} \n`);
  // yes, im being professional!!
  const folderPath = path.join(__dirname, 'sites', req.hostname);

  if (fs.existsSync(folderPath)) {
    const filePath = path.join(folderPath, req.url);

    // checks if the file even exists
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.sendFile(filePath);
    } else {
      express.static(folderPath, { fallthrough: false })(req, res, (err) => { // ok bro the docs carried, i did NOT know failthrough was a thing
        if (err) {
          handleNotFound(req, res);
        }
      });
    }
  } else {
    handleNotFound(req, res);
  }
});

// making this a function becuase i said so
function handleNotFound(req, res) {
  res.status(404).sendFile(path.join(path.join(__dirname, 'sites'), '404.html') ? path.join(path.join(__dirname, 'sites'), '404.html') : path.join(__dirname, 'sites', req.hostname));
}

app.listen(port, () => {
  console.log(`insanity happening!!!`);
});
