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
      controller: "formations",
      data: { requiredLogin: true }
    })
    .state("trombi", {
      url: "/trombi/{trombi}/{periode}?g&m&s",
      templateUrl: "views/trombi.html",
      controller: "trombi",
      data: { requiredLogin: true }
    })
    .state("trombi.afficher", {
      url: "/etu/{etu}",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi",
          data: { requiredLogin: true }
        },
        "panel@trombi": {
          templateUrl: "includes/afficher.html",
          controller: "etudiants",
          data: { requiredLogin: true }
        }
      }
    })
    .state("trombi.modifier", {
      url: "/modifier/{etu}",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi",
          data: { requiredLogin: true }
        },
        "panel@trombi": {
          templateUrl: "includes/modifier.html",
          controller: "etudiants",
          data: { requiredLogin: true }
        }
      }
    })
    .state("trombi.creer", {
      url: "/creer",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi",
          data: { requiredLogin: true }
        },
        "panel@trombi": {
          templateUrl: "includes/creer.html",
          controller: "etudiants",
          data: { requiredLogin: true }
        }
      }
    })
    .state("trombi.filtres", {
      url: "/filtrer",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi",
          data: { requiredLogin: true }
        },
        "panel@trombi": {
          templateUrl: "includes/filtres.html",
          controller: "filtres",
          data: { requiredLogin: true }
        }
      }
    })
    .state("trombi.importer", {
      url: "/importer",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi",
          data: { requiredLogin: true }
        },
        "panel@trombi": {
          templateUrl: "includes/importer.html",
          controller: "panel",
          data: { requiredLogin: true }
        }
      }
    })
    .state("trombi.imprimer", {
      url: "/imprimer",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi",
          data: { requiredLogin: true }
        },
        "panel@trombi": {
          templateUrl: "includes/imprimer.html",
          controller: "filtres",
          data: { requiredLogin: true }
        }
      }
    })
    .state("trombi.exporter", {
      url: "/exporter",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi",
          data: { requiredLogin: true }
        },
        "panel@trombi": {
          templateUrl: "includes/exporter.html",
          controller: "panel",
          data: { requiredLogin: true }
        }
      }
    })
    .state("trombi.migrer", {
      url: "/migrer",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi",
          data: { requiredLogin: true }
        },
        "panel@trombi": {
          templateUrl: "includes/migrer.html",
          controller: "panel",
          data: { requiredLogin: true }
        }
      }
    })
    .state("trombi.mail", {
      url: "/mail",
      views: {
        "": {
          templateUrl: "views/trombi.html",
          controller: "trombi",
          data: { requiredLogin: true }
        },
        "panel@trombi": {
          templateUrl: "includes/mail.html",
          controller: "panel",
          data: { requiredLogin: true }
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
