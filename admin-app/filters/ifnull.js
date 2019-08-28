angular.module("MyAdmin").filter("ifnull", function iffnull() {
  return function(value) {
    if (!value && value !== 0) return "-";

    return value === 1 ? "Yes" : value === 0 ? "No" : value;
  };
});
