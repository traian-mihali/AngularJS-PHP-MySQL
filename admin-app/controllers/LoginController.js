angular
  .module("MyAdmin")
  .controller("controllers/LoginController", LoginController);

function LoginController($scope, $location, login) {
  $scope.submitLoginForm = function() {
    login.login($scope.login).then(data => {
      console.log(data);

      if (data.error !== "") {
        $scope.invalidSubmit = !$scope.invalidSubmit;
        $scope.error = data.errror;
      } else {
        $location.path("/preview");
      }
    });
  };

  $scope.redirectToRegister = function() {
    $location.path("/register");
  };
}
