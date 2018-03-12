prjModule.controller("formations", [
  "$scope",
  "data",
  function($scope, data) {
    // ********** AFFICHAGE DEPARTEMENTS ********** //
    let getDpt = function() {
      data.getDpt().then(function(departements) {
        $scope.departements = departements;
      });
    };
    getDpt();
  }
]);
