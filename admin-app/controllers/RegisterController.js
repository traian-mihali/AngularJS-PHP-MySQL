angular
  .module("MyAdmin")
  .controller("controllers/RegisterController", RegisterController);

function RegisterController($scope, $location, register) {
  $scope.submitRegisterForm = function() {
    register.register($scope.register).then(data => {
      console.log(data);

      if (data.error !== "") {
        $scope.error = data.error;
        $scope.invalidSubmit = !$scope.invalidSubmit;
      } else {
        $location.path("/preview");
      }
    });
  };

  $scope.redirectToLogin = function() {
    $location.path("/login");
  };
}
