const express = require('express');
const app = express();
const user = require('./user.js');
// const path = require('path');
app.use(express.static('build'));

// app.use('/user', user);
// app.use((req, res) => {
//     res.sendFile(__dirname + '/build/index.html');
// });
app.use((req, res) => {
    res.sendFile(__dirname + '/build/index.html');
})
app.listen(8080);
