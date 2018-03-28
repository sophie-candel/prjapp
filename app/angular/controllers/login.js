prjModule.controller("login", [
  "$scope",
  "$state",
  "$stateParams",
  "$localStorage",
  "$location",
  "$auth",

  function($scope, $state, $stateParams, $localStorage, $location, $auth) {
    $scope.login = function() {
      var vm = this;
      var credentials = {
        username: vm.username,
        password: vm.password
      };

      console.log(credentials);

      $auth
        .login(credentials)
        .then(function(response) {
          console.log(response);
          $auth.setToken(response);
          $state.go("formations");
        })
        .catch(function(response) {
          console.log("error response", response);
        });
    };

    /////////////////////
    /////////////////////

    // $scope.login = function() {
    //   var vm = this;
    //   console.log(vm.username);
    // vm.login = function() {
    //   var credentials = {
    //     username: vm.username,
    //     password: vm.password
    //   };
    //   $auth
    //     .login(credentials)
    //     .then(function(data) {
    //       // $state.go("formations", {});
    //       // $location.reload(true);
    //       console.log(credentials);
    //     });
    // };
    //};
  }
]);
