angular
  .module("MyAdmin")
  .controller("controllers/SalariesController", SalariesController);

function SalariesController($scope, $location, load, insert) {
  $scope.redirectTo = function() {
    $location.path("/preview");
  };

  $scope.showInput = function() {
    $scope.visible = !$scope.visible;
  };

  load.load("services/php/loadData.php", "salaries").then(data => {
    $scope.data = data;
    $scope.calculeNetIncome();
  });

  $scope.calculeNetIncome = function() {
    $scope.data &&
      $scope.data.forEach(salary => {
        salary.netIncome = String((salary.monthly_gross_income * 60) / 100);
      });
  };

  $scope.addSalary = function() {
    if (!$scope.salary.grossIncome && !$scope.salary.netIncome) return;

    if (!$scope.salary.grossIncome)
      $scope.salary.grossIncome = ($scope.salary.netIncome * 100) / 60;

    insert
      .insert("services/php/insertData.php", {
        table: "salaries",
        key: "monthly_gross_income",
        value: $scope.salary.grossIncome
      })
      .then(data => {
        $scope.visible = false;
        $scope.data = data;
        $scope.calculeNetIncome();
        $scope.salary = null;
      });
  };
}
