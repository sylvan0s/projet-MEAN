var blog = angular.module('blog', []);

function mainController($scope, $http) {
    $scope.formData = {};

    
    $http.get('/api/articles')
        .success(function(data) {
            $scope.articles = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

   
    $scope.createArticle = function() {
        $http.post('/api/articles', $scope.formData)
            .success(function(data) {
            	console.log("création d'un article")
                $scope.formData = {}; 
               	console.log(data);
                $scope.articles = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteArticle = function(id) {
        $http.delete('/api/articles/' + id)
            .success(function(data) {
                $scope.articles = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}