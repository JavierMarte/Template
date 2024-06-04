const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const session = require("express-session");
const path = require('path');


require('dotenv').config();
const logService = require('./utils/logger');


const accountRoutes = require('./routes/accountRoutes')



require('dotenv').config();





const privateKey = fs.readFileSync('./certs/', 'utf8');
const certificate = fs.readFileSync('./certs/', 'utf8');


const credentials = { key: privateKey, cert: certificate };


const { checkConnectionToDatabase } = require('./configs/database/prismaClient');

const app = express();
app.use(cors());

const logger = new logService.Logger("Server");


app.use(express.static('./public'))

app.use(
  // Use an actual secret key in production
  session({ secret: "bosco", saveUninitialized: true, resave: true })
);

// Apply the raw body parser middleware before other middleware
app.use(rawBodyParser);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({
  verify: function (req, res, buf) {
    req.rawBody = buf;
  }
}));


app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: 'auto', // 'auto' or true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 24 hour
  }
}));


app.get('/home', (req, res) => {
  res.redirect('/#/auth/sign-in');
});


app.use('/account', accountRoutes)



 

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

const PORT =  5001;
if (process.env.NODE_ENV === 'production') {
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(PORT, () => {
    checkConnectionToDatabase();
    logger.log(`HTTP Server running on port ${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    checkConnectionToDatabase();
    logger.log(`HTTP Server running on port ${PORT}`);
  });
}



