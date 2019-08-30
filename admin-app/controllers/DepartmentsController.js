angular
  .module("MyAdmin")
  .controller("controllers/DepartmentsController", DepartmentsController);

function DepartmentsController(
  $scope,
  $location,
  $routeParams,
  loadData,
  insertData,
  deleteData,
  updateData
) {
  $scope.departmentId = parseInt($routeParams.id);

  $scope.redirectTo = function(param) {
    if (typeof param === "number") {
      let path = "/departments/" + param;
      $location.path(path);
    } else {
      $location.path(param);
    }
  };

  $scope.handleClick = function() {
    return $scope.departmentId
      ? $scope.updateDepartment($scope.department)
      : $scope.addDepartment($scope.department);
  };

  $scope.extractOfficeIds = function(department, offices) {
    const officeIds = [];
    for (let data of offices) {
      if (department.offices && department.offices.includes(data.office_name)) {
        officeIds.push(data.office_id);
      }
    }
    return officeIds;
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

    return Object.values(filteredData).sort(
      (a, b) => b.department_id - a.department_id
    );
  };

  loadData
    .load("services/php/loadDepartments.php", "departments")
    .then(data => {
      console.log("[RESPONSE] DATA LOADED -> ", data);
      $scope.data = $scope.mapDataToView(data);
      console.log("scope.data -> ", $scope.data);

      $scope.department = $scope.data.find(
        department => department.department_id === $scope.departmentId
      );
    });

  loadData.load("services/php/loadData.php", "offices").then(data => {
    $scope.offices = data;
  });

  $scope.addDepartment = function(department) {
    department.officeIds = $scope.extractOfficeIds(department, $scope.offices);

    console.log("[INPUT] DEPARTMENT BEFORE INSERT -> ", department);
    insertData
      .insert("services/php/insertDepartment.php", department)
      .then(data => {
        console.log("[RESPONSE] DATA ON INSERT -> ", data);
        $scope.data = data;
        $scope.department = null;
        $location.path("/departments");
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
        console.log("[RESPONSE] DATA ON DELETE -> ", data);
        $scope.data = $scope.mapDataToView(data);
      });
  };

  $scope.updateDepartment = function(department) {
    department.officeIds = $scope.extractOfficeIds(department, $scope.offices);
    department.departmentId = $scope.departmentId;

    console.log("[INPUT] DEPARTMENT BEFORE UPDATE", department);
    updateData
      .update("services/php/updateDepartment.php", department)
      .then(data => {
        console.log("[RESPONSE] DATA ON UPDATE -> ", data);
        $scope.data = data;
        $scope.department = null;
        $location.path("/departments");
      });
  };
}
