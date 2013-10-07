(function(){

	var geoOptions = {
		enableHighAccuracy: true,
		maximumAge: 0
	};

	// get the geolocation
	navigator.geolocation.getCurrentPosition(geoData, geoError, geoOptions);

})()

function startUp(geoLat, geoLon){
	// start main and run it every minute
	main(geoLat, geoLon);
	setInterval(main(geoLat, geoLon), 60000);
}

function main(geoLat, geoLon){
	console.clear();
	console.log('Update');

	var buildings = [];

	$.get('data.php', function(data){
		// format the data and stick it in an array
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

			var id = build.name.substring(0, 3); // id created from first three chars

			var avail = (build.avail) ? 'open' : 'closed'; // boolean for availability

			$('#'+id).find('h1').html(build.name); // set the heading to the name of the building

			var percent = (build.pcs.free / build.pcs.total) * 100; // get a percentage of pc availability
			var percentPretty = Math.floor(percent)+'%'; // tidy the percentage and add a '%'

			if(build.avail){ // if the building is open
				var output = build.pcs.free +' / '+ build.pcs.total + ' available <span>('+percentPretty+')</span>';

				var colourHue = percent; // colours here for the bar
				// using hsl so we can keep the tone the same and just change the hue
				var colour = 'hsl('+colourHue+', 60%, 60%)';

				$('#'+id).find('.percent').css('width', percentPretty);
				$('#'+id).find('.percent').css('background', colour);
			}else{ // if the building is closed
				var output = 'Closed';
			}

			$('#'+id).find('p').html(output);

			// if the gelocation is set
			if(geoLat != '' && geoLon != ''){
				geo(id, build)
			}
		}

		if(geoLat != '' && geoLon != ''){

			// working out which building has the smallest distance

			var smallestD = buildings[0];

			for(var j = 0; j < buildings.length; j++){
				var build = buildings[j];
				if(build.avail && build.distance < smallestD.distance){ smallestD = build; }
			}

			console.log(smallestD);

			$('#'+smallestD.name.substring(0, 3)).find('h1').append('<span>(Closest)</span>');
			
		}

	});

}

function geoData(pos){
	geoLat = pos.coords.latitude;
	geoLon = pos.coords.longitude;

	startUp(geoLat, geoLon);
}

function geoError(err){
	console.log(err.code, 'ERROR:', err.message);
	
	geoLat = '';
	geoLon = '';

	startUp(geoLat, geoLon);
}

function geo(id, build){

	build.distance = getDistanceFromLatLonInKm(geoLat, geoLon, build.coords.lat, build.coords.lon);

	console.log('Current geo: ', geoLat, geoLon);
	console.log('Distance: ', build.distance);

	$('#'+id).find('p span').append(' &bull; ' + build.distance.toString().substring(0, 4) + 'km');	

}

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
