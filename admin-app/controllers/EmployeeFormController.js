angular
  .module("MyAdmin")
  .controller("controllers/EmployeeFormController", EmployeeFormController);

function EmployeeFormController($scope, $location, load, insert) {
  $scope.redirectTo = function(path) {
    $location.path(path);
  };

  load.load("services/php/loadData.php", "departments").then(data => {
    $scope.departments = data;
  });

  load.load("services/php/loadData.php", "offices").then(data => {
    $scope.offices = data;
  });

  load.load("services/php/loadData.php", "salaries").then(data => {
    $scope.salaries = data;
  });

  $scope.insertEmployee = function() {
    let body = {
      first_name: $scope.employee.firstname,
      last_name: $scope.employee.lastname,
      email: $scope.employee.email,
      birthdate: $scope.employee.birthdate,
      is_manager: $scope.employee.manager,
      monthly_gross_income: $scope.employee.salary,
      office_name: $scope.employee.office,
      name: $scope.employee.department
    };

    insert.insert("services/php/insertEmployee.php", body).then(data => {
      if (data) {
        $scope.redirectTo("/employees");
        console.log(data);
      }
    });
  };
}
