prjModule.controller("login", [
  "$scope",
  "$state",
  "$stateParams",
  "$localStorage",
  "$location",
  "$auth",
  "user",
  function($scope, $state, $stateParams, $localStorage, $location, $auth, user) {
    $scope.login = function() {
      var vm = this;
      var credentials = {
        username: vm.username,
        password: vm.password
      };

      console.log(credentials);

      user.login(vm.username, vm.password, function (success) {
        // $auth
        //   .login(credentials)
        //   .then(function(response) {
        //     console.log(response);
        //     $auth.setToken(response);
        //     $state.go("formations");
        //   })
        //   .catch(function(response) {
        //     console.log("error response", response);
        //   });
        
        $state.go("formations");
        console.log(success);
      }, function (err) {
        console.error(err);
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
