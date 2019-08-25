angular.module("MyAdmin").factory("logout", logout);

function logout($http) {
  function logout(data) {
    return $http({
      method: "POST",
      url: "services/php/logout.php",
      data: data
    })
      .then(() => {
        return "You have been successfully logged out..";
      })
      .catch(err => console.log(err));
  }

  return {
    logout: logout
  };
}
