var pics = angular.module('app.pics', []);

pics.controller('picController', function ($scope, $http, Images) {
  $scope.picture = {};
  $scope.selectedImageUrl = '';

  //Function Called on search, this brodcasts a 'search' event which is picked up by the child MapController
  $scope.searchQuery = '';
  $scope.search = function(queryLoc) {
    $scope.$broadcast ('search');
    $scope.searchQuery = queryLoc;
    return $scope.searchQuery;
  };

  //Default values for properties that are passed into the child MapController
  $scope.lat = 0;
  $scope.lng = 0;
  $scope.imageUrl = '';

  //Function called on favoriting a picture, this broadcasts a 'picClick event which is picked up by the child MapController'
  $scope.picClick = function(lat, lng, imageUrl) {
    console.log('lat & long', lat, lng);
    $scope.lat = Number(lat);
    $scope.lng = Number(lng);
    $scope.imageUrl = imageUrl;
    $scope.$broadcast ('picClick');
    console.log($scope.lat, $scope.lng);
    return $scope.latLng;
  };

  $scope.getImagesFlickr = function (searchBarText) {
    Images.getImagesFlickr(searchBarText).then(
    function(imageArray) {
      //set images from helper fn to pictures scope var
      $scope.picture.pictures = imageArray;
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
    isLoggedIn(function (err, token) {
      if (err) {
        document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
      } else {
        console.log(token);
        var imageObject = {
          token: token,
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
      }
    })
  };




  $scope.enlarge = function(url) {
    $scope.modalUrl = url;
    $('#myModal').modal('show');
  };

});
