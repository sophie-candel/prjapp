//var app = angular.module("prjApp", ["prjModule"]);
var prjModule = angular.module("prjModule", [
  "ui.router",
  "ngStorage",
  "ngFileUpload",
  "satellizer"
]);

////////////////////////////////////////////////////////////
// ROUTING
////////////////////////////////////////////////////////////
prjModule.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  $authProvider.loginUrl = "http://127.0.0.1:8000/api/login";
  $urlRouterProvider.otherwise("login");
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
      templateUrl: "views/trombi.html",
      controller: "trombi"
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
  "$state",
  "$stateParams",
  "$localStorage",
  "$location",
  "$auth",

  function($scope, $state, $stateParams, $localStorage, $location, $auth) {
    // $scope.logintest = function() {
    //   console.log("login");
    // };

    $scope.login = function() {
      username = $scope.username;
      password = $scope.password;
      $auth
        .login({ username: username, password: password })
        .then(function(response) {
          console.log(response);
          $auth.setToken(response);
          $state.go("formations");
        })
        .catch(function(response) {
          console.log("error response", response);
        });
    };

    // "use strict";
    // var vm = this;
    // vm.login = function() {
    //   var credentials = {
    //     username: vm.username,
    //     password: vm.password
    //   };
    //   // Use Satellizer's $auth service to login
    //   $auth.login(credentials).then(function(data) {
    //     // If login is successful, redirect to the users state
    //     // $state.go("formations", {});
    //     // $location.reload(true);
    //     console.log(credentials);
    //   });
    // };
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
          //console.log($stateParams.s);
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

prjModule.service("data", [
  "$http",
  "$state",
  "$stateParams",
  "$q",
  function($http, $state, $stateParams, $q) {
    const endpoint = "http://127.0.0.1:8000/api/";

    function makeRequest(req) {
      return $http({
        method: "GET",
        url: endpoint + req
      }).then(response => {
        return response.data;
      });
    }

    this.exportTrombi = function(trombiId, periodeId) {
      window.open(endpoint + "trombi/" + trombiId + "/" + periodeId + "/export");
    };

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

    // ********** SUPPRESSION ETUDIANT ********** //
    this.destroyEtu = function(id) {
      return $http({
        method: "DELETE",
        url: endpoint + "etu/" + id,
        headers: {
          "Content-Type": "application/json"
        }
      });
    };

    // ********** CREATION ETUDIANT ********** //

    // this.updateEtu = function(
    //   updateEtuNom,
    //   updateEtuPrenom,
    //   updateEtuMail,
    //   updateEtuDip,
    //   updateEtuStatut,
    //   updateEtuPhoto,
    //   updateEtuGroupe,
    //   updateEtuPeriode,
    //   updateEtuFormation
    // ) {
    //   return $http({
    //     method: "POST",
    //     url: endpoint + "etu/",
    //     data: {
    //       nom: updateEtuNom,
    //       prenom: updateEtuPrenom,
    //       photo: updateEtuPhoto,
    //       mail: updateEtuMail,
    //       diplome: updateEtuDip,
    //       alt: updateEtuStatut,
    //       groupe: updateEtuGroupe,
    //       periode: updateEtuPeriode,
    //       formation: updateEtuFormation
    //     },
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   });
    // };

    // ********** MODIFICATION ETUDIANT ********** //
    // this.updateEtu = function(
    //   etu,
    //   updateEtuNom,
    //   updateEtuPrenom,
    //   updateEtuMail,
    //   updateEtuStatut,
    //   updateEtuDip
    // ) {
    //   return $http({
    //     method: "PUT",
    //     url: endpoint + "etu/" + etu,
    //     data: {
    //       nom: updateEtuNom,
    //       prenom: updateEtuPrenom,
    //       mail: updateEtuMail,
    //       alt: updateEtuStatut,
    //       diplome: updateEtuDip
    //     },
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json"
    //     }
    //   });
    // };

    // ********** SEARCHBAR ********** //
    this.search = function(query) {
      return $http({
        method: "POST",
        url: endpoint + "search",
        data: { result: query }
      });
    };

    // ********** IMPORT CSV ********** //
    // this.importCsv = function(updateCsvFile) {
    //   return $http({
    //     method: "POST",
    //     url: endpoint + "importer"
    //     // data : {

    //     // }
    //   });
    // };
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
