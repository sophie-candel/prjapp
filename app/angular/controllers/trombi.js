prjModule.controller("trombi", [
  "$scope",
  "$state",
  "$stateParams",
  "data",
  function($scope, $state, $stateParams, data) {
    let getTrombi = function() {
      data.getTrombi().then(function(trombi) {
        $scope.trombi = trombi;
      });
    };
    getTrombi();

    // filtrage
    // $scope.trombinoscopes = data.trombi($stateParams.trombi);
    // $scope.trombi = R.clone($scope.trombinoscopes);
    // switch ($stateParams.al) {
    //   case null:
    //     $scope.trombi.etudiants = R.clone($scope.trombinoscopes.etudiants);
    //     break;
    //   case "null":
    //     $scope.trombi.etudiants = R.clone($scope.trombinoscopes.etudiants);
    //     break;
    //   case "1":
    //     $scope.trombi.etudiants = R.clone(
    //       $scope.trombinoscopes.etudiants
    //     ).filter(function(el) {
    //       if (el.alternant) {
    //         return el;
    //       }
    //     });
    //     break;
    //   case "0":
    //     $scope.trombi.etudiants = R.clone(
    //       $scope.trombinoscopes.etudiants
    //     ).filter(function(el) {
    //       if (!el.alternant) {
    //         return el;
    //       }
    //     });
    //     break;
    //   default:
    //     var params = R.clone($stateParams);
    //     params.al = null;
    //     $state.go($state.current.name, params, { location: true });
    // }

    // panel
    $scope.openPanel = function() {
      $("#wrapper").addClass("panel-is-open");
      $("#panel").addClass("panel-is-open");
    };
    $scope.closePanel = function(r) {
      $("#wrapper").removeClass("panel-is-open");
      $("#panel").removeClass("panel-is-open");
      $state.go("trombi", $stateParams);
    };
    if ($state.current.name != "trombi") {
      $scope.openPanel();
    }
    $(window).blur(function() {
      $scope.closePanel();
    });
  }
]);
