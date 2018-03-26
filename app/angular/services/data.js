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

    this.exportTrombi = function() {
      return makeRequest("export");
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
