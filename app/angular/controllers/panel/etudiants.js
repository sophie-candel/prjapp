prjModule.controller("etudiants", [
  "$scope",
  "$state",
  "$stateParams",
  "$location",
  "data",
  "Upload",
  "$timeout",
  function($scope, $state, $stateParams, $location, data, Upload, $timeout) {
    let getParams = function() {
      $scope.currentEtuFormation = $stateParams.trombi;
      $scope.currentEtuPeriode = $stateParams.periode;
    };
    getParams();

    // ********** AFFICHAGE ETUDIANT ********** //
    let getEtu = function() {
      data.getEtu($stateParams.etu).then(function(etu) {
        $scope.etu = etu;
      });
    };
    getEtu();

    // ********** MODIFICATION ETUDIANT ********** //
    $scope.updateEtu = function(etu) {
      var etudiant = $scope.etu.etudiant[0];
      console.log(updateEtuPhoto);
      // data
      //   .updateEtu(
      //     etudiant.id,
      //     etudiant.nom,
      //     etudiant.prenom,
      //     updateEtuPhoto,
      //     etudiant.mail,
      //     etudiant.pre_diplome
      //   )
      //   .then(function() {
      //     location.reload(true);
      //   });
    };

    // ********** SUPPRESSION ETUDIANT ********** //
    $scope.destroyEtu = function(etu) {
      data.destroyEtu($stateParams.etu).then(function() {
        //location.reload(true);
        //closePanel();
        $state.go("trombi", $stateParams);
        //$state.go("trombi/" + $stateParams.trombi + "/" + $stateParams.periode);
        // console.log(
        //   "trombi/" + $stateParams.trombi + "/" + $stateParams.periode
        // );
      });
    };

    // ********** CREATION ETUDIANT ********** //
    $scope.createEtu = function(createEtuPhoto) {
      createEtuPhoto.upload = Upload.upload({
        url: "http://127.0.0.1:8000/api/etu/",
        data: {
          nom: $scope.createEtuNom,
          prenom: $scope.createEtuPrenom,
          photo: $scope.createEtuPhoto,
          mail: $scope.createEtuMail,
          diplome: $scope.createEtuDip,
          alt: $scope.createEtuStatut,
          groupe: $scope.createEtuGroupe,
          periode: $scope.currentEtuPeriode,
          formation: $scope.currentEtuFormation,
          file: $scope.createEtuPhoto
        }
      });

      createEtuPhoto.upload.then(
        function(response) {
          $timeout(function() {
            createEtuPhoto.result = response.data;
          });
        },
        function(response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ": " + response.data;
        },
        function(evt) {
          createEtuPhoto.progress = Math.min(
            100,
            parseInt(100.0 * evt.loaded / evt.total)
          );
        }
      );
      // .then(location.reload(true));
    };

    // $scope.createEtu = function(photo) {
    //   $scope.submitted = true;
    //   data
    //     .createEtu(
    //       $scope.createEtuNom,
    //       $scope.createEtuPrenom,
    //       $scope.createEtuMail,
    //       $scope.createEtuDip,
    //       $scope.createEtuStatut,
    //       $scope.createEtuPhoto,
    //       $scope.createEtuGroupe,
    //       $scope.createEtuPeriode,
    //       $scope.createEtuFormation
    //     )
    //     .then(function() {
    //       location.reload(true);
    //     });
    // };

    // input file
    var inputs = document.querySelectorAll(".inputfile");
    Array.prototype.forEach.call(inputs, function(input) {
      var label = input.nextElementSibling,
        labelVal = label.innerHTML;
      console.log(labelVal);
      input.addEventListener("change", function(e) {
        var fileName = "";
        fileName = e.target.value.split("\\").pop();
        if (fileName) label.querySelector("p").innerHTML = fileName;
        else label.innerHTML = labelVal;
      });
    });
  }
]);
