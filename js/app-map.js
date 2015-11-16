

// /**
//  * Generates a random number and returns it as a string for OAuthentication
//  * @return {string}
//  */

// function nonce_generate() {
//   return (Math.floor(Math.random() * 1e12).toString());
// }

// YELP_KEY = "0dt_RWZ_onDeRN_tx-JyhA";
// YELP_KEY_SECRET = "fo8iIXS_u_TjOil8uMnNTm8LdEc";
// YELP_TOKEN = "jRyu-QVU-IozwSQnZHW4u2U2Z0DVoGjd";
// YELP_TOKEN_SECRET = "AyCSVZzGk-1kxF1I34unTYKw0vc";
// var yelp_url = 'http://api.yelp.com/v2/search';

//   // var parameters = {
//   //     oauth_consumer_key: YELP_KEY,
//   //     oauth_token: YELP_TOKEN,
//   //     oauth_nonce: nonce_generate(),
//   //     oauth_timestamp: Math.floor(Date.now()/1000),
//   //     oauth_signature_method: 'HMAC-SHA1',
//   //     oauth_version: '1.0',
//   //     callback: 'cb',
//   //     location: 'Temecula',
//   //     term: 'golf',
//   //     limit: 5
//   // };

//     var encodedSignature = oauthSignature.generate('GET',yelp_url, parameters, YELP_KEY_SECRET, YELP_TOKEN_SECRET);
//     parameters.oauth_signature = encodedSignature;

//     var settings = {
//       url: yelp_url,
//       data: parameters,
//       cache: true,                // This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
//       dataType: 'jsonp',
//       success: function(results) {
//         //console.log(data);
//         //var json = data;
//         //console.log(json);
//         //callBack(data);
//       },
//       error: function() {
//         // Do stuff on fail
//         console.log('not noice');
//       }
//     };

//     // Send AJAX query via jQuery library.
//     $.ajax(settings);

var map;
	 map = new google.maps.Map(document.getElementById('map'), {
	    center: new google.maps.LatLng(33.480, -117.160),
	    zoom: 12,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	});


var markers = [];
var infowindow = new google.maps.InfoWindow();
function Pin(map, name, lat, lng, id) {
  //var contentString = '<b>' + name + '</b>';
  var marker;


  this.name = ko.observable(name);
  this.lat  = ko.observable(lat);
  this.lng  = ko.observable(lng);
  this.id   = ko.observable(id);


  marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    animation: google.maps.Animation.DROP,
    title: name,
    //icon: 'images/golfer.png',
    map: map
    //content: contentString
  });

  marker.addListener('click', toggleBounce);
  google.maps.event.addListener(map, 'click', function() {
    infowindow.close();
  });

  // google.maps.event.addListener(marker, 'click', function() {
  //   //infowindow.setContent(this.content);
  //   //infowindow.open(map, this);
  //   createInfoWindow(pins);
  // })
  	 //infowindow.setContent();
     //infowindow.open(map, this);

/**
 * Generates a random number and returns it as a string for OAuthentication
 * @return {string}
 */

function nonce_generate() {
  return (Math.floor(Math.random() * 1e12).toString());
}

YELP_KEY = "0dt_RWZ_onDeRN_tx-JyhA";
YELP_KEY_SECRET = "fo8iIXS_u_TjOil8uMnNTm8LdEc";
YELP_TOKEN = "jRyu-QVU-IozwSQnZHW4u2U2Z0DVoGjd";
YELP_TOKEN_SECRET = "AyCSVZzGk-1kxF1I34unTYKw0vc";
var yelp_url = 'http://api.yelp.com/v2/search';

  var parameters = {
      oauth_consumer_key: YELP_KEY,
      oauth_token: YELP_TOKEN,
      oauth_nonce: nonce_generate(),
      oauth_timestamp: Math.floor(Date.now()/1000),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version: '1.0',
      callback: 'cb',
      location: 'Temecula',
      term: name,
      limit: 1
  };

    var encodedSignature = oauthSignature.generate('GET',yelp_url, parameters, YELP_KEY_SECRET, YELP_TOKEN_SECRET);
    parameters.oauth_signature = encodedSignature;

    var settings = {
      url: yelp_url,
      data: parameters,
      cache: true,                // This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
      dataType: 'jsonp',
      success: function(data) {
        console.log(data);
        var imago = '<img src=';
        var sauce = '>';
        var link = '<a href=';
        var linku = '>';
        var contentString = '<a href=' + data.businesses[0].url + '>' + data.businesses[0].name + '</a>' + imago + data.businesses[0].image_url + sauce + '<br>' + imago + data.businesses[0].rating_img_url + sauce + data.businesses[0].review_count + ' reviews <br>';
        //google.maps.event.addListener(marker, 'click', function() {
        //infowindow.setContent(contentString);

      google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(contentString);
      infowindow.open(map, this);
    });

        //infowindow.open(map, this);
        //var json = data;
        //console.log(json);
        //callBack(data);
      },
      error: function() {
        // Do stuff on fail
        console.log('not noice');
      }
    };

    // Send AJAX query via jQuery library.
    $.ajax(settings);

          //console.log(yelpContent);
          //var contentString = '<a href=' + data.businesses[i].url + '>' + data.businesses[i].name + '</a>' + imago + data.businesses[i].image_url + sauce + '<br>' + imago + data.businesses[i].rating_img_url + sauce + data.businesses[i].review_count + ' reviews <br>';
        // var imago = '<img src=';
        // var sauce = '>';
        // var link = '<a href=';
        // var linku = '>';

        //var contentString = '<a href=' + yelpContent.url + '>' + yelpContent.name + '</a>' + imago + yelpContent.image_url + sauce + '<br>' + imago + yelpContent.rating_img_url + sauce + yelpContent.review_count + ' reviews <br>';
        //createInfoWindow(marker, contentString)
        //var contentString = '<a href=' + dataContent.businesses[i].url + '>' + dataContent[i].name + '</a>' + imago + dataContent[i].image_url + sauce + '<br>' + imago + dataContent.businesses[i].rating_img_url + sauce + dataContent.businesses[i].review_count + ' reviews <br>';
        //infowindow.setContent(contentString);
        //infowindow.setContent('<a href=' + data.businesses[i].url + '>' + data.businesses[i].name + '</a>' + imago + data.businesses[i].image_url + sauce + '<br>' + imago + data.businesses[i].rating_img_url + sauce + data.businesses[i].review_count + ' reviews <br>');
        //infowindow.open(map, marker);
        //console.log(data);
        //console.log(results.businesses[0].snippet_text);
        //createInfoWindow(marker, contentString);
      // google.maps.event.addListener(marker, 'click', function() {
      // infowindow.setContent(contentString);
      // infowindow.open(map, this);

  this.isVisible = ko.observable(false);

  this.isVisible.subscribe(function(currentState) {
    if (currentState) {
      marker.setMap(map);
    } else {
      marker.setMap(null);
    }
  });

  this.isVisible(true);

  markers.push(marker);
}

    // listClick = function() {
    // google.maps.event.trigger(marker, 'click');
    // }
listClick = function() {
      for (var i = 0; i < markers.length; i++) {
        google.maps.event.trigger(markers[i], 'click');
      }
    }



// function createInfoWindow(marker, contentString) {
//   google.maps.event.addListener(marker, 'click', function() {
//     return function(){
//     infowindow.setContent(contentString);
//     infowindow.open(map, this);
//   }
// }(contentString));
// }

function toggleBounce() {
	var self = this;
	if (self.getAnimation() !== null) {
		self.setAnimation(null);
	} else {
		self.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function () {
			self.setAnimation(null);
		}, 1400);
	}
}

var pins = [

        new Pin(map, 'Journey At Pechanga', 33.453159, -117.106527, 1),
        new Pin(map, 'Temecula Creek Inn', 33.4676068, -117.1291816, 2),
        new Pin(map, 'The Golf Club at Rancho California', 33.562563, -117.145126, 3),
        new Pin(map, 'Redhawk Golf Club', 33.468955, -117.091304, 4),
        new Pin(map, 'The Legends Golf Club', 33.515210, -117.113069, 5)
];

var pinZ = [
{
  "name": "Journey At Pechanga",
  "lat": 33.453159,
  'lng': -117.106527
},
{
  "name": "Temecula Creek Inn",
  "lat": 33.4676068,
  'lng': -117.1291816
},
{
  "name": "The Golf Club at Rancho California",
  "lat": 33.562563,
  "lng": -117.145126
},
{
  "name": "Redhawk Golf Club",
  "lat": 33.468955,
  "lng": -117.091304
},
{
  "name": "The Legends Golf Club",
  "lat": 33.515210,
  "lng": -117.113069
}
];

var ViewModel = function() {
	var self = this;

  //infowindow.setContent(createContent(marker.name));

	// self.pins = ko.observableArray([
	//         new Pin(map, 'Temeku Hills Golf Club', 33.516145, -117.115446, '1'),
	//         new Pin(map, 'Temecula Creek Inn', 33.4676068, -117.1291816, '2'),
	//         new Pin(map, 'CrossCreek Golf Club', 33.496457, -117.225794, '3'),
	//         new Pin(map, 'The Golf Club at Rancho California', 33.562563, -117.145126, '4'),
	//         new Pin(map, 'Redhawk Golf Club', 33.468955, -117.091304, '5')
	// ]);

	self.query = ko.observable('');

	self.filterPins = ko.computed(function () {
	    var search  = self.query().toLowerCase();

	    return ko.utils.arrayFilter(pins, function (pin) {
	        var doesMatch = pin.name().toLowerCase().indexOf(search) >= 0;

	        pin.isVisible(doesMatch);

	        return doesMatch;
	    });
	});
};

ko.applyBindings(new ViewModel());