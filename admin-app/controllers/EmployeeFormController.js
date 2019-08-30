angular
  .module("MyAdmin")
  .controller("controllers/EmployeeFormController", EmployeeFormController);

function EmployeeFormController(
  $scope,
  $routeParams,
  $location,
  loadData,
  insertData
) {
  $scope.redirectTo = function(path) {
    $location.path(path);
  };

  loadData.load("services/php/loadData.php", "departments").then(data => {
    $scope.departments = data;
  });

  loadData.load("services/php/loadData.php", "offices").then(data => {
    $scope.offices = data;
  });

  $scope.submit = function() {
    let office = $scope.offices.find(
      office => office.office_name === $scope.employee.office_name
    );

    let department = $scope.departments.find(
      department => department.name === $scope.employee.name
    );

    let manager =
      $scope.employee.is_manager.trim().toLowerCase() === "Yes" ? 1 : 0;

    let body = {
      first_name: $scope.employee.first_name,
      last_name: $scope.employee.last_name,
      email: $scope.employee.email,
      birthdate: $scope.employee.birthdate,
      office_id: office.office_id,
      department_id: department.department_id
    };

    body.is_manager = "Yes" ? 1 : 0;

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
