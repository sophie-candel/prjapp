var app = angular.module("prjApp", ["prjModule"]);
var prjModule = angular.module("prjModule", ["ui.router", "ngStorage"]);

////////////////////////////////////////////////////////////
// ROUTING
////////////////////////////////////////////////////////////
prjModule.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state("login", {
      url: "/login",
      templateUrl: "views/login.html",
      controller: "login"
    })
    .state("formations", {
      url: "/",
      templateUrl: "views/formations.html",
      controller: "formations"
    })
    .state("trombi", {
      url: "/trombi/{trombi}/{periode}?g&m&s",
      //url: "/trombi/{trombi}?periode&g",
      //url: "/trombi/{trombi}",
      //url: "/trombi/{trombi}a&s&g",
      templateUrl: "views/trombi.html",
      controller: "trombi"
      // params: {
      //   g: 1
      // }
    })
    .state("trombi.afficher", {
      url: "/etu/{etu}",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi"
        },
        "panel@trombi": {
          templateUrl: "includes/afficher.html",
          controller: "etudiants"
        }
      }
    })
    .state("trombi.modifier", {
      url: "/modifier/{etu}",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi"
        },
        "panel@trombi": {
          templateUrl: "includes/modifier.html",
          controller: "etudiants"
        }
      }
    })
    .state("trombi.creer", {
      url: "/creer",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi"
        },
        "panel@trombi": {
          templateUrl: "includes/creer.html",
          controller: "etudiants"
        }
      }
    })
    .state("trombi.filtres", {
      url: "/filtrer",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi"
        },
        "panel@trombi": {
          templateUrl: "includes/filtres.html",
          controller: "filtres"
        }
      }
    })
    .state("trombi.importer", {
      url: "/importer",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi"
        },
        "panel@trombi": {
          templateUrl: "includes/importer.html",
          controller: "panel"
        }
      }
    })
    .state("trombi.imprimer", {
      url: "/imprimer",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi"
        },
        "panel@trombi": {
          templateUrl: "includes/imprimer.html",
          controller: "filtres"
        }
      }
    })
    .state("trombi.exporter", {
      url: "/exporter",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi"
        },
        "panel@trombi": {
          templateUrl: "includes/exporter.html",
          controller: "panel"
        }
      }
    })
    .state("trombi.migrer", {
      url: "/migrer",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi"
        },
        "panel@trombi": {
          templateUrl: "includes/migrer.html",
          controller: "panel"
        }
      }
    })
    .state("trombi.mail", {
      url: "/mail",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi"
        },
        "panel@trombi": {
          templateUrl: "includes/mail.html",
          controller: "panel"
        }
      }
    });
  // .state("trombi.mailto", {
  //   url: "/mail/{etu}",
  //   views: {
  //     "": {
  //       templateUrl: "views/trombi.html",
  //       controller: "trombi"
  //     },
  //     "panel@trombi": {
  //       templateUrl: "includes/mail.html",
  //       controller: "panel"
  //     }
  //   }
  // });
});

prjModule.controller("formations", [
  "$scope",
  "data",
  function($scope, data) {
    // ********** AFFICHAGE DEPARTEMENTS ********** //
    let getDpt = function() {
      data.getDpt().then(function(departements) {
        $scope.departements = departements;
      });
    };
    getDpt();
  }
]);

prjModule.controller("login", [
  "$scope",
  "$location",
  "user",
  "$state",
  function($scope, $location, user, $state) {
    $scope.login = function() {
      user.login(
        $scope.email,
        $scope.password,
        function(response) {
          //$location.path("/");
          $state.go("/");
        },
        function(response) {
          alert("erreur lors de la connection");
        }
      );
    };

    //$scope.mail = "";
    $scope.password = "";

    if (user.checkIfLoggedIn()) $location.path("/");
  }
]);


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

prjModule.controller("filtres", [
  "$scope",
  "$state",
  "$stateParams",
  "$location",
  "data",
  function($scope, $state, $stateParams, $location, data) {
    /*if ($state.current.name != 'trombi.afficher' || $state.current.name != 'trombi.modifier') {
    $state.go($state.current.name);
  }*/

    $scope.filtres = {
      // ********** GROUPES ********** //
      groupes: {
        current: $stateParams.g ? $stateParams.g : null,
        change: function() {
          $state.go(
            $state.current.name,
            { g: $scope.filtres.groupes.current },
            {
              location: true
            }
          );
        }
      },

      // ********** PERIODES ********** //
      periodes: {
        current: $stateParams.periode ? $stateParams.periode : null,
        // if ($stateParams.periode) {
        //   $stateParams.periode = $stateParams.periode;
        // }
        // else {
        //   $stateParams.periode = null;
        // }
        change: function() {
          $state.go(
            $state.current.name,
            {
              periode: $scope.filtres.periodes.current
            },
            {
              location: true
            }
          );
        }
      },

      mail: {
        current: $stateParams.m == "true",
        change: function() {
          $state.go(
            $state.current.name,
            { m: $scope.filtres.mail.current },
            { location: true }
          );
        }
      },
      statut: {
        current: $stateParams.s == "true",
        change: function() {
          $state.go(
            $state.current.name,
            { s: $scope.filtres.statut.current },
            { location: true }
          );
          console.log($stateParams.s);
        }
      }
    };

    // ********** PRINT ********** //
    $scope.print = function() {
      window.print();
    };
  }
]);

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

prjModule.service("data", [
  "$http",
  "$state",
  "$stateParams",
  function($http, $state, $stateParams) {
    const endpoint = "http://127.0.0.1:8000/api/";

    function makeRequest(req) {
      return $http({
        method: "GET",
        url: endpoint + req
      }).then(response => {
        return response.data;
      });
    }

    // ********** SEARCHBAR ********** //
    this.getSearch = function() {
      return makeRequest("search");
    };

    // ********** AFFICHAGE DEPARTEMENTS ********** //
    this.getDpt = function() {
      return makeRequest("dep");
    };

    // ********** AFFICHAGE TROMBI ********** //
    this.getTrombi = function(id, periode) {
      var req = "trombi/" + id + "/" + periode;
      return makeRequest(req);
    };

    // ********** AFFICHAGE ETUDIANT ********** //
    this.getEtu = function(id) {
      return makeRequest("etu/" + id);
    };

    // ********** CREATION ETUDIANT ********** //
    this.createEtu = function(
      createEtuNom,
      createEtuPrenom,
      createEtuMail,
      createEtuDip,
      createEtuStatut
    ) {
      return $http({
        method: "POST",
        url: endpoint + "etu/",
        data: {
          nom: createEtuNom,
          prenom: createEtuPrenom,
          mail: createEtuMail,
          diplome: createEtuDip,
          alt: createEtuStatut
        },
        headers: {
          "Content-Type": "application/json"
        }
      });
    };

    // ********** SEARCHBAR ********** //
    this.search = function(query) {
      return $http({
        method: "POST",
        url: endpoint + "search",
        data: { result: query }
      });
    };

    // ********** IMPORT CSV ********** //
    this.importCsv = function(createCsvFile) {
      return $http({
        method: "POST",
        url: endpoint + "importer"
        // data : {

        // }
      });
    };
  }
]);

prjModule.service("user", [
  "$http",
  "$localStorage",
  function($http, $localStorage) {
    const endpoint = "http://127.0.0.1:8000/api/";

    function checkIfLoggedIn() {
      if ($localStorage.get("token")) return true;
      else return false;
    }

    function login(email, password, onSuccess, onError) {
      $http
        .post(endpoint + "/user", {
          email: email,
          password: password
        })
        .then(
          function(response) {
            $localStorage.set("token", response.data.token);
            onSuccess(response);
          },
          function(response) {
            onError(response);
          }
        );
    }

    function logout() {
      $localStorage.remove("token");
    }

    function getCurrentToken() {
      return $localStorage.get("token");
    }

    return {
      checkIfLoggedIn: checkIfLoggedIn,
      login: login,
      logout: logout,
      getCurrentToken: getCurrentToken
    };
  }
]);
