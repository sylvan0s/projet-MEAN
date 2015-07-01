
//var App = angular.module('blog',[]);
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('login', {
            // we'll get to this in a bit
              url: '/login',
            templateUrl: 'test1.html'       
        });
        
});


routerApp.controller('ArticlesController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
console.log("controller")
console.log($scope)



  $scope.getarticles = function () {
  $http.get('/api/articles').
    success(function(data, status, headers, config) {
              //console.log(data);
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
 
//article par id 
  $scope.getArticle = function() {
    $.get('/api/articles/:article_id').
      success(function(data) {  
      console.log(data);
      });
    };



   
}]);