app.controller('MainController', ['$scope', '$location', function($scope, $location) {
    $scope.$location = $location;

    $scope.inPath = function(path) {
        if (path == '') return $location.path() == '' || $location.path() == '/';
        else {
            var regexp = new RegExp("^\/" + path);
            return regexp.test($location.path());
        }
    }
}]);
