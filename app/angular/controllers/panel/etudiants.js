prjModule.controller("etudiants", [
  "$scope",
  "$state",
  "$stateParams",
  "$location",
  "data",
  function($scope, $state, $stateParams, $location, data) {
    /*if ($state.current.name != 'trombi.afficher' || $state.current.name != 'trombi.modifier') {
    $state.go($state.current.name);
  }*/

    // ********** AFFICHAGE ETUDIANT ********** //
    let getEtu = function() {
      data.getEtu($stateParams.etu).then(function(etu) {
        $scope.etu = etu;
      });
    };
    getEtu();

    // ********** CREATION ETUDIANT ********** //
    $scope.createEtu = function(isValid) {
      //console.log(createEtu);
      $scope.submitted = true;
      data
        .createEtu(
          $scope.createEtuNom,
          $scope.createEtuPrenom,
          $scope.createEtuMail,
          $scope.createEtuDip,
          $scope.createEtuStatut
        )
        .then(function() {
          //getTrombi();
          location.reload(true);
        });
    };

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
