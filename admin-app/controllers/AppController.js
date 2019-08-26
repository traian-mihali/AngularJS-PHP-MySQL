angular
  .module("MyAdmin")
  .controller("controllers/AppController", AppController);

function AppController($scope, $location) {
  $scope.redirectTo = function(path) {
    $location.path(path);
  };
}
