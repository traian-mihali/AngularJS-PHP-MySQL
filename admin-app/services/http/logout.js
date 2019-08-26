angular.module("MyAdmin").factory("logout", logout);

function logout($http) {
  function loggingOut(data) {
    return $http({
      method: "POST",
      url: "services/php/logout.php",
      data: data
    })
      .then(res => {
        if (res.data.length === 0)
          return "You have been successfully logged out..";
        return res.data;
      })
      .catch(err => console.log(err));
  }

  return {
    logout: loggingOut
  };
}
