// les modules========================
    var express  = require('express');
    var app      = express();                               
    var mongoose = require('mongoose');                    
    var morgan = require('morgan');             
    var bodyParser = require('body-parser');    
    var methodOverride = require('method-override'); 

    // configuration =================
   

    mongoose.connect('mongodb://node:nodeuser@localhost/blog');     


    app.use(express.static(__dirname + '/public'));                 
    app.use(morgan('dev'));                                        
    app.use(bodyParser.urlencoded({'extended':'true'}));            
    app.use(bodyParser.json());                                     
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
    app.use(methodOverride());

    // ouverture du port ======================================
    app.listen(8080);
    console.log("Je suis à l'écoute 8080");

    // define model =================
    var Todo = mongoose.model('article', {
        text : String
    });


// routes ======================================================================
    app.use(function(req, res, next) {
        // se connecter 
        console.log('il se passe quelque chose.');
        next();  
    });
    // 
    app.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });   
    });

    app.get('/api/articles', function(req, res) {

        Todo.find(function(err, articles) {

            if (err)
                res.send(err)

            res.json(articles); 
        });
    });

    app.post('/api/', function(req, res) {

        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);
            Todo.find(function(err, articles) {
                if (err)
                    res.send(err)
                res.json(articles);
            });
        });

    });

    app.delete('/api/articles/:articles_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);
            Todo.find(function(err, articles) {
                if (err)
                    res.send(err)
                res.json(articles);
            });
        });
    });