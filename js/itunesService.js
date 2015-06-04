var app = angular.module('itunes');

app.factory('itunesService', function ($http, $q){
  var service = {};
  ////////////////////////

  service.getData = function (artistName) {
  	var deferred = $q.defer();
  	console.log('this is deferred', deferred);

  	$http.jsonp('https://itunes.apple.com/search?term=' + artistName + '&callback=JSON_CALLBACK')
	  	.success(function (response){
	  		var allData = [];
	  		var rawArr = response.results;

	  		rawArr.forEach(function (item, index) {
	  			var object = {
	  				AlbumArt: item['artworkUrl100'],
					Artist: item['artistName'],
					Collection: item['collectionName'],
					CollectionPrice: item['trackPrice'],
					Play: item['previewUrl'],
					Song: item['trackName'],
					Type: item['kind']
	  			}

	  			allData.push(object);
	  		})

	        deferred.resolve(allData);
	    });

    return deferred.promise;
  }

  ////////////////////////
  return service;
});