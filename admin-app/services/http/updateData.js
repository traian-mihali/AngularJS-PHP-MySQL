angular.module("MyAdmin").factory("updateData", function($http) {
  function updateData(url, data) {
    return $http
      .put(url, data)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  return {
    update: updateData
  };
});
