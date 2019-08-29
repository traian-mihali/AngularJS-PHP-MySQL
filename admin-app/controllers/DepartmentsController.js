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

  $scope.extractOfficeIds = function(department, offices) {
    const officeIds = [];
    for (let data of offices) {
      if (department.offices.includes(data.office_name)) {
        officeIds.push(data.office_id);
      }
    }
    return officeIds;
  };

  $scope.showInput = function() {
    $scope.visible = !$scope.visible;
  };

  $scope.mapDataToView = function(data) {
    let modifiedData = [];

    for (let i = 0; i < data.length; i++) {
      let temp = { offices: [] };

      for (let j = 0; j < data.length; j++) {
        if (data[j].department_id === data[i].department_id) {
          temp["department_id"] = data[i].department_id;
          temp["name"] = data[i].name;
          temp.offices = [...temp.offices, data[j].office_name];
        }
      }
      modifiedData.push(temp);
    }

    let filteredData = {};
    modifiedData.forEach(data => {
      filteredData[data.department_id] = data;
    });

    return Object.values(filteredData);
  };

  loadData
    .load("services/php/loadDepartments.php", "departments")
    .then(data => {
      console.log("data loaded", data);
      $scope.data = $scope.mapDataToView(data);
    });

  loadData.load("services/php/loadData.php", "offices").then(data => {
    $scope.offices = data;
  });

  $scope.addDepartment = function(department) {
    console.log("DEPARTMENT for INSERT", department);
    if (!department) {
      alert("Please specify a Department");
      return;
    }

    department.officeIds = $scope.extractOfficeIds(department, $scope.offices);

    console.log("department before insert", department);
    insertData
      .insert("services/php/insertDepartment.php", department)
      .then(data => {
        console.log("DATA after INSERT", data);
        $scope.data = $scope.mapDataToView(data);
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
        console.log("DATA ON DELETE", data);
        $scope.data = $scope.mapDataToView(data);
      });
  };

  $scope.updateDepartment = function(department) {
    console.log(department);
    updateData
      .update("services/php/updateDepartment.php", {
        table: "departments",
        key: "department_id",
        value: department
      })

      .then(data => {
        console.log("DATA ON UPDATE", data);
        $scope.data = $scope.mapDataToView(data);
        $location.path("/departments");
      });
  };
}
