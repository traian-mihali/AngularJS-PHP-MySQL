angular
  .module("MyAdmin")
  .controller("controllers/EmployeesController", EmployeesController);

function EmployeesController($scope, $location, load, deleteData) {
  $scope.redirectTo = function(path) {
    $location.path(path);
  };

  load.load("services/php/loadEmployees.php").then(data => {
    console.log("data", data);
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
