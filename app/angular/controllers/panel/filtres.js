prjModule.controller("filtres", [
  "$scope",
  "$state",
  "$stateParams",
  "$location",
  "data",
  function($scope, $state, $stateParams, $location, data) {
    /*if ($state.current.name != 'trombi.afficher' || $state.current.name != 'trombi.modifier') {
    $state.go($state.current.name);
  }*/

    // ********** FILTRES ********** //
    $scope.filtres = {
      // groupes
      groupes: {
        current: $stateParams.g ? $stateParams.g : null,
        change: function() {
          $state.go(
            $state.current.name,
            { g: $scope.filtres.groupes.current },
            {
              location: true
            }
          );
        }
      },
      // affichage email
      mail: {
        current: $stateParams.m ? $stateParams.m : null,
        //current: $stateParams.m == "1" ? "true" : "null",
        // current: $stateParams.m == "1" ? "true" : "null",
        change: function() {
          console.log($stateParams.m);
        }
      }
    };

    // ********** PRINT ********** //
    $scope.print = function() {
      window.print();
    };
  }
]);
