prjModule.controller("panel", [
  "$scope",
  "$state",
  "$stateParams",
  "$location",
  "data",
  function($scope, $state, $stateParams, $location, data) {
    /*if ($state.current.name != 'trombi.afficher' || $state.current.name != 'trombi.modifier') {
    $state.go($state.current.name);
  }*/

    // console.log($state);
    // console.log($stateParams);

    let getEtu = function() {
      data.getEtu($stateParams.etu).then(function(etu) {
        $scope.etu = etu;
      });
    };
    getEtu();

    // if ($stateParams.g != null && $stateParams.g) {
    //   var currentGroupId;
    //   $scope.trombinoscopes.groupes.forEach(function(i) {
    //     if (i.groupe == $stateParams.g) {
    //       currentGroupId = i.id_gro;
    //     }
    //   });
    //   $scope.trombi.etudiants = R.clone($scope.trombi.etudiants).filter(function(el) {
    //     if (R.contains({
    //         id_gro: currentGroupId
    //       }, el.groupes)) {
    //       return el
    //     }
    //   });
    //   $scope.current.groupe = $stateParams.g;
    // }

    //filtres
    $scope.filtres = {
      groupes: {
        current: $stateParams.g ? $stateParams.g : null,

        change: function() {
          var params = $stateParams;
          params.g = $scope.filtres.groupes.current;

          console.log("params.g : " + params.g);
          console.log("state.current.name : " + $state.current.name);

          // var url = $location.path();
          // $location.path(url + "?g=DWEB");

          // $state.go($state.current.name, params, {
          //   location: true
          // });
          // console.log("location : " + location);
          console.log($location.path);
        }
      }
    };

    $scope.filter = function() {
      // var groupe = $stateParams.g;
      // console.log($stateParams.g);
      // var params = $stateParams;
      // params.g = $scope.filtres.groupes.current;
      // //console.log(params);
      // console.log(params.g);
      // $state.go($state.current.name, params, {
      //   location: true
      // });
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

    // print
    $scope.print = function() {
      window.print();
    };
  }
]);
