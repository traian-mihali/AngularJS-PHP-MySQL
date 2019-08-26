angular
  .module("MyAdmin")
  .controller("controllers/DepartmentsController", DepartmentsController);

function DepartmentsController($scope, $location, load, insert, deleteData) {
  $scope.redirectTo = function() {
    $location.path("/preview");
  };

  $scope.showInput = function() {
    $scope.visible = !$scope.visible;
  };

  load.load("services/php/loadData.php", "departments").then(data => {
    $scope.data = data;
  });

  $scope.addDepartment = function(departmentName) {
    insert
      .insert("services/php/insertData.php", {
        table: "departments",
        key: "name",
        value: departmentName
      })
      .then(data => {
        $scope.data = data;
        $scope.departmentName = null;
        $scope.visible = false;
      });
  };

  $scope.deleteDepartment = function(id) {
    deleteData
      .delete("services/php/deleteData.php", {
        table: "departments",
        key: "department_id",
        value: id
      })
      .then(data => {
        $scope.data = data;
      });
  };
}
