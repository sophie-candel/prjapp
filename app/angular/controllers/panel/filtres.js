prjModule.controller('filtres', ['$scope', '$state', '$stateParams', 'data', function($scope, $state, $stateParams, data) {
  //filtres
  $scope.filtres = {
    alt: {
      options: [{
        title: 'Alternance',
        value: '1',
        id: 'alttrue'
      }, {
        title: 'Formation initiale',
        value: '0',
        id: 'altfalse'
      }, {
        title: 'Tous',
        value: 'null',
        id: 'altall'
      }],
      current: (($stateParams.al) ? $stateParams.al : 'null'),
      change: function() {
        var params = R.clone($stateParams);
        params.al = (($scope.filtres.alt.current == 'null') ? null : $scope.filtres.alt.current);
        $state.go($state.current.name, params, {
          location: true
        });
      }
    },
    groupes: {
      current: (($stateParams.g) ? $stateParams.g : null),
      change: function() {
        console.log($scope.filtres.groupes.current);
        var params = R.clone($stateParams);
        params.g = $scope.filtres.groupes.current;
        $state.go($state.current.name, params, {
          location: true
        });
      }
    },
    mail: {
      current: (($stateParams.m == '1') ? 'true' : 'null'),
      change: function() {
        var params = R.clone($stateParams);
        params.m = (($scope.filtres.mail.current == 'true') ? '1' : null);
        $state.go($state.current.name, params, {
          location: true
        });
      }
    }
  }

  if ($state.current.name == 'trombi.imprimer') {
    // print
    $scope.print = function() {
      window.print();
    }
  }
}]);
