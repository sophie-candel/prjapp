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

    // ********** AFFICHAGE DEPARTEMENTS ********** //
    this.getDpt = function() {
      return makeRequest("dep");
    };

    // ********** AFFICHAGE TROMBI ********** //
    this.getTrombi = function(id, periode) {
      //console.log("id : " + id);
      //console.log("periode : " + periode);

      var req = "trombi/" + id + "/" + periode;
      //var req = "trombi/" + id + "/5";

      //console.log("requête : " + req);
      //console.log($stateParams);
      return makeRequest(req);
    };

    this.getEtu = function(id) {
      return makeRequest("etu/" + id);
    };

    // ********** CREATION ETUDIANT ********** //
    this.createEtu = function(
      createEtuNom,
      createEtuPrenom,
      createEtuPhoto,
      createEtuEmail
    ) {
      return $http({
        method: "POST",
        url: endpoint + "etu/",
        data: {
          nom: createEtuNom,
          prenom: createEtuPrenom,
          // photo: createEtuPhoto,
          email: createEtuEmail
        },
        headers: {
          "Content-Type": "application/json"
        }
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
