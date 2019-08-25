angular
  .module("MyAdmin")
  .controller("controllers/PageNotFoundController", PageNotFoundController);

function PageNotFoundController($scope, $location) {
  $scope.redirectTo = function() {
    $location.path("/preview");
  };
}
