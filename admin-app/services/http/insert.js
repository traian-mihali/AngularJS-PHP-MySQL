angular.module("MyAdmin").factory("insert", function($http) {
  function insert(url, data) {
    return $http
      .post(url, data)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  return {
    insert: insert
  };
});
