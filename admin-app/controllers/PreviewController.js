angular
  .module("MyAdmin")
  .controller("controllers/PreviewController", PreviewController);

function PreviewController($scope, $rootScope, $location, logout) {
  $scope.header = $rootScope.name || "Preview Section";
  $scope.body = $rootScope.email || "You can log out by using the button below";

  $scope.loggingOut = function() {
    logout.logout().then(data => {
      $scope.redirectTo("/");
      console.log(data);
    });
  };

  $scope.redirectTo = function(path) {
    $location.path(path);
  };
}
