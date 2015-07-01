var App = angular.module('blog',[]);

App.controller('ArticlesController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
console.log("controller")
console.log($scope)
   $http.get('/api/articles').
        success(function(data, status, headers, config) {
            console.log(data);
            $scope.articles = data;
            $scope.lastArticle = $scope.articles[$scope.articles.length - 1];
              });

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
  };

   
}]);