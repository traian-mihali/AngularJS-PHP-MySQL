angular
  .module("MyAdmin")
  .controller("controllers/OfficesController", OfficesController);

function OfficesController(
  $scope,
  $location,
  loadData,
  insertData,
  updateData,
  deleteData
) {
  $scope.redirectTo = function() {
    $location.path("/preview");
  };

  $scope.showInput = function() {
    $scope.visible = !$scope.visible;
  };

  loadData.load("services/php/loadData.php", "offices").then(data => {
    $scope.data = data;
  });

  $scope.addOffice = function(office) {
    insertData
      .insert("services/php/insertData.php", {
        table: "offices",
        key: "office_name",
        value: office.officeName
      })
      .then(data => {
        $scope.visible = false;
        $scope.data = data;
        $scope.office = null;
      });
  };

  $scope.updateOffice = function(office) {
    console.log("OFFICE", office);

    if (office.name) {
      let body = {};
      body.table = "offices";
      body.id = office.office_id;
      body.key = "office_name";
      body.value = office.name;

      updateData.update("services/php/updateData.php", body).then(data => {
        $scope.data = data;
      });
    } else {
      alert("The Office name was not provided");
    }
  };

  $scope.deleteOffice = function(id) {
    deleteData
      .delete("services/php/deleteData.php", {
        table: "offices",
        key: "office_id",
        value: id
      })
      .then(data => {
        $scope.data = data;
      });
  };
}
