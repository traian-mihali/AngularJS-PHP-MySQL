angular
  .module("MyAdmin")
  .controller("controllers/AppController", AppController);

function AppController($scope, $location) {
  $scope.redirectToLogin = function() {
    $location.path("/login");
  };

  $scope.redirectToRegister = function() {
    $location.path("/register");
  };
}
