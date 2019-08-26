angular.module("MyAdmin").factory(
  "login",

  function($http) {
    function loggingIn(data) {
      return $http({
        method: "POST",
        url: "services/php/login.php",
        data: data
      }).then(res => {
        return res.data;
      });
    }

    return {
      login: loggingIn
    };
  }
);
