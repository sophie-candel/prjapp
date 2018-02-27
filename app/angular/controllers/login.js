prjModule.controller("login", ["$scope", "data", function($scope, data) {}]);

// prjModule.controller('login', ['$scope', 'data', function($scope, data) {

//   $scope.login = {
//     user: '',
//     password: '',
//     change: function() {
//       data.login($scope.login.user)
//         .then((result) => {
//           //console.log(result);
//           if (result != "false") {
//             //console.log('user ok');
//             $('#user').removeClass('invalidInput');
//           } else {
//             //console.log('user error');
//             $('#user').addClass('invalidInput');
//           }
//         })
//         .catch((err) => {
//           if (err) {
//             console.log('user error');
//             $('#user').addClass('invalidInput');
//           }
//         });
//     },
//     submit: function() {
//       data.connect($scope.login.user, $scope.login.password)
//         .then((result) => {
//           if (result) {
//             if(!result.username){
//               $('#user').addClass('invalidInput');
//             }else{
//               $('#user').removeClass('invalidInput');
//             }
//             if(!result.password){
//               $('#pass').addClass('invalidInput');
//             }
//           } else {
//             console.log('login error');
//             $('#user').addClass('invalidInput');
//             $('#pass').addClass('invalidInput');
//           }
//         })
//         .catch((err) => {
//           if (err) {
//             console.log('login error');
//             $('#user').addClass('invalidInput');
//             $('#pass').addClass('invalidInput');
//           }
//         });
//     }
//   }

// }]);
