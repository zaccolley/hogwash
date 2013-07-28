(function(){ main(); })() // On load

function main(){
	var canvas = document.getElementById('canvas');

	if (canvas.getContext){

		var ctx = canvas.getContext('2d');
		var size = canvas.width;

		var colours = ['rgb(255,131,73)', 'rgb(255,240,73)', 'rgb(139,255,73)',
					   'rgb(73,226,255)', 'rgb(73,117,255)' , 'rgb(224,71,255)'];

		var items = genItems(ctx, size);

		console.log('Intial:');
		console.log(items);

		drawGrid(ctx, items, colours);

		// make the first active
		items[0]['active'] = true;

		$('main ul li').click(function(){
			var colourId = $(this).html();
			items = affectItems(items, colourId, size);
			console.log('Affected:');
			console.log(items);
			drawGrid(ctx, items, colours);
		});	

	}
}

function affectItems(items, colourId, size){
	for(var i = 0; i < items.length; i++){
		if(items[i]['active']){

			items[i]['colourId'] = colourId;

			if(items[i]['x'] != 0 && items[i]['y'] != 0){
				var top = items[i-1];
				var left = items[i-30];

				if(top['colourId'] == colourId){ top['active'] = true; }
				if(left['colourId'] == colourId){ left['active'] = true; }
			}

			if(items[i]['x'] != size && items[i]['y'] != size){
				var bottom = items[i+1];
				var right = items[i+30];

				if(bottom['colourId'] == colourId){ bottom['active'] = true; }
				if(right['colourId'] == colourId){ right['active'] = true; }
			}

		}
	}
	return items;
}

function genItems(context, size){
	var items = [];

	for(var x = 0; x < size / 20; x++){
		for(var y = 0; y < size / 20; y++){
			var randId = Math.floor(Math.random()*6);
			var active = false;

			var item = new Object();
			item['x'] = x;
			item['y'] = y;
			item['colourId'] = randId;
			item['active'] = active;

			items.push(item);

		}
	}

	return items;
}

function drawGrid(context, items, colours){
	for(var i = 0; i < items.length; i++){

		var x = items[i]['x'];
		var y = items[i]['y'];
		var colourId = items[i]['colourId'];

		var colour = colours[colourId];

		drawSquare(context, x*20, y*20, colour);
	}
}

function drawSquare(context, originX, originY, colour){
	var size = 20;

	context.fillStyle = colour;
	context.fillRect(originX, originY, size, size);
}