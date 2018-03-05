prjModule.controller("trombi", [
  "$scope",
  "$state",
  "$stateParams",
  "data",
  function($scope, $state, $stateParams, data) {
    let getTrombi = function() {
      data.getTrombi($stateParams.trombi).then(function(trombi) {
        //var filterGroup = trombi.filter(function(elt) {
        // return elt.groupes?.includes(1?);
        // })
        // trombi.forEach(function(elt){
        // });
        $scope.trombi = trombi;
        //console.log(trombi.periode);
      });
    };
    getTrombi();

    // var gensDuGroupe1 = getTrombi.filter(function (getTrombi) {
    //   return getTrombi.groupes.includes(1);
    // });
    //console.log(gensDuGroupe1);

    // $scope.filter = {};

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
    // $(window).blur(function() {
    //   $scope.closePanel();
    // });
  }
]);
