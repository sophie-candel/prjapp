prjModule.controller("login", [
  "$scope",
  "$location",
  "user",
  "$state",
  function($scope, $location, user, $state) {
    $scope.login = function() {
      user.login(
        $scope.email,
        $scope.password,
        function(response) {
          //$location.path("/");
          $state.go("/");
        },
        function(response) {
          alert("erreur lors de la connection");
        }
      );
    };

    //$scope.mail = "";
    $scope.password = "";

    if (user.checkIfLoggedIn()) $location.path("/");
  }
]);
