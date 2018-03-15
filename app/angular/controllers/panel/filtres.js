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

    $scope.filtres = {
      // ********** GROUPES ********** //
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

      // ********** PERIODES ********** //
      periodes: {
        current: $stateParams.periode ? $stateParams.periode : null,
        // if ($stateParams.periode) {
        //   $stateParams.periode = $stateParams.periode;
        // }
        // else {
        //   $stateParams.periode = null;
        // }
        change: function() {
          $state.go(
            $state.current.name,
            {
              periode: $scope.filtres.periodes.current
            },
            {
              location: true
            }
          );
        }
      },

      mail: {
        // current: function() {
        //   console.log($scope.filtres.mail.current);
        // },
        current: ($stateParams.m = $scope.filtres.mail.current),

        change: function() {
          $state.go(
            $state.current.name,
            {
              mail: $scope.filtres.mail.current
            },
            {
              location: true
            }
          );
          console.log($stateParams.m);
        }

        //current: $stateParams.m ? $stateParams.m : null,
        //current: $stateParams.m == "1" ? "true" : "null",
      }
    };

    // ********** PRINT ********** //
    $scope.print = function() {
      window.print();
    };
  }
]);
