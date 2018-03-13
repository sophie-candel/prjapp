prjModule.service("data", [
  "$http",
  "$state",
  function($http, $state) {
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
    this.getTrombi = function(id) {
      // if (id && periode) {
      //   var req = "trombi/" + id + "/" + periode;
      // } else if (id && !periode) {
      //   var req = "trombi/" + id + "/5";
      // }

      var req = "trombi/" + id + "/5";

      return makeRequest(req);
    };

    this.getEtu = function(id) {
      return makeRequest("etu/" + id);
    };

    // ********** CREATION ETUDIANT ********** //
    this.createEtu = function(
      createEtuNom,
      createEtuPrenom,
      // createEtuPhoto,
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

prjModule.service("user", [
  $http,
  localStorage,
  function($http, localStorage) {
    function checkIfLoggedIn() {
      if (localStorage.get("token")) return true;
      else return false;
    }

    function login(email, password, onSuccess, onError) {
      $http
        .post("/api/auth/login", {
          email: email,
          password: password
        })
        .then(
          function(response) {
            localStorage.set("token", response.data.token);
            onSuccess(response);
          },
          function(response) {
            onError(response);
          }
        );
    }

    function logout() {
      localStorage.remove("token");
    }

    function getCurrentToken() {
      return localStorage.get("token");
    }

    return {
      checkIfLoggedIn: checkIfLoggedIn,
      login: login,
      logout: logout,
      getCurrentToken: getCurrentToken
    };
  }
]);
