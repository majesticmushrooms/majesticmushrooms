angular.module('app.pics', [])
.controller('app.pics', function ($scope, Images) {
  $scope.pictures = '';
  $scope.selectedImageUrl = '';

  $scope.getImagesFlickr = function (searchBarText) {
    console.log('clicked');
    Images.getImagesFlickr(searchBarText).then(
    function(imageArray){
      //set images from helper fn to pictures scope var
      $scope.pictures = imageArray;
      console.log('pictures', $scope.pictures);

    });
  };

  $scope.getImagesFlickr('hong kong');

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
