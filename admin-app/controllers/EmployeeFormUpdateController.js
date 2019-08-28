angular
  .module("MyAdmin")
  .controller(
    "controllers/EmployeeFormUpdateController",
    EmployeeFormUpdateController
  );

function EmployeeFormUpdateController(
  $scope,
  $location,
  $routeParams,
  loadData,
  updateData
) {
  $scope.redirectTo = function(path) {
    $location.path(path);
  };

  $scope.id = parseInt($routeParams.id);

  loadData.load("services/php/loadData.php", "departments").then(data => {
    $scope.departments = data;
  });

  loadData.load("services/php/loadData.php", "offices").then(data => {
    $scope.offices = data;
  });

  loadData.load("/services/php/loadEmployees.php").then(data => {
    $scope.employee = data.find(employee => employee.employee_id === $scope.id);

    $scope.employee.birthdate = new Date($scope.employee.birthdate);
    $scope.employee.is_manager =
      $scope.employee.is_manager === 0 ? "No" : "Yes";

    $scope.employee = $scope.employee;
  });

  $scope.submit = function() {
    let office = $scope.offices.find(
      office => office.office_name === $scope.employee.office_name
    );

    let department = $scope.departments.find(
      department => department.name === $scope.employee.name
    );

    $scope.employee.is_manager =
      $scope.employee.is_manager.trim().toLowerCase() === "yes" ? 1 : 0;

    let body = {
      employee_id: $scope.employee.employee_id,
      first_name: $scope.employee.first_name,
      last_name: $scope.employee.last_name,
      email: $scope.employee.email,
      birthdate: $scope.employee.birthdate,
      is_manager: $scope.employee.is_manager,
      office_id: office.office_id,
      department_id: department.department_id
    };

    updateData.update("services/php/updateEmployee.php", body).then(data => {
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
