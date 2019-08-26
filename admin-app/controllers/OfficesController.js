angular
  .module("MyAdmin")
  .controller("controllers/OfficesController", OfficesController);

function OfficesController($scope, $location, load, insert, deleteData) {
  $scope.redirectTo = function() {
    $location.path("/preview");
  };

  $scope.showInput = function() {
    $scope.visible = !$scope.visible;
  };

  load.load("services/php/loadData.php", "offices").then(data => {
    $scope.data = data;
  });

  $scope.addOffice = function(officeName) {
    insert
      .insert("services/php/insertData.php", {
        table: "offices",
        key: "office_name",
        value: officeName
      })
      .then(data => {
        $scope.visible = false;
        $scope.data = data;
        $scope.officeName = "";
      });
  };

  $scope.deleteOffice = function(id) {
    deleteData
      .delete("services/php/deleteData.php", {
        table: "offices",
        key: "office_id",
        value: id
      })
      .then(data => {
        $scope.data = data;
      });
  };
}
