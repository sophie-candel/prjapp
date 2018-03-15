prjModule.controller("panel", [
  "$scope",
  "$state",
  "$stateParams",
  "$location",
  "data",
  function($scope, $state, $stateParams, $location, data) {
    if ($state.current.name == "trombi.migrer") {
      $scope.dropdown = function() {
        $(".fakeselect-content").toggleClass("active");
        $(".fakeselect").toggleClass("active");
      };
    }
    /*if ($state.current.name != 'trombi.afficher' || $state.current.name != 'trombi.modifier') {
    $state.go($state.current.name);
  }*/
    // ********** AFFICHAGE ETUDIANT ********** //
    // let getEtu = function() {
    //   data.getEtu($stateParams.etu).then(function(etu) {
    //     $scope.etu = etu;
    //   });
    // };
    // getEtu();
    // ********** FILTRES ********** //
    // $scope.filtres = {
    //   // groupes
    //   groupes: {
    //     current: $stateParams.g ? $stateParams.g : null,
    //     change: function() {
    //       $state.go(
    //         $state.current.name,
    //         { g: $scope.filtres.groupes.current },
    //         {
    //           location: true
    //         }
    //       );
    //     }
    //   },
    //   // affichage email
    //   mail: {
    //     current: $stateParams.m == "1" ? "true" : "null",
    //     // current: $stateParams.m == "1" ? "true" : "null",
    //     change: function() {
    //       console.log($stateParams.m);
    //     }
    //   }
    // };
    // ********** CREATION ETUDIANT ********** //
    // $scope.createEtu = function(isValid) {
    //   $scope.submitted = true;
    //   data
    //     .createEtu(
    //       $scope.createEtuNom,
    //       $scope.createEtuPrenom,
    //       $scope.createEtuPhoto,
    //       $scope.createEtuEmail
    //     )
    //     .then(function() {
    //       getTrombi();
    //       location.reload(true);
    //     });
    // };
    // input file
    // var inputs = document.querySelectorAll(".inputfile");
    // Array.prototype.forEach.call(inputs, function(input) {
    //   var label = input.nextElementSibling,
    //     labelVal = label.innerHTML;
    //   console.log(labelVal);
    //   input.addEventListener("change", function(e) {
    //     var fileName = "";
    //     fileName = e.target.value.split("\\").pop();
    //     if (fileName) label.querySelector("p").innerHTML = fileName;
    //     else label.innerHTML = labelVal;
    //   });
    // });
  }
]);
