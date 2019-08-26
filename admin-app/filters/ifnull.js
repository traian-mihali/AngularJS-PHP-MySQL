angular.module("MyAdmin").filter("ifnull", function iffnull() {
  return function(value) {
    if (!value) return "null";
    return value;
  };
});
