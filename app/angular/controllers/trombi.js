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

    // ********** SEARCHBAR ********** //
    // $scope.search = function() {
    //   $scope.submitted = true;
    //   data
    //     .query(
    //       $scope.query
    //     )
    //     .then(function() {

    //     })
    // }

    let getSearch = function() {
      data.getSearch().then(function(search) {
        $scope.search = search;
        //console.log($scope.search);
      });
    };
    getSearch();

    // ********** AFFICHAGE TROMBI ********** //
    let getTrombi = function() {
      const groupe = $state.params.g;
      //const mail = $state.params.m;
      //console.log($state.params);

      // console.log($scope.trombiGet);
      // if ($stateParams.trombi in $scope.trombiGet) {
      //   $scope.trombi = filterByGroup(Object.assign({}, $scope.trombiGet[$stateParams.trombi]), groupe);
      //   $scope.trombiComplete = Object.assign({}, $scope.trombiGet[$stateParams.trombi]);
      // } else {
      data
        .getTrombi($stateParams.trombi, $stateParams.periode)
        .then(function(trombi, periode) {
          $scope.trombi = filterByGroup(Object.assign({}, trombi), groupe);
          $scope.trombiComplete = Object.assign({}, trombi);

          $scope.periode = $stateParams.periode;

          $scope.currentGroup = groupe;

          $scope.currentMail = $stateParams.m;
          $scope.currentStatut = $stateParams.s;
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
