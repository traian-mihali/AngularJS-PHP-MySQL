angular
  .module("MyAdmin")
  .controller("controllers/PreviewController", PreviewController);

function PreviewController($scope, $location, logout) {
  $scope.logout = function() {
    logout.logout().then(data => {
      $scope.redirectTo();
    });
  };

  $scope.redirectTo = function() {
    $location.path("/");
  };

  $scope.redirectToOffices = function() {
    $location.path("/offices");
  };

  $scope.redirectToDepartments = function() {
    $location.path("/departments");
  };

  $scope.redirectToEmployees = function() {
    $location.path("/employees");
  };

  $scope.redirectToSalaries = function() {
    $location.path("/salaries");
  };
}
