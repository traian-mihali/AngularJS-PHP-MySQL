angular
  .module("MyAdmin")
  .controller("controllers/DepartmentsController", DepartmentsController);

function DepartmentsController($scope, $location) {
  $scope.redirectTo = function() {
    $location.path("/preview");
  };
}
