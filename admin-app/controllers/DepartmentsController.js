angular
  .module("MyAdmin")
  .controller("controllers/DepartmentsController", DepartmentsController);

function DepartmentsController(
  $scope,
  $location,
  loadData,
  insertData,
  deleteData,
  updateData
) {
  $scope.redirectTo = function(param) {
    if (typeof param === "number") {
      let path = "/departments/" + param;
      $location.path(path);
    } else {
      $location.path(param);
    }
  };

  $scope.showInput = function() {
    $scope.visible = !$scope.visible;
  };

  loadData
    .load("services/php/loadDepartments.php", "departments")
    .then(data => {
      $scope.data = data;
      console.log("after departments load -> $scope.data", $scope.data);
      $scope.modifiedData = [];

      // for (let i = 0; i < data.length; i++) {
      //   let temp = { offices: [] };

      //   for (let j = 0; j < data.length; j++) {
      //     if (data[j].department_id === data[i].department_id) {
      //       temp["department_id"] = data[i].department_id;
      //       temp["name"] = data[i].name;
      //       temp.offices = [...temp.offices, data[j].office_name];
      //     }
      //   }

      //   $scope.modifiedData.push(temp);
      // }
    });

  loadData.load("services/php/loadData.php", "offices").then(data => {
    $scope.offices = data;
    console.log("after offices load -> $scope.data", $scope.offices);
  });

  $scope.addDepartment = function(department) {
    if (!department) {
      alert("Please specify a Department");
      return;
    }

    $scope.officeIds = [];
    if (department && department.offices) {
      for (let data of $scope.offices) {
        if (department.offices.includes(data.office_name)) {
          $scope.officeIds.push(data.office_id);
        }
      }
    }

    department.officeIds = $scope.officeIds;
    insertData
      .insert("services/php/insertDepartment.php", department)
      .then(data => {
        $scope.data = data;
        console.log(department, " was inserted");
        console.log("after insert -> $scope.data", $scope.data);
        $scope.department = null;
        $scope.visible = false;
      });
  };

  $scope.deleteDepartment = function(departmentId) {
    deleteData
      .delete("services/php/deleteData.php", {
        table: "departments",
        key: "department_id",
        value: departmentId
      })
      .then(data => {
        $scope.data = data;
        console.log(departmentId, " was deleted");
        console.log("after delete -> $scope.data", $scope.data);
      });
  };

  $scope.updateDepartment = function(department) {
    console.log(department);
    updateData
      .update("services/php/updateData.php", {
        table: "departments",
        key: "department_id",
        value: department
      })
      .then(data => {
        $scope.data = data;
        console.log(department, " was updated");
        console.log("after update -> $scope.data", $scope.data);
        $location.path("/departments");
      });
  };
}
