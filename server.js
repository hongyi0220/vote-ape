const express = require('express');
const app = express();
const user = require('./user.js');
const api = require('./api.js');
const bodyParser = require('body-parser');
const session = require('express-session');
// var sessionStore = new session.MemoryStore();
// var sessionStore = new MemoryStore();
app.use(session({
    secret: 'scaredy-narwhal',
    resave: false,
    saveUninitialized: false,
    // store: sessionStore,
    unset: 'destroy'
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('build'));

app.use('/api', api);

app.use('/user', user);

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
})
app.listen(8080);
