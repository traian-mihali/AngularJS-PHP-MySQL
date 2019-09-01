angular
  .module("MyAdmin")
  .controller("controllers/EmployeeFormController", EmployeeFormController);

function EmployeeFormController($scope, $location, loadData, insertData) {
  $scope.redirectTo = function(path) {
    $location.path(path);
  };

  loadData.load("services/php/loadOfficesPerDepartment.php").then(data => {
    console.log("OFFICES PER DEPARTMENT", data);
    $scope.departmentAndOffices = data;
  });

  $scope.submit = function() {
    let manager =
      $scope.employee.is_manager.trim().toLowerCase() === "yes" ? 1 : 0;

    let body = {
      first_name: $scope.employee.first_name,
      last_name: $scope.employee.last_name,
      email: $scope.employee.email,
      birthdate: $scope.employee.birthdate,
      is_manager: manager,
      office_id: $scope.employee.office.office_id,
      department_id: $scope.employee.department.department_id
    };

    insertData.insert("services/php/insertEmployee.php", body).then(data => {
      if (data.error) {
        console.log(data);
        $scope.error = data.error;
      } else {
        console.log(data);
        $scope.redirectTo("/employees");
      }
    });
  };
}
