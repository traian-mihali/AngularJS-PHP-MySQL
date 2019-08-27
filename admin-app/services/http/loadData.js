angular.module("MyAdmin").factory("loadData", function($http) {
  function loadData(url, table) {
    return $http
      .post(url, { table: table })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  return {
    load: loadData
  };
});
