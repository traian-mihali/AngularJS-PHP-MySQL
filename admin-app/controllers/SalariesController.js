angular
  .module("MyAdmin")
  .controller("controllers/SalariesController", SalariesController);

function SalariesController($scope, $location, loadData, insertData) {
  $scope.redirectTo = function(param) {
    if (typeof param === "number") {
      let path = "/salaries/" + param;
      $location.path(path);
    } else {
      $location.path(param);
    }
  };

  $scope.showInput = function() {
    $scope.visible = !$scope.visible;
  };

  loadData
    .load("services/php/loadSalaries.php", "monthly_income")
    .then(data => {
      $scope.data = data;
      console.log("DATA FROM monthly_income -> ", $scope.data);
      $scope.calculeNetIncome();
    });

  loadData.load("services/php/loadEmployees.php").then(data => {
    $scope.employees = data;
  });

  $scope.calculeNetIncome = function() {
    if ($scope.data) {
      $scope.data.forEach(salary => {
        salary.netIncome = ((salary.gross_income * 60) / 100).toFixed(2);
      });
    }
  };

  $scope.hideErrorMessages = function() {
    $scope.duplicateDate = false;
    $scope.invalidSalaryAmount = false;
  };

  $scope.getSelectedEmployee = function() {
    return $scope.employees.find(
      employee =>
        `${employee.first_name} ${employee.last_name}` ===
        $scope.salary.employee
    );
  };

  // $scope.duplicateDatePerEmployee = function() {
  //   let selectedEmployee = $scope.getSelectedEmployee();

  //   $scope.data.forEach(employee => {
  //     if (employee.employee_id === selectedEmployee.employee_id) {
  //       let date = $scope.salary.monthYear.toDateString();
  //       let splitDate = employee.month_year.split(" ");

  //       if (
  //         date.includes(splitDate[0]) &&
  //         date.includes(splitDate[1].substring(0, 3))
  //       ) {
  //         $scope.duplicateDate = true;
  //         return;
  //       }
  //     }
  //   });
  // };

  $scope.addSalary = function() {
    if (!$scope.salary.grossIncome && !$scope.salary.netIncome) {
      $scope.invalidSalaryAmount = true;
      return;
    }

    // $scope.duplicateDatePerEmployee();
    // if ($scope.duplicateDate) return;

    if (!$scope.salary.grossIncome)
      $scope.salary.grossIncome = (
        ($scope.salary.netIncome * 100) /
        60
      ).toFixed(2);

    let selectedEmployee = $scope.getSelectedEmployee();
    $scope.salary.employeeId = selectedEmployee.employee_id;

    console.log("DATA sent", $scope.salary);
    insertData
      .insert("services/php/insertSalaries.php", $scope.salary)
      .then(data => {
        console.log("[RESPONSE FROM insertSalaries.php]", data);
        if (data.error) {
          $scope.duplicateDate = true;
        } else {
          $scope.duplicateDate = false;
          $scope.visible = false;
          $scope.data = data;
          $scope.calculeNetIncome();
          $scope.salary = null;
        }
      });
  };
}
