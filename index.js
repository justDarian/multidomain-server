const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const endpoints = require('./routes.js');
const port = 80;

app.enable('trust proxy'); // yes
app.use(cors()); // oh yea!!

// make endpoint for the array in routes.js
endpoints.forEach(({ domain, endpoint, callback }) => {
  app.use((req, res, next) => {
    if (req.hostname === domain && req.url.startsWith(endpoint)) {
      callback(req, res, next);
    } else {
      next();
    }
  });
});

// send stuff in the domain folder
app.use((req, res, next) => {
  fs.appendFileSync(path.join(__dirname, "logs.txt"),`${(new Date().toLocaleString({hour12: true}))}   ${req.hostname}${req.url} - ${req.headers['x-forwarded-for'] || req.connection.remoteAddress} \n`);

  const folderPath = path.join(__dirname, 'sites', req.hostname);

  if (fs.existsSync(folderPath)) {
    const filePath = path.join(folderPath, req.url);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.sendFile(filePath);
    } else {
      express.static(folderPath, { fallthrough: false })(req, res, (err) => {
        if (err) {
          handleNotFound(req, res);
        }
      });
    }
  } else {
    handleNotFound(req, res);
  }
});

function handleNotFound(req, res) {
  const notFoundPath = path.join(path.join(__dirname, 'sites'), '404.html');
  fs.exists(notFoundPath, (exists) => {
    if (exists) {
      res.status(404).sendFile(notFoundPath);
    } else {
      res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    }
  });
}

app.listen(port, () => {
  console.log(`insanity happening!!!`);
});
