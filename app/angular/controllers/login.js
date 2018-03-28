prjModule.controller("login", [
  "$scope",
  "$state",
  "$stateParams",
  "$localStorage",
  "$location",
  "$auth",

  function($scope, $state, $stateParams, $localStorage, $location, $auth) {
    // $scope.logintest = function() {
    //   console.log("login");
    // };

    $scope.login = function() {
      username = $scope.username;
      password = $scope.password;
      $auth
        .login({ username: username, password: password })
        .then(function(response) {
          console.log(response);
          $auth.setToken(response);
          $state.go("formations");
        })
        .catch(function(response) {
          console.log("error response", response);
        });
    };

    // "use strict";
    // var vm = this;
    // vm.login = function() {
    //   var credentials = {
    //     username: vm.username,
    //     password: vm.password
    //   };
    //   // Use Satellizer's $auth service to login
    //   $auth.login(credentials).then(function(data) {
    //     // If login is successful, redirect to the users state
    //     // $state.go("formations", {});
    //     // $location.reload(true);
    //     console.log(credentials);
    //   });
    // };
  }
]);
