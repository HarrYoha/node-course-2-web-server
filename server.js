const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials'),
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (e) => {
        if (e)
            console.log('Unable to append to server.log')
    });
    next();
});


/* app.use((req, res, next) =>{
    res.render('maintenace.hbs');
}); */

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});


hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    //res.send('<h1>Hello Express <h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcome: 'Welcome to Twistter',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'AboutPage',
    });
});


app.get('/bad', (req, res) => {
    res.send({ errorMessage: 'bad request' });
});



app.listen(3000, () => {
    console.log('server is up on 3000 port');
});