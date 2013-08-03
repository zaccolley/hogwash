var buildings = [];

var geoLat = '';
var geoLon = '';

$.get('data.php', function(data){
	var data = data.substring(1, data.length-1).split(',');
	console.log(data);

	var lib = {
		name: 'library',
		avail: +data[0],
		pcs: {
			free: +data[1],
			total: +data[2]
		},
		coords: {
			lat: 50.792470,
			lon: -1.098845
		}
	};

	var par = {
		name: 'park',
		avail: +data[4],
		pcs: {
			free: +data[5],
			total: +data[6]
		},
		coords: {
			lat: 50.797570,
			lon: -1.094108
		}
	};

	var por = {
		name: 'portland',
		avail: +data[8],
		pcs: {
			free: data[9],
			total: data[10]
		},
		coords: {
			lat: 50.798454,
			lon: -1.099490
		}
	};

	var ang = {
		name: 'anglesea',
		avail: +data[12],
		pcs: {
			free: +data[13],
			total: +data[14]
		},
		coords: {
			lat: 50.797709,
			lon: -1.096582
		}
	};

	buildings = [lib, par, por, ang];

	for(var i = 0; i < buildings.length; i++){

		var build = buildings[i];
		console.log(build);

		var id = build.name.substring(0, 3);

		var avail = (build.avail) ? 'open' : 'closed';

		$('#'+id).find('h1').html(build.name);

		var percent = (build.pcs.free / build.pcs.total) * 100;
		var percentPretty = Math.floor(percent)+'%';

		if(build.avail){
			var output = build.pcs.free +'/'+ build.pcs.total + ' <span>('+percentPretty+')</span>';

			var colourHue = percent * 0.8;
			var colour = 'hsl('+colourHue+', 60%, 60%)';

			$('#'+id).find('.percent').css('width', percentPretty);
			$('#'+id).find('.percent').css('background', colour);
		}else{
			var output = 'Closed';
		}

		$('#'+id).find('p').html(output);

		if(geoLat && geoLon){
			build.distance = getDistanceFromLatLonInKm(geoLat, geoLon, build.coords.lat, build.coords.lon);
		}

		console.log('Current geo: ', geoLat, geoLon);
		console.log('Distance: ', build.distance);	
	}

	var smallestD = buildings[0];

	for(var j = 0; j < buildings.length; j++){
		var build = buildings[j];
		if(build.avail && build.distance < smallestD.distance){ smallestD = build; }
	}

	console.log(smallestD);

	$('#'+smallestD.name.substring(0, 3)).find('h1').append('<span>(Closest)</span>');
});

navigator.geolocation.getCurrentPosition(geoData, geoError);

function geoData(pos){
	geoLat = pos.coords.latitude;
	geoLon = pos.coords.longitude;
}

function geoError(){ console.log('No geolocation. :(');	}

// http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2){
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2)
		; 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg){
	return deg * (Math.PI/180)
}
