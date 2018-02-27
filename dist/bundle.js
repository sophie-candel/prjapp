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
      // url: "/trombi/{trombi}?a&s&g&al&m",
      url: "/trombi/{trombi}",
      //url: "/trombi/{trombi}a&s&g",
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
          controller: "panel"
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
          controller: "panel"
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
          controller: "panel"
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
          controller: "panel"
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
    })
    .state("trombi.mailto", {
      url: "/mail/{etu}",
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
});

// import angular from "angular";
// var prjModule = angular.module("prjModule");

prjModule.controller("formations", [
  "$scope",
  "data",
  function($scope, data) {
    let getDpt = function() {
      data.getDpt().then(function(departements) {
        $scope.departements = departements;
      });
    };
    getDpt();
  }
]);

// prjModule.controller("formations", [
//   "$scope",
//   "data",
//   function($scope, data) {
//     $scope.formations = {
//       departement: [
//         {
//           id_dep: 0,
//           nom: "MMI",
//           couleur: "#9ccc65",
//           image: "mmi.png",
//           formation: [
//             {
//               id_for: 0,
//               nom: "DUT MMI 1"
//             },
//             {
//               id_for: 1,
//               nom: "DUT MMI 2"
//             },
//             {
//               id_for: 2,
//               nom: "LP TAIS"
//             }
//           ]
//         },
//         {
//           id_dep: 1,
//           nom: "QLIO",
//           couleur: "#1da7e6",
//           formation: [
//             {
//               id_for: 3,
//               nom: "DUT QLIO 1"
//             },
//             {
//               id_for: 4,
//               nom: "DUT QLIO 2"
//             },
//             {
//               id_for: 5,
//               nom: "LP LPI"
//             },
//             {
//               id_for: 6,
//               nom: "LP NEQ"
//             }
//           ]
//         },
//         {
//           id_dep: 2,
//           nom: "GEII",
//           couleur: "#f46236",
//           formation: [
//             {
//               id_for: 7,
//               nom: "DUT GEII 1"
//             },
//             {
//               id_for: 8,
//               nom: "DUT GEII 2"
//             },
//             {
//               id_for: 10,
//               nom: "LP SERI"
//             }
//           ]
//         }
//       ]
//     };
//   }
// ]);

prjModule.controller("login", ["$scope", "data", function($scope, data) {}]);

// prjModule.controller('login', ['$scope', 'data', function($scope, data) {

//   $scope.login = {
//     user: '',
//     password: '',
//     change: function() {
//       data.login($scope.login.user)
//         .then((result) => {
//           //console.log(result);
//           if (result != "false") {
//             //console.log('user ok');
//             $('#user').removeClass('invalidInput');
//           } else {
//             //console.log('user error');
//             $('#user').addClass('invalidInput');
//           }
//         })
//         .catch((err) => {
//           if (err) {
//             console.log('user error');
//             $('#user').addClass('invalidInput');
//           }
//         });
//     },
//     submit: function() {
//       data.connect($scope.login.user, $scope.login.password)
//         .then((result) => {
//           if (result) {
//             if(!result.username){
//               $('#user').addClass('invalidInput');
//             }else{
//               $('#user').removeClass('invalidInput');
//             }
//             if(!result.password){
//               $('#pass').addClass('invalidInput');
//             }
//           } else {
//             console.log('login error');
//             $('#user').addClass('invalidInput');
//             $('#pass').addClass('invalidInput');
//           }
//         })
//         .catch((err) => {
//           if (err) {
//             console.log('login error');
//             $('#user').addClass('invalidInput');
//             $('#pass').addClass('invalidInput');
//           }
//         });
//     }
//   }

// }]);

prjModule.controller('main', ['$scope', 'data',  function ( $scope, data) {



}]);

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

    $scope.etu = {
      id_etu: 1,
      prenom: "Prénom",
      nom: "Nom",
      photo: "photo.png",
      mail: "blabla@mail.cf",
      pre_diplome: "bac",
      alternant: true
    };

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

// prjModule.controller('search', ['$scope', '$state', '$stateParams', 'data', function ($scope, $state, $stateParams, data) {
//   // search
//   $scope.search = {
//     query: '',
//     result: {
//       formation: [],
//       etu: []
//     },
//     response: {
//       formation: [],
//       etu: []
//     },
//     request: function () {
//       if ($scope.search.query.length < 0) {
//         $scope.search.reset();
//       } else if ($scope.search.query.length == 1) {
//         data.search($scope.search.query).then((res)=>{
//           $scope.search.response = res;
//           console.log(res);
//         });
//         $scope.search.result = R.clone($scope.search.response);
//       } else if ($scope.search.query.length >= 0) {
//         var req = new RegExp('^' + $scope.search.query, 'i');
//         if ($scope.search.result.formation) {
//           $scope.search.result.formation = R.clone($scope.search.response.formation).filter(function (fo) {
//             if (R.test(req, fo.nom)) {
//               return fo;
//             }
//           });
//         }
//         if ($scope.search.result.etu) {
//           $scope.search.result.etu = R.clone($scope.search.response.etu).filter(function (et) {
//             if (R.test(req, et.nom)) {
//               return et;
//             }
//             if (R.test(req, et.prenom)) {
//               return et;
//             }
//             if (R.test(req, et.prenom + ' ' + et.nom)) {
//               return et;
//             }
//             if (R.test(req, et.nom + ' ' + et.prenom)) {
//               return et;
//             }
//           });
//         }
//       }
//     },
//     reset: function () {
//       $scope.search.result = {
//         formation: [],
//         etu: []
//       };
//       $scope.search.query = null;
//     },
//     show: function () {
//       $(".resultbox-bg").show();
//       $("#reset-search").show();
//       $('html, body').css({
//         overflow: 'hidden',
//         height: '100%'
//       });
//       $scope.closePanel();
//       $scope.search.request();
//     },
//     hide: function () {
//       $scope.search.reset();
//       $(".resultbox-bg").hide();
//       $("#reset-search").hide();
//       $('html, body').css({
//         overflow: 'auto',
//         height: 'auto'
//       });
//     }
//   }

// }]);

prjModule.controller("trombi", [
  "$scope",
  "$state",
  "$stateParams",
  "data",
  function($scope, $state, $stateParams, data) {
    let getTrombi = function() {
      data.getTrombi($stateParams.trombi).then(function(trombi) {
        $scope.trombi = trombi;
      });
    };
    getTrombi();

    // filtrage
    // $scope.trombinoscopes = data.trombi($stateParams.trombi);
    // $scope.trombi = R.clone($scope.trombinoscopes);
    // switch ($stateParams.al) {
    //   case null:
    //     $scope.trombi.etudiants = R.clone($scope.trombinoscopes.etudiants);
    //     break;
    //   case "null":
    //     $scope.trombi.etudiants = R.clone($scope.trombinoscopes.etudiants);
    //     break;
    //   case "1":
    //     $scope.trombi.etudiants = R.clone(
    //       $scope.trombinoscopes.etudiants
    //     ).filter(function(el) {
    //       if (el.alternant) {
    //         return el;
    //       }
    //     });
    //     break;
    //   case "0":
    //     $scope.trombi.etudiants = R.clone(
    //       $scope.trombinoscopes.etudiants
    //     ).filter(function(el) {
    //       if (!el.alternant) {
    //         return el;
    //       }
    //     });
    //     break;
    //   default:
    //     var params = R.clone($stateParams);
    //     params.al = null;
    //     $state.go($state.current.name, params, { location: true });
    // }

    // panel
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
    $(window).blur(function() {
      $scope.closePanel();
    });
  }
]);

prjModule.controller('etudiants', ['$scope', '$state', '$stateParams', 'data', function($scope, $state, $stateParams, data) {

  /*
  //upload
  $scope.add = function() {
    var f = document.getElementById('photo').files[0],
        r = new FileReader();

    r.onloadend = function(e) {
      var data = e.target.result;
    }

    r.readAsBinaryString(f);
  }
  */
  $scope.inputs = {
    prenom: '',
    nom: '',
    photo: '',
    file: '',
    email: '',
    alternant: true,
    pre_diplome: ''
  }

  $scope.save = function() {
    var saveData = {
      nom: $scope.etu.nom,
      prenom: $scope.etu.prenom,
      alternant: $scope.etu.alternant,
      mail: $scope.etu.mail,
      photo: $scope.etu.photo,
      pre_diplome: $scope.etu.pre_diplome
    }
    saveData.alternant = ((saveData.alternant == 'true' || saveData.alternant == true) ? true : false);
    //console.log(saveData);
    data.etu.update($scope.etu.id_etu, saveData).then((res) => {
      //console.log(res[0]);
      $scope.etu = res[0];
      $scope.etu.alternant = (($scope.etu.alternant == 'true' || $scope.etu.alternant == true) ? 'true' : 'false');
    });
  }

  // get student
  data.etu.get($stateParams.etu).then((res) => {
    //console.log(res[0]);
    $scope.etu = res[0];
    $scope.etu.alternant = (($scope.etu.alternant == 'true' || $scope.etu.alternant == true) ? 'true' : 'false');
  });

  // input file
  var inputs = document.querySelectorAll('.inputfile');
  Array.prototype.forEach.call(inputs, function(input) {
    var label = input.nextElementSibling,
      labelVal = label.innerHTML;
    //console.log(labelVal);
    input.addEventListener('change', function(e) {
      var fileName = '';
      fileName = e.target.value.split('\\').pop();
      if (fileName)
        label.querySelector('p').innerHTML = fileName;
      else
        label.innerHTML = labelVal;
    });
  });
}]);

prjModule.controller('filtres', ['$scope', '$state', '$stateParams', 'data', function($scope, $state, $stateParams, data) {
  //filtres
  $scope.filtres = {
    alt: {
      options: [{
        title: 'Alternance',
        value: '1',
        id: 'alttrue'
      }, {
        title: 'Formation initiale',
        value: '0',
        id: 'altfalse'
      }, {
        title: 'Tous',
        value: 'null',
        id: 'altall'
      }],
      current: (($stateParams.al) ? $stateParams.al : 'null'),
      change: function() {
        var params = R.clone($stateParams);
        params.al = (($scope.filtres.alt.current == 'null') ? null : $scope.filtres.alt.current);
        $state.go($state.current.name, params, {
          location: true
        });
      }
    },
    groupes: {
      current: (($stateParams.g) ? $stateParams.g : null),
      change: function() {
        console.log($scope.filtres.groupes.current);
        var params = R.clone($stateParams);
        params.g = $scope.filtres.groupes.current;
        $state.go($state.current.name, params, {
          location: true
        });
      }
    },
    mail: {
      current: (($stateParams.m == '1') ? 'true' : 'null'),
      change: function() {
        var params = R.clone($stateParams);
        params.m = (($scope.filtres.mail.current == 'true') ? '1' : null);
        $state.go($state.current.name, params, {
          location: true
        });
      }
    }
  }

  if ($state.current.name == 'trombi.imprimer') {
    // print
    $scope.print = function() {
      window.print();
    }
  }
}]);

prjModule.controller('outils', ['$scope', '$state', '$stateParams', 'data', function($scope, $state, $stateParams, data) {

  if ($state.current.name == 'trombi.migrer') {
    $scope.dropdown = function(){
        $(".fakeselect-content").toggleClass("active");
        $(".fakeselect").toggleClass("active");
      }
  }else if($state.current.name == 'trombi.mail' || $state.current.name == 'trombi.mailto'){
    $scope.etu = {
      id_etu: 1,
      prenom: 'Prénom',
      nom: 'Nom',
      photo: 'photo.png',
      mail: 'blabla@mail.cf',
      pre_diplome: 'bac',
      alternant: true,
    };
    if($stateParams.etu){
      $scope.mailto = $scope.etu.mail;
    }else{
      $scope.mailto = false;
    }
  }
}]);

// import angular from "angular";
// import environnement from "../../../environnement";
// var prjModule = angular.module("prjModule");

prjModule.service("data", [
  "$http",
  "$state",
  function($http, $state) {
    const endpoint = "http://127.0.0.1:8000/api/";

    this.getDpt = function() {
      return $http({
        method: "GET",
        url: endpoint + "dep"
      }).then(function(response) {
        return response.data;
      });
    };

    this.getTrombi = function(id) {
      var req = "trombi/" + id + "/2" + "/5";
      return $http({
        method: "GET",
        url: endpoint + req
      }).then(function(response) {
        return response.data;
      });
    };
  }
]);

// URL = environment.BASE_URL;
// headers = {
//   "Access-Control-Allow-Origin": "*"
// };
// options = {};
// params: HttpParams;

//   constructor(public http: HttpClient) {}

//   setOptions(opt) {
//     if (typeof opt !== 'undefined') {
//       if (opt.logged) {
//         const user = JSON.parse(window.localStorage.getItem('login'));
//         const opts = {
//           ...opt,
//           authKey: user.logged.user.authKey.toString(),
//           authToken: user.logged.user.authToken.toString()
//         };
//         this.headers = {
//           ...this.headers,
//           ...opts
//         };
//       } else {
//         this.headers = { ...this.headers, ...opt };
//       }
//     }
//     this.options = { headers: new HttpHeaders(this.headers) };
//   }

//   get(endpoint: string, reqOpts?: any) {
//     this.setOptions(reqOpts);
//     return this.http.get(URL + endpoint, this.options);
//   }
//   post(endpoint: string, body: any, reqOpts?: any) {
//     this.setOptions(reqOpts);
//     return this.http.post(endpoint, body, this.options);
//   }
//   put(endpoint: string, body: any, reqOpts?: any) {
//     this.setOptions(reqOpts);
//     return this.http.put(endpoint, body, this.options);
//   }
//   delete(endpoint: string, reqOpts?: any) {
//     this.setOptions(reqOpts);
//     return this.http.delete(endpoint, this.options);
//   }
//   patch(endpoint: string, body: any, reqOpts?: any) {
//     this.setOptions(reqOpts);
//     return this.http.put(endpoint, body, this.options);
//   }
// }
