angular.module("MyAdmin").filter("ifnull", function iffnull() {
  return function(value) {
    if (!value) return "-";

    return value === 1 ? "Yes" : value;
  };
});
