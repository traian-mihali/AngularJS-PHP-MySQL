angular
  .module("MyAdmin")
  .controller("controllers/LoginController", LoginController);

function LoginController($scope, $rootScope, $location, login) {
  $scope.submitLoginForm = function() {
    login.login($scope.login).then(data => {
      if (data.error !== "") {
        $scope.invalidSubmit = !$scope.invalidSubmit;
        $scope.error = data.errror;
      } else {
        $rootScope.name = data.session_data.name;
        $rootScope.email = data.session_data.email;
        $location.path("/preview");
      }
    });
  };

  $scope.redirectToRegister = function() {
    $location.path("/register");
  };
}
