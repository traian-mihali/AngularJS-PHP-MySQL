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
      $scope.calculeNetIncome();
    });

  loadData
    .load("services/php/loadEmployeesWithoutASalary.php", "employees")
    .then(data => {
      $scope.employees = data;
    });

  $scope.getNetIncome = function(gross) {
    return (gross * 60) / (100).toFixed(2);
  };

  $scope.calculeNetIncome = function() {
    if ($scope && $scope.data) {
      for (let salary of $scope.data) {
      }
      $scope.data.forEach(salary => {
        salary.netIncome = ((salary.gross_income * 60) / 100).toFixed(2);
      });
    }
  };

  $scope.addSalary = function() {
    if (!$scope.salary.grossIncome && !$scope.salary.netIncome) {
      alert("Please enter an amount");
      return;
    }

    if (!$scope.salary.grossIncome)
      $scope.salary.grossIncome = (
        ($scope.salary.netIncome * 100) /
        60
      ).toFixed(2);

    insertData
      .insert("services/php/insertSalaries.php", $scope.salary)
      .then(data => {
        $scope.visible = false;
        $scope.data = data;
        $scope.calculeNetIncome();
        $scope.salary = null;
      });
  };
}
