prjModule.controller('etudiants', ['$scope', '$state', '$stateParams', 'data', function($scope, $state, $stateParams, data) {

  /*
  //upload
  $scope.add = function() {
    var f = document.getElementById('photo').files[0],
        r = new FileReader();

    r.onloadend = function(e) {
      var data = e.target.result;
    }

    r.readAsBinaryString(f);
  }
  */
  $scope.inputs = {
    prenom: '',
    nom: '',
    photo: '',
    file: '',
    email: '',
    alternant: true,
    pre_diplome: ''
  }

  $scope.save = function() {
    var saveData = {
      nom: $scope.etu.nom,
      prenom: $scope.etu.prenom,
      alternant: $scope.etu.alternant,
      mail: $scope.etu.mail,
      photo: $scope.etu.photo,
      pre_diplome: $scope.etu.pre_diplome
    }
    saveData.alternant = ((saveData.alternant == 'true' || saveData.alternant == true) ? true : false);
    //console.log(saveData);
    data.etu.update($scope.etu.id_etu, saveData).then((res) => {
      //console.log(res[0]);
      $scope.etu = res[0];
      $scope.etu.alternant = (($scope.etu.alternant == 'true' || $scope.etu.alternant == true) ? 'true' : 'false');
    });
  }

  // get student
  data.etu.get($stateParams.etu).then((res) => {
    //console.log(res[0]);
    $scope.etu = res[0];
    $scope.etu.alternant = (($scope.etu.alternant == 'true' || $scope.etu.alternant == true) ? 'true' : 'false');
  });

  // input file
  var inputs = document.querySelectorAll('.inputfile');
  Array.prototype.forEach.call(inputs, function(input) {
    var label = input.nextElementSibling,
      labelVal = label.innerHTML;
    //console.log(labelVal);
    input.addEventListener('change', function(e) {
      var fileName = '';
      fileName = e.target.value.split('\\').pop();
      if (fileName)
        label.querySelector('p').innerHTML = fileName;
      else
        label.innerHTML = labelVal;
    });
  });
}]);
