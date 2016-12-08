angular.module('pics', [])
.controller('pics', function ($scope, Images) {
  $scope.pictures = '';
  $scope.selectedImageUrl = '';
  //add the pictures to the front end in a carosel div or something

  Images.getImagesFlickr('hong kong').then(
    function(imageArray){
      //set images from helper fn to pictures scope var
      $scope.pictures = imageArray;
    });

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
});
