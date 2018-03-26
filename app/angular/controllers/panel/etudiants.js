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

        etu.etudiant.forEach(function(elt) {
          elt.groupes.forEach(function(gp) {
            $scope.selectedGroup = gp.id;
          });
        });
      });
    };
    getEtu();

    // ********** MODIFICATION ETUDIANT ********** //

    $scope.updateEtu = function(updateEtuPhoto) {
      var etudiant = $scope.etu.etudiant[0];
      //console.log(etudiant.groupes[0].nom);

      // if (typeof updateEtuPhoto === "undefined" || updateEtuPhoto === null) {
      //   updateEtuPhoto = "etu.png";
      // } else {
      //   updateEtuPhoto = updateEtuPhoto;
      // }

      // console.log(updateEtuPhoto);
      //console.log($scope.selectedGroup);

      console.log(etudiant.groupes);

      updateEtuPhoto.upload = Upload.upload({
        url: "http://127.0.0.1:8000/api/etu/" + etudiant.id,
        data: {
          nom: etudiant.nom,
          prenom: etudiant.prenom,
          photo: updateEtuPhoto,
          mail: etudiant.mail,
          diplome: etudiant.pre_diplome,
          alt: etudiant.alternant,
          groupe: $scope.selectedGroup,
          periode: $scope.currentEtuPeriode,
          formation: $scope.currentEtuFormation,
          file: updateEtuPhoto,
          _method: "PUT"
        }
      });
      updateEtuPhoto.upload
        .then(
          function(response) {
            $timeout(function() {
              updateEtuPhoto.result = response.data;
            });
          },
          function(response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ": " + response.data;
          },
          function(evt) {
            updateEtuPhoto.progress = Math.min(
              100,
              parseInt(100.0 * evt.loaded / evt.total)
            );
          }
        )
        //.catch(console.log("une erreur est survenue"))
        .then(function() {
          $state.go(
            "trombi",
            $stateParams.trombi,
            $stateParams.periode,
            etudiant.id
          );
          location.reload(true);
        });
    };

    // ********** SUPPRESSION ETUDIANT ********** //
    $scope.destroyEtu = function(etu) {
      data.destroyEtu($stateParams.etu).then(function() {
        $state.go("trombi", $stateParams.trombi, $stateParams.periode);
        location.reload(true);
      });
    };

    // ********** CREATION ETUDIANT ********** //
    $scope.createEtu = function(createEtuPhoto) {
      console.log($scope.createEtuGroupe);
      createEtuPhoto.upload = Upload.upload({
        url: "http://127.0.0.1:8000/api/etu/",
        method: "POST",
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
      createEtuPhoto.upload
        .then(
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
        )
        .then(function() {
          location.reload(true);
        });
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
