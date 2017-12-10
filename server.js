const express = require('express');
const app = express();
const user = require('./user.js');
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

app.get('/api/getuserinfo', (req, res) => {
    // res.send(app.get('docs'));
    console.log('api asked for: getuserinfo: session.user', session.user);
    // console.log('server: api getuserinfo: req.session.user', req.session.user);
    res.send(session.user);
});

app.get('/api/signout', (req, res) => {
    console.log('heya from /signout');

    session.user = null;
    // session.user = null;
    res.end();

    console.log('session.user AFTER session is destroyed:', session.user);
});

app.use('/user', user);

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
})
app.listen(8080);
