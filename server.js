    // les modules========================
    var express  = require('express');
    var app      = express();                               
    var mongoose = require('mongoose');                               
    var bodyParser = require('body-parser');    
    var methodOverride = require('method-override'); 


    // onfiguration base de données mongodb=================
    mongoose.connect('mongodb://localhost/blog');

    var Article     = require('./public/models/article');

    app.use(express.static(__dirname + '/public')); 
                                                     
    app.use(bodyParser.urlencoded({'extended':'true'}));            
    app.use(bodyParser.json());                                     
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
    app.use(methodOverride());
    
    // routes ======================================================================
    var router = express.Router();              

    router.use(function(req, res, next) {
    // console 
    console.log('hi ça marche là!');
    next(); 
    });

    // test de la route racine 
    router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
    });

    // route pour les articles
    router.route('/articles')

    // creation d'articles
    .post(function(req, res) {
        
        var article = new Article();      
        article.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        article.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'vous avez fait un article!' });
        });
        
    })

    // obtenir tous les articles  
    .get(function(req, res) {
        Article.find(function(err, articles) {
            if (err)
                res.send(err);

            res.json(articles);
        });
    });

// on routes that end in /article/:article_id

    router.route('/articles/:article_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/article/:article_id)
    .get(function(req, res) {
        Article.findById(req.params.article_id, function(err, article) {
            if (err)
                res.send(err);
            res.json(article);
        });
    })

    //mise à jour article/:article_id

    .put(function(req, res) {

        // use our bear model to find the bear we want
        Article.findById(req.params.article_id, function(err, bear) {

            if (err)
                res.send(err);

            article.name = req.body.name;  //maj

            // sauvegarde
            article.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'maj !' });
            });

        });
    })

        //suppression
        .delete(function(req, res) {
        Article.remove({
            _id: req.params.article_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'article supprimé !!' });
        });
    });



    // enregistrement de la route======================================

    app.use('/api', router);


    // ouverture du port ======================================
    app.listen(8080);
    console.log("Je suis à l'écoute 8080");

  