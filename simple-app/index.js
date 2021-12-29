const express = require('express');
const app = express();
const axios = require('axios');
const cookieParser = require('cookie-parser');
const port = 8080;

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.get('/', (req, res) => {
  if(req.cookies.logged_in===undefined||req.cookies.logged_in==='false') {
    res.statusCode=302;
    res.set('Location', '/auth');
    res.send('');
  }
})