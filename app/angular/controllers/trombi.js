prjModule.controller("trombi", [
  "$scope",
  "$state",
  "$stateParams",
  "data",
  function($scope, $state, $stateParams, data) {
    // $scope.trombiGet = []; // permet de stocker les trombi demandés; permet de refaire plusieurs fois la même requête

    // permet de filtrer un trombi par groupe
    function filterByGroup(trombi, groupe) {
      if (groupe) {
        const etudiants = trombi.etudiants.slice();
        trombi.etudiants = etudiants.filter(etu => {
          return etu.groupes.includes(groupe);
        });
      }
      return trombi;
    }

    // permet de récupérer un trombi
    let getTrombi = function() {
      const groupe = $state.params.g;

      // console.log($scope.trombiGet);
      // if ($stateParams.trombi in $scope.trombiGet) {
      //   $scope.trombi = filterByGroup(Object.assign({}, $scope.trombiGet[$stateParams.trombi]), groupe);
      //   $scope.trombiComplete = Object.assign({}, $scope.trombiGet[$stateParams.trombi]);
      // } else {
      data.getTrombi($stateParams.trombi).then(function(trombi) {
        // console.log(trombi);
        $scope.trombi = filterByGroup(Object.assign({}, trombi), groupe);
        $scope.trombiComplete = Object.assign({}, trombi);

        $scope.currentGroup = groupe;
        // $scope.trombiGet[$stateParams.trombi] = trombi;
      });

      // }
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
