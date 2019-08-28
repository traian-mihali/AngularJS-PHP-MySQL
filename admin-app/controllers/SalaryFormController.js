angular
  .module("MyAdmin")
  .controller("controllers/SalaryFormController", SalaryFormController);

function SalaryFormController(
  $scope,
  $location,
  $routeParams,
  loadData,
  updateData
) {
  $scope.redirectTo = function(param) {
    if (typeof param === "number") {
      let path = "/salaries/" + param;
      $location.path(path);
    } else {
      $location.path(param);
    }
  };

  $scope.employeeId = parseInt($routeParams.id);

  loadData
    .load("services/php/loadSalaries.php", "monthly_income")
    .then(data => {
      $scope.salary = data;
      console.log("load salary data -> $scope.salary", $scope.salary);

      $scope.salary = data.find(
        salary => salary.employee_id === $scope.employeeId
      );

      $scope.salary.monthYear = new Date($scope.salary.month_year);
      $scope.salary.grossIncome = $scope.salary.gross_income;
      $scope.salary.netIncome = (
        ($scope.salary.grossIncome * 60) /
        100
      ).toFixed(2);

      $scope.salary = $scope.salary;
    });

  $scope.getNetIncome = function(gross) {
    return (gross * 60) / (100).toFixed(2);
  };
  $scope.getGrossIncome = function(net) {
    return (net * 100) / (60).toFixed(2);
  };

  $scope.updateSalary = function() {
    let body = {};

    body.monthYear = $scope.salary.monthYear;
    body.netIncome = $scope.getNetIncome($scope.salary.grossIncome);
    body.grossIncome =
      $scope.salary.grossIncome === $scope.salary.gross_income
        ? $scope.getGrossIncome($scope.salary.netIncome)
        : $scope.salary.grossIncome;

    body.employeeId = $scope.employeeId;

    updateData.update("services/php/updateSalary.php", body).then(data => {
      console.log("data after update", data);
      $scope.redirectTo("/salaries");
    });
  };
}
