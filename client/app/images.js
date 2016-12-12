app.factory('Images', function() {
  var flickr = new Flickr({
    api_key: "d1f8ae89e54867864f4acbf48d347518"
  });

  var getImagesFlickr = function(text) {
    return new Promise (function (resolve, reject) {
      flickr.photos.search({
        text: text,
        has_geo: 1
      }, function(err, result) {
        if (err) { reject(err); }
        console.log(result.photos.photo);
        var results = result.photos.photo.map(imageObject => {
          var ourImage = {};
          ourImage.url = 'https://farm' + imageObject.farm + '.staticflickr.com/' + imageObject.server +
                           '/' + imageObject.id + '_' + imageObject.secret + '.jpg';
          ourImage.id = imageObject.id;
          return ourImage;
        });
        console.log(results);
        resolve(results);
      });
    });
  };

  var getImageLocation = function(id) {
    return new Promise (function (resolve, reject) {
      flickr.photos.geo.getLocation({
        photo_id: id
      }, function(err, result) {
        if (err) { reject(err); }
        var output = {
          longitude: result.photo.location.longitude,
          latitude: result.photo.location.latitude
        };
        resolve(output);
      });
    });
  };


  return {
    getImagesFlickr: getImagesFlickr,
    getImageLocation: getImageLocation
  };
});