angular.module("MyAdmin").factory("load", function($http) {
  function load(url, table) {
    return $http
      .post(url, { table: table })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  return {
    load: load
  };
});
