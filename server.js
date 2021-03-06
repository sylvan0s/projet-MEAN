   // les modules========================
    var express  = require('express');
    var app      = express();                               
    var mongoose = require('mongoose');                               
    var bodyParser = require('body-parser');    
    var methodOverride = require('method-override');

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;


    // onfiguration base de données mongodb=================
    mongoose.connect('mongodb://localhost/blog');

    var Article     = require('./public/models/article');

    app.use(express.static(__dirname + '/public')); 
                                                     
    app.use(bodyParser.urlencoded({'extended':'true'}));            
    app.use(bodyParser.json());                                     
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
    app.use(methodOverride());
    
    // Définition des routes ======================================================================
    app.get('/api/articles', function(req, res) {

        // use mongoose Articleet all Articles in the database
        Article.find(function(err, articles) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(articles); // return all Articles in JSON format
        });
    });

    // create Article and send back all Articles after creation
    app.post('/api/articles', function(req, res) {

        // create a Article, information comes from AJAX request from Angular
        console.log(req.body.title);
        console.log(req.body.content);
        
        var article = new Article();

        article.title = req.body.title;
        article.content = req.body.content;

        article.save(function(err) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'Article created!' });
        });

    });

    // delete a Article
    app.delete('/api/articles/:article_id', function(req, res) {
        Article.remove({
            _id : req.params.article_id
        }, function(err, article) {
            if (err)
                res.send(err);

            // get and return all the Articles after you create another
            Article.find(function(err, article) {
                if (err)
                    res.send(err)
                res.json(articles);
            });
        });
    });

    app.get('/api/articles/:article_id', function(req, res) {
        Article.findById(req.params.article_id, function(err, article) {
            if (err)
                res.send(err);
            res.json(article);
        });
    });



    // index ======================================
   /* app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });*/

    
    // Initialisation de PassportJS
    passport.use(new LocalStrategy (
        function(username, password, done) {
            User.findOne({ username: username }, function(err, user) {
                if (err) return done(err);
                if (!user) return done(null, false, { message: 'Username incorrect.' });
                if (!user.validPassword(password)) return done(null, false, { message: 'Password incorrect.' });
                
                return done(null, user);
            });
        }
    ));
    app.post('/login',
        passport.authenticate('local', { successRedirect: '/',
                                        failureRedirect: '/login',
                                        failureFlash: true })
    );
    app.use(passport.initialize());
    app.use(passport.session());


    // ouverture du port ======================================
    app.listen(8080);
    console.log("Je suis à l'écoute 8080");