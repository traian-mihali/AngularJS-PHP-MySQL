angular.module("MyAdmin").factory(
  "register",

  function register($http) {
    function register(data) {
      return $http({
        method: "POST",
        url: "services/php/register.php",
        data: data
      }).then(res => {
        return res.data;
      });
    }

    return {
      register: register
    };
  }
);
