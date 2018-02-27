// prjModule.controller('search', ['$scope', '$state', '$stateParams', 'data', function ($scope, $state, $stateParams, data) {
//   // search
//   $scope.search = {
//     query: '',
//     result: {
//       formation: [],
//       etu: []
//     },
//     response: {
//       formation: [],
//       etu: []
//     },
//     request: function () {
//       if ($scope.search.query.length < 0) {
//         $scope.search.reset();
//       } else if ($scope.search.query.length == 1) {
//         data.search($scope.search.query).then((res)=>{
//           $scope.search.response = res;
//           console.log(res);
//         });
//         $scope.search.result = R.clone($scope.search.response);
//       } else if ($scope.search.query.length >= 0) {
//         var req = new RegExp('^' + $scope.search.query, 'i');
//         if ($scope.search.result.formation) {
//           $scope.search.result.formation = R.clone($scope.search.response.formation).filter(function (fo) {
//             if (R.test(req, fo.nom)) {
//               return fo;
//             }
//           });
//         }
//         if ($scope.search.result.etu) {
//           $scope.search.result.etu = R.clone($scope.search.response.etu).filter(function (et) {
//             if (R.test(req, et.nom)) {
//               return et;
//             }
//             if (R.test(req, et.prenom)) {
//               return et;
//             }
//             if (R.test(req, et.prenom + ' ' + et.nom)) {
//               return et;
//             }
//             if (R.test(req, et.nom + ' ' + et.prenom)) {
//               return et;
//             }
//           });
//         }
//       }
//     },
//     reset: function () {
//       $scope.search.result = {
//         formation: [],
//         etu: []
//       };
//       $scope.search.query = null;
//     },
//     show: function () {
//       $(".resultbox-bg").show();
//       $("#reset-search").show();
//       $('html, body').css({
//         overflow: 'hidden',
//         height: '100%'
//       });
//       $scope.closePanel();
//       $scope.search.request();
//     },
//     hide: function () {
//       $scope.search.reset();
//       $(".resultbox-bg").hide();
//       $("#reset-search").hide();
//       $('html, body').css({
//         overflow: 'auto',
//         height: 'auto'
//       });
//     }
//   }

// }]);
