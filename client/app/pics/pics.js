var pics = angular.module('app.pics', []);

pics.controller('picController', function ($scope, Images) {
  // $scope.pictures = {}
  $scope.selectedImageUrl = '';

  $scope.getImagesFlickr = function (searchBarText) {
    Images.getImagesFlickr(searchBarText).then(
    function(imageArray) {
      //set images from helper fn to pictures scope var
      $scope.pictures = imageArray;
      console.log('imageArray', imageArray);
      $scope.$digest();
    }).catch(function(err) {
      console.log('Error:', err);
    });
  };

  $scope.getImagesFlickr('Hawaii');

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
