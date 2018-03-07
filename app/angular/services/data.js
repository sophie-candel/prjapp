// import angular from "angular";
// import environnement from "../../../environnement";
// var prjModule = angular.module("prjModule");

prjModule.service("data", [
  "$http",
  "$state",
  function($http, $state) {
    // let reqDone = [];
    const endpoint = "http://127.0.0.1:8000/api/";


    // effectue une requête sur l'url `req`
    function makeRequest(req) {
      // if (req in reqDone) {
      //   return new Promise(function(resolve, reject) {
      //     console.log(reqDone[req]);
      //     resolve(reqDone[req]);
      //   });
      // } else {
        return $http({
          method: "GET",
          url: endpoint + req
        }).then(response => {
          // reqDone[req] = response.data; // mettre cette ligne en commentaire si souhaite à chaque fois refaire la requête
          return response.data;
        });
      // }
    }

    this.getDpt = function() {
      return makeRequest('dep');
    };

    this.getTrombi = function(id, annee, semestre) {
      //var req = "trombi/" + id + "/" + annee + "/" + semestre;
      var req = "trombi/" + id + "/2017-2018" + "/5";
      return makeRequest(req);
    };

    // this.getTrombi = function(id, annee, semestre) {
    //   var req = "trombi/" + id + "/" + annee + "/" + semestre;
    //   return $http({
    //     method: "GET",
    //     url: endpoint + req
    //   }).then(function(response) {
    //     return response.data;
    //   });
    // };

    this.getEtu = function(id) {
      return makeRequest("etu/" + id);
    };

    // création d'un élève
    // this.createEtu = function(
    //   createEtunom,
    //   createEtuPrenom,
    //   createEtuPhoto,
    //   createEtuMail
    // ) {
    //   return $http({
    //     method: "POST",
    //     url: endpoint + "etu/",
    //     data: {
    //       nom: createEtunom,
    //       prenom: createEtuPrenom,
    //       phot: createEtuPhoto,
    //       mail: createEtuMail
    //     }
    //   });
    // };
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
