angular.module("MyAdmin").factory("insertData", function($http) {
  function insertData(url, data) {
    return $http
      .post(url, data)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  return {
    insert: insertData
  };
});
