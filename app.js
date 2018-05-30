
var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/video', function (err, db) {
    assert.equal(err, null);
    console.log('Conected to Mongo');

    app.get('/', function (req, res) {
        db.collection('movies').find({}).toArray(function (err, docs) {
            res.render('movies', { 'movies': docs });
        })
    });

    app.use(function (req, res) {
        res.sendStatus(404);
    });

    const port = process.env.PORT || 3000;
    app.listen(port, function (req, res) {
        console.log("Listening on port " + port)
    })

});





