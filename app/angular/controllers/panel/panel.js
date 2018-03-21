prjModule.controller("panel", [
  "$scope",
  "$state",
  "$stateParams",
  "$location",
  "data",
  "Upload",
  "$timeout",
  function($scope, $state, $stateParams, $location, data, Upload, $timeout) {
    if ($state.current.name == "trombi.migrer") {
      $scope.dropdown = function() {
        $(".fakeselect-content").toggleClass("active");
        $(".fakeselect").toggleClass("active");
      };
    }

    let getParams = function() {
      console.log($stateParams.trombi);
      $scope.createEtuFormation = $stateParams.trombi;
      $scope.createEtuPeriode = $stateParams.periode;
    };
    getParams();

    // ********** IMPORT CSV ********** //
    $scope.importList = function(importListFile) {
      // console.log(importList);
      // console.log(importListFile);

      importListFile.upload = Upload.upload({
        url: "http://127.0.0.1:8000/api/import",
        data: {
          periode: $scope.importListPeriode,
          formation: $scope.importListFormation,
          file: $scope.importListFile
        }
      });

      importListFile.upload.then(
        function(response) {
          $timeout(function() {
            importListFile.result = response.data;
          });
        },
        function(response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ": " + response.data;
        },
        function(evt) {
          importListFile.progress = Math.min(
            100,
            parseInt(100.0 * evt.loaded / evt.total)
          );
        }
      );
      // .then(location.reload(true));
      //console.log(importList);
    };
  }
]);
