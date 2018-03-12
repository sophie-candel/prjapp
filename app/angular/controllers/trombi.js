prjModule.controller("trombi", [
  "$scope",
  "$state",
  "$stateParams",
  "data",
  function($scope, $state, $stateParams, data) {
    // $scope.trombiGet = []; // permet de stocker les trombi demandés; permet de refaire plusieurs fois la même requête

    // ********** FILTRES ********** //
    function filterByGroup(trombi, groupe) {
      if (groupe) {
        const etudiants = trombi.etudiants.slice();
        trombi.etudiants = etudiants.filter(etu => {
          return etu.groupes.includes(groupe);
        });
      }
      return trombi;
    }

    // ********** AFFICHAGE TROMBI ********** //
    let getTrombi = function() {
      const groupe = $state.params.g;
      // const mail = $state.params.m;
      // console.log($state.params.m);

      // console.log($scope.trombiGet);
      // if ($stateParams.trombi in $scope.trombiGet) {
      //   $scope.trombi = filterByGroup(Object.assign({}, $scope.trombiGet[$stateParams.trombi]), groupe);
      //   $scope.trombiComplete = Object.assign({}, $scope.trombiGet[$stateParams.trombi]);
      // } else {
      data.getTrombi($stateParams.trombi).then(function(trombi) {
        $scope.trombi = filterByGroup(Object.assign({}, trombi), groupe);
        $scope.trombiComplete = Object.assign({}, trombi);

        $scope.currentGroup = groupe;
        $scope.currentMail = mail;
      });

      // }
    };
    getTrombi();

    // ********** PANEL ********** //
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
