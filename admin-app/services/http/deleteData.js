angular.module("MyAdmin").factory("deleteData", function($http) {
  function deleteData(url, data) {
    return $http
      .post(url, data)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  return {
    delete: deleteData
  };
});
