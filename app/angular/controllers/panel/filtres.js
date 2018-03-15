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
        current: $stateParams.m == "true",
        change: function() {
          $state.go(
            $state.current.name,
            { m: $scope.filtres.mail.current },
            { location: true }
          );
        }
      },
      statut: {
        current: $stateParams.s == "true",
        change: function() {
          $state.go(
            $state.current.name,
            { s: $scope.filtres.statut.current },
            { location: true }
          );
          console.log($stateParams.s);
        }
      }
    };

    // ********** PRINT ********** //
    $scope.print = function() {
      window.print();
    };
  }
]);
