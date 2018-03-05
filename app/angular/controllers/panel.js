prjModule.controller("panel", [
  "$scope",
  "$state",
  "$stateParams",
  "data",
  function($scope, $state, $stateParams, data) {
    /*if ($state.current.name != 'trombi.afficher' || $state.current.name != 'trombi.modifier') {
    $state.go($state.current.name);
  }*/

    console.log($state);
    console.log($stateParams);

    let getEtu = function() {
      data.getEtu($stateParams.etu).then(function(etu) {
        $scope.etu = etu;
        console.log(etu);
        console.log("GET ETU");
      });
    };
    getEtu();

    // $scope.etu = {
    //   id_etu: 1,
    //   prenom: "Toto",
    //   nom: "Nom",
    //   photo: "photo.png",
    //   mail: "blabla@mail.cf",
    //   pre_diplome: "bac",
    //   alternant: true
    // };

    //filtres
    $scope.filtres = {
      alt: {
        options: [
          {
            title: "Alternance",
            value: "1",
            id: "alttrue"
          },
          {
            title: "Formation initiale",
            value: "0",
            id: "altfalse"
          },
          {
            title: "Tous",
            value: "null",
            id: "altall"
          }
        ],
        current: $stateParams.al ? $stateParams.al : "null",
        change: function() {
          var params = R.clone($stateParams);
          params.al =
            $scope.filtres.alt.current == "null"
              ? null
              : $scope.filtres.alt.current;
          $state.go($state.current.name, params, { location: true });
        }
      }
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
