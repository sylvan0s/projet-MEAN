var App = angular.module('blog',[]);

App.controller('ArticlesController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){

   $http.get('/api/articles').
        success(function(data, status, headers, config) {
            console.log(data);
            $scope.articles = data;
            $scope.lastArticle = $scope.articles[$scope.articles.length - 1];
              });

   $http.post
   ('/api/articles').
        success(function(data, status, headers, config) {
            $scope.articles = data;
            $scope.lastArticle = $scope.articles[$scope.articles.length - 1];
              });
   
}]);