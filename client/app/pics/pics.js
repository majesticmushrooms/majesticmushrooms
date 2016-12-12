var pics = angular.module('app.pics', []);

pics.controller('picController', function ($scope, $http, Images) {
  $scope.picture = {};
  $scope.selectedImageUrl = '';

  $scope.searchQuery = '';
  $scope.search = function(queryLoc) {
    $scope.$broadcast ('search');
    $scope.searchQuery = queryLoc;
    return $scope.searchQuery;
  };

  $scope.lat = 0;
  $scope.lng = 0;
  $scope.picClick = function(lat, lng) {
    console.log('lat & long', lat, lng);
    $scope.lat = Number(lat);
    $scope.lng = Number(lng);
    $scope.$broadcast ('picClick');
    console.log($scope.lat, $scope.lng);
    return $scope.latLng;
  };

  $scope.getImagesFlickr = function (searchBarText) {
    Images.getImagesFlickr(searchBarText).then(
    function(imageArray) {
      //set images from helper fn to pictures scope var
      $scope.picture.pictures = imageArray;
      console.log('new pics', $scope.picture.pictures);
      $scope.$digest();

      //Loop through pictures and add lat and lng
      $scope.picture.pictures.forEach(function(picture, index) {
        Images.getImageLocation(picture.id).then(response => {
          $scope.picture.pictures[index].lat = response.latitude;
          $scope.picture.pictures[index].lng = response.longitude;
        });

      });
    }).catch(function(err) {
      console.log('Error:', err);
    });
  };

  $scope.addInfoToDB = function(lat, long, url, id, searchterm) {
    var imageObject = {
      url: url,
      longitude: long,
      latitude: lat,
      searchTerm: searchterm,
      id: id
    };

    $http({
      method: 'POST',
      url: '/',
      data: imageObject
    }).then(function successCallback(response) {
      console.log('User info added to database');
    }, function errorCallback(response) {
      console.log('Error adding user info to db');
    });

  };


    $scope.enlarge = function(url) {
      $scope.modalUrl = url;
      console.log('clicked enlarge', $scope.modalUrl);
      $('#myModal').modal('show');
    };

  // $scope.populatePictures(pictures) {
  //   return;
  // };

<<<<<<< HEAD
=======
  };

>>>>>>> Fix merge conflict error
});
