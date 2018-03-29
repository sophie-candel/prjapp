prjModule.service("user", [
  "$http",
  function($http) {
    const endpoint = "http://127.0.0.1:8000/api/";

    function checkIfLoggedIn() {
      if (localStorage.getItem("token")) return true;
      else return false;
    }

    function login(username, password, onSuccess, onError) {
      $http
        .post(endpoint + "login", {
          username: username,
          password: password
        })
        .then(
          function(response) {
            localStorage.setItem("token", response.data.data.token);
            onSuccess(response);
          },
          function(response) {
            onError(response);
          }
        );
    }

    function logout() {
      localStorage.removeItem("token");
    }

    function getCurrentToken() {
      return localStorage.getItem("token");
    }

    return {
      checkIfLoggedIn: checkIfLoggedIn,
      login: login,
      logout: logout,
      getCurrentToken: getCurrentToken
    };
  }
]);
