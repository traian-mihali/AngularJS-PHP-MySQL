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
      console.log($scope.data);
      $scope.calculeNetIncome();
    });

  $scope.calculeNetIncome = function() {
    if ($scope.data) {
      $scope.data.forEach(salary => {
        salary.netIncome = ((salary.gross_income * 60) / 100).toFixed(2);
      });
    } else {
      $scope.salary.netIncome = null;
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

    let employee = $scope.data.find(
      employee => employee.full_name === $scope.salary.employee
    );

    $scope.salary.employeeId = employee.employee_id;

    insertData
      .insert("services/php/insertSalaries.php", $scope.salary)
      .then(data => {
        console.log("[RESPONSE] data", data);
        $scope.visible = false;
        $scope.data = data;
        $scope.calculeNetIncome();
        $scope.salary = null;
      });
  };
}
