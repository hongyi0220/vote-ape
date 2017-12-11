const express = require('express');
// const app = express();
const router = express.Router();
// require('dotenv').config();
// const url = process.env.MONGOLAB_URI;
// const mongo = require('mongodb')
// const MongoClient = mongo.MongoClient;
const session = require('express-session');
// const bodyParser = require('body-parser');

// router.get('/getmypolls', (req, res) => {
//     res.send(session.data.mypolls);
// });

router.get('/getuserdata', (req, res) => {
    // res.send(app.get('docs'));
    console.log('api asked for: getuserdata: session.data:', session.data);
    // console.log('server: api getuserinfo: req.session.data.user', req.session.data.user);
    res.send(session.data);
});

router.get('/signout', (req, res) => {
    // console.log('heya from /signout');
    session.data.user = null;
    // session.data.user = null;
    res.end();
    // console.log('session.data.user AFTER session is destroyed:', session.data.user);
});

module.exports = router;
