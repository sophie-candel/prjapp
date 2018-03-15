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
