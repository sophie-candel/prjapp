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
