angular.module("MyAdmin").filter("unique", function() {
  return function(collection, keyname) {
    let output = [];
    let keys = [];

    angular.forEach(collection, function(item) {
      let key = item[keyname];
      if (keys.indexOf(key) === -1) {
        keys.push(key);

        output.push(item);
      }
    });

    return output;
  };
});
