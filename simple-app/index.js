const express = require('express');
const app = express();
const axios = require('axios');
const cookieParser = require('cookie-parser');
const port = 8080;

const application = {
  name: 'Simple App',
  credentials: {
    clientId: '',
    clientSecret: '',
    redirectUri: ''},
  scopes: ['openid', 'profile', 'email',  'offline_access','https://graph.microsoft.com/mail.read','https://graph.microsoft.com/mail.send'],
  tenantId: '',
  authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
  tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  graphUrl: 'https://graph.microsoft.com/v1.0/'
}

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.get('/', (req, res) => {
  if(req.cookies.logged_in===undefined||req.cookies.logged_in==='false') {
    res.statusCode=302;
    res.set('Location', '/auth');
    res.send('');
  }
  else if(req.cookies.logged_in==='true') {
    res.statusCode=302;
    res.set('Location','');
    res.send('');
  }
})
app.get('/auth', (req, res) => {
  res.statusCode=302;
  res.set('Location', 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id='+application.credentials.clientId+'&response_type=code&redirect_uri='+application.credentials.redirectUri+'&scope='+application.scopes.join('%20'));
  res.send('');
})

app.get('authuser', (req, res) => {})