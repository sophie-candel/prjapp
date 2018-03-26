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
      $scope.currentEtuFormation = $stateParams.trombi;
      $scope.currentEtuPeriode = $stateParams.periode;
    };
    getParams();

    $scope.exportTrombi = function() {
      if ($scope.format == 'pdf') {
        data.exportTrombi($stateParams.trombi, $stateParams.periode);
      }
    }

    // ********** IMPORT CSV ********** //
    $scope.importList = function(importListFile) {
      importListFile.upload = Upload.upload({
        url: "http://127.0.0.1:8000/api/import",
        data: {
          periode: $scope.currentEtuPeriode,
          formation: $scope.currentEtuFormation,
          file: $scope.importListFile
        }
      });

      importListFile.upload
        .then(
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
        )
        .then(function() {
          $state.go("trombi", $stateParams.trombi, $stateParams.periode);
          location.reload(true);
        });
    };
  }
]);
