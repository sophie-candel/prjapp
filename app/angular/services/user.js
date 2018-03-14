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
