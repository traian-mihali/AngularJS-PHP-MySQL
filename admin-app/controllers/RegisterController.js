angular
  .module("MyAdmin")
  .controller("controllers/RegisterController", RegisterController);

function RegisterController($scope, $rootScope, $location, register) {
  $scope.submitRegisterForm = function() {
    register.register($scope.register).then(data => {
      if (data.error !== "") {
        $scope.error = data.error;
        $scope.invalidSubmit = !$scope.invalidSubmit;
      } else {
        $rootScope.name = data.session_data.name;
        $rootScope.email = data.session_data.email;
        $location.path("/preview");
      }
    });
  };

  $scope.redirectToLogin = function() {
    $location.path("/login");
  };
}
