const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = new express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');                    // handlebars
app.use(express.static(__dirname + '/public'));  //add middleware

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(error)=>{
        if(error){
            console.log('Unable to create Server.log file');
        }
    } );
    next();
});

app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIT',(text)=>{
    return text.toUpperCase();
});

app.get('/about',(req,res)=>{                //Handlebars 
  res.render('about.hbs',{
      pageTitle : 'About Page!'
  });
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle : 'Home Page!',
        name:'Anirban'
    });
  });

app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});