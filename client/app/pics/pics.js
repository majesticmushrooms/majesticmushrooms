var pics = angular.module('app.pics', []);

pics.controller('picController', function ($scope, Images) {
  // $scope.pictures = 'hello';
  $scope.selectedImageUrl = '';
  $scope.test = 'abc'//['a', 'b']
  $scope.getImagesFlickr = function (searchBarText) {
    console.log('clicked');
    Images.getImagesFlickr(searchBarText).then(
    function(imageArray){
      //set images from helper fn to pictures scope var
      $scope.pictures = imageArray;
      //$scope.apply();
      console.log('pictures', $scope.pictures);
    });
  };

  $scope.getImagesFlickr('hong kong');
  console.log('pictures', $scope.pictures);


  $scope.addInfoToDB = function($index) {
    //pass in image object to add to the database
    Images.getImageLocation($scope.pictures[$index].id).then(response => {
      var imageObject = {
        lat: response.Lat,
        long: response.Long,
        image: $scope.selectedImageUrl
      };
      Images.postToServer(imageObject);
    });
  };

 $scope.test = function(){
   return $scope.pictures;
 }

});
