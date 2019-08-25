angular
  .module("MyAdmin")
  .controller("controllers/OfficesController", OfficesController);

function OfficesController($scope, $location) {
  $scope.redirectTo = function() {
    $location.path("/preview");
  };
}
