var pics = angular.module('app.pics', []);

pics.controller('picController', function ($scope, Images) {
  $scope.picture = {}
  $scope.selectedImageUrl = '';


  $scope.getImagesFlickr = function (searchBarText) {
    Images.getImagesFlickr(searchBarText).then(
    function(imageArray) {
      //set images from helper fn to pictures scope var
      $scope.picture.pictures = imageArray;
      console.log($scope.picture.pictures);
      $scope.$digest();
    }).catch(function(err){
      console.log('Error:', err);
    });
  };

  // $scope.getImagesFlickr('hong kong');

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

  // $scope.populatePictures(pictures) {
  //   return;
  // };

});
