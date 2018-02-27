prjModule.controller('outils', ['$scope', '$state', '$stateParams', 'data', function($scope, $state, $stateParams, data) {

  if ($state.current.name == 'trombi.migrer') {
    $scope.dropdown = function(){
        $(".fakeselect-content").toggleClass("active");
        $(".fakeselect").toggleClass("active");
      }
  }else if($state.current.name == 'trombi.mail' || $state.current.name == 'trombi.mailto'){
    $scope.etu = {
      id_etu: 1,
      prenom: 'Prénom',
      nom: 'Nom',
      photo: 'photo.png',
      mail: 'blabla@mail.cf',
      pre_diplome: 'bac',
      alternant: true,
    };
    if($stateParams.etu){
      $scope.mailto = $scope.etu.mail;
    }else{
      $scope.mailto = false;
    }
  }
}]);
