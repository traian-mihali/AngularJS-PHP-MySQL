angular
  .module("MyAdmin")
  .controller("controllers/EmployeesController", EmployeesController);

function EmployeesController($scope, $location) {
  $scope.redirectTo = function() {
    $location.path("/preview");
  };
}
