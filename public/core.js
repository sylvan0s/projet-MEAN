
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
             controller: 'ArticlesController'
        })
        
        .state('login', {
            
              url: '/login',
            templateUrl: 'test1.html'       
        })

         .state('article', {
            url: '/article/:id',
            templateUrl: 'article.html',
            controller: 'affichearticle'
         });
     
});


routerApp.controller('ArticlesController', ['$stateParams','$scope', '$rootScope', '$http', function($stateParams,$scope, $rootScope, $http){
 
 var id = $stateParams.id;

  $scope.getarticle = function() {
   
   $.get('/api/articles/'+id).
          success(function(data, status, headers, config) {
              console.log(data);
              $scope.articles = data;
              $scope.lastArticle = $scope.articles[$scope.articles.length - 1];
            });
  };

  
  $scope.getarticles = function () {
  $.get('/api/articles').
    success(function(data, status, headers, config) {
              console.log(data);
              $scope.articles = data;
              $scope.lastArticle = $scope.articles[$scope.articles.length - 1];
                });
    };

    $scope.getarticles();
//création d'article 
  $scope.createArticle = function () {

      console.log($scope.title);
      console.log($scope.content);
      
    $.post('/api/articles',
    {
        "title" : $scope.title,
        "content" :  $scope.content        
    },"json")
    .always(function() {
      console.log("post ok");
    });
     $scope.getarticles();
  };

}]);

