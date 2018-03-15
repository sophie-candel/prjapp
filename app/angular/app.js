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
      url: "/trombi/{trombi}/{periode}?g&m",
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
