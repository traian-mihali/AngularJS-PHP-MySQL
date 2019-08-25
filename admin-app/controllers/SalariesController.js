angular
  .module("MyAdmin")
  .controller("controllers/SalariesController", SalariesController);

function SalariesController($scope, $location) {
  $scope.redirectTo = function() {
    $location.path("/preview");
  };
}
