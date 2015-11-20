

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
var styles = [
  {
    "stylers": [
      { "hue": "#4cff00" },
      { "saturation": 3 },
      { "gamma": 0.5 }
    ]
  }
];


var map;
	 map = new google.maps.Map(document.getElementById('map'), {
	    center: new google.maps.LatLng(0, 0),
	    //zoom: 11,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	});


var markers = [];
var bounds = new google.maps.LatLngBounds();
var infowindow = new google.maps.InfoWindow();

function Pin(map, name, lat, lng, id) {
  var marker;

  this.name = ko.observable(name);
  this.lat  = ko.observable(lat);
  this.lng  = ko.observable(lng);
  this.id   = ko.observable(id);
  this.marker = ko.observable(marker);

  var LatLng = new google.maps.LatLng(lat, lng);


  marker = new google.maps.Marker({
    position: LatLng,
    //position: new google.maps.LatLng(lat, lng),
    animation: google.maps.Animation.DROP,
    title: name,
    icon: 'images/golf.png',
    map: map
  });

  bounds.extend(LatLng);

  marker.addListener('click', toggleBounce);

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

        var contentString = '<div style="float:left; width:60%;">' +  '<a href=' + data.businesses[0].url + '>'
        + data.businesses[0].name + '</a><br>' + '<img src="' + data.businesses[0].rating_img_url + '"/>' + ' '
        + data.businesses[0].review_count + ' reviews<br><br>' + data.businesses[0].location.address + '<br>'
        + data.businesses[0].location.city + ', ' + data.businesses[0].location.state_code + ' '
        + data.businesses[0].location.postal_code + '</div>'
        + '<div class="yelp-img" style="float:right; width:40%;"><img src="' + data.businesses[0].image_url + '">' + '</div>';

      google.maps.event.addListener(marker, 'click', function() {
       for (var i = 0; i < markers.length; i++) {
         markers[i].setIcon('images/golf.png');
       }
      this.setIcon('images/golfer.png');
      infowindow.setContent(contentString);
      infowindow.open(map, marker);
      map.panTo(LatLng);
    });
      },
      error: function() {
        // Do stuff on fail
        var contentString = "<h1>Couldn't load Yelp API results</h1>";
        infowindow.setContent(contentString);
        infowindow.open(map, marker)
      }
    };

    // Send AJAX query via jQuery library.
    $.ajax(settings);

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
    console.log(markers);
}

map.fitBounds(bounds);

function listClick(id) {
  google.maps.event.trigger(markers[id], 'click');
}

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

google.maps.event.addListener(map, 'click', function() {
  infowindow.close();
});

var ViewModel = function() {
	var self = this;

	self.pins = ko.observableArray([
          new Pin(map, 'Journey At Pechanga', 33.453157, -117.106526, 0),
          new Pin(map, 'Temecula Creek Inn', 33.4676068, -117.1291816, 1),
	        new Pin(map, 'The Golf Club at Rancho California', 33.562563, -117.145126, 2),
          new Pin(map, 'Redhawk Golf Club', 33.468955, -117.091304, 3),
          new Pin(map, 'The Legends Golf Club', 33.515210, -117.113069, 4),
          new Pin(map, 'CrossCreek Golf Club', 33.496457, -117.225794, 5),
          //new Pin(map, 'Temeku Hills Golf Club', 33.516145, -117.115446, 6),
          new Pin(map, 'Murrieta Valley Golf Range', 33.556781, -117.220490, 6),
          new Pin(map, 'Bear Creek Golf Club', 33.582178, -117.262248, 7),
          new Pin(map, 'Fallbrook Golf Club', 33.342399, -117.191919, 8),
          new Pin(map, 'Links at Summerly', 33.649294, -117.306694, 9),
          new Pin(map, 'Diamond Valley Golf Club', 33.666240, -116.958691, 10)
	]);

	self.query = ko.observable('');

	self.filterPins = ko.computed(function () {
	    var search  = self.query().toLowerCase();

	    return ko.utils.arrayFilter(self.pins(), function (pin) {
	        var doesMatch = pin.name().toLowerCase().indexOf(search) >= 0;

	        pin.isVisible(doesMatch);
          google.maps.event.trigger(pin.marker, 'click');

	       return doesMatch;
	    });
	});
};

ko.applyBindings(new ViewModel());