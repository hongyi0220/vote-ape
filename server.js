const express = require('express');
const app = express();
const user = require('./user.js');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('build'));

app.use('/user', user);

app.use((req, res) => {
    res.sendFile(__dirname + '/build/index.html');
})
app.listen(8080);
