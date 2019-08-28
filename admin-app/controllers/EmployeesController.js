angular
  .module("MyAdmin")
  .controller("controllers/EmployeesController", EmployeesController);

function EmployeesController($scope, $location, loadData, deleteData) {
  $scope.redirectTo = function(param) {
    if (typeof param === "number") {
      let path = "/employees/" + param;
      $location.path(path);
    } else {
      $location.path(param);
    }
  };

  loadData.load("services/php/loadEmployees.php").then(data => {
    $scope.data = data;
  });

  $scope.deleteEmployee = function(id) {
    deleteData
      .delete("services/php/deleteData.php", {
        table: "employees",
        key: "employee_id",
        value: id
      })
      .then(data => {
        $scope.data = data;
      });
  };
}
