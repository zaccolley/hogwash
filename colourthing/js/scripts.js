(function(){ main(); })() // On load

function main(){
	var squareSize = 500;
	var clickCount = 1;
	game(squareSize, clickCount);
}

function game(squareSize, clickCount){
	var canvas = document.getElementById('canvas');

	if (canvas.getContext){

		var intialClickCount = clickCount;

		var ctx = canvas.getContext('2d');
		var size = canvas.width;
		
		
		var itemAmount = size / squareSize;

		var colours = ['rgb(255,131,73)', 'rgb(255,240,73)', 'rgb(139,255,73)',
					   'rgb(73,226,255)', 'rgb(73,117,255)' , 'rgb(224,71,255)'];

		generateButtons(colours);

		var items = genItems(ctx, itemAmount, colours);

		drawGrid(ctx, items, squareSize, colours);

		// make the first active
		items[0]['active'] = true;
		var intialColour = items[0]['colourId'];
		items = affectItems(items, itemAmount, intialColour, size);

		$('h1').html(clickCount + ' clicks left!');

		$('button').click(function(){
			var colourId = $(this).val();
			items = affectItems(items, itemAmount, colourId, size);
			drawGrid(ctx, items, squareSize, colours);

			clickCount--;
			$('h1').html(clickCount + ' clicks left!');
			var win = checkWin(items);

			if(win){
				squareSize = squareSize / 2;
				clickCount = Math.ceil(intialClickCount * 3);
				$('h1').html(clickCount + ' clicks left!');
				game(squareSize, clickCount);
			}

			if(clickCount == 0){ game(squareSize, intialClickCount); }
		});	

	}
}

function checkWin(items){
	var state = items[0]['active'];

	for(var i = 0; i < items.length - 1; i++){
		if(state != items[i]['active']){ return false; }
	}
	return true;
}


function generateButtons(colours){
	$('.buttons').html('');
	for(var i = 0; i < colours.length; i++){
		$('<button style="background-color:'+colours[i]+';" value="'+i+'">').appendTo('.buttons');
	}
}

function affectItems(items, itemAmount, colourId, size){
	console.log('------');
	for(var i = 0; i < items.length; i++){
		if(items[i]['active']){
			console.log(i);

			items[i]['colourId'] = colourId;

			if(items[i]['x'] > 0){
				var left = items[i-itemAmount];
				console.log('left', left);
				
				if(left['colourId'] == colourId){ left['active'] = true; }
			}

			if(items[i]['y'] > 0){
				var top = items[i-1];
				console.log('top', top);

				if(top['colourId'] == colourId){ top['active'] = true; }
			}

			console.log('x: ', items[i]['x'], 'y: ', items[i]['y'], itemAmount);

			if(items[i]['x'] < itemAmount-1){
				var right = items[i+itemAmount];
				console.log('right', right);
				
				if(right['colourId'] == colourId){ right['active'] = true; }
			}

			if(items[i]['y'] < itemAmount-1){
				var bottom = items[i+1];
				console.log('bottom', bottom);

				if(bottom['colourId'] == colourId){ bottom['active'] = true; }
			}

			// if block is surrounded by actives make it no longer active

		}
	}
	return items;
}

function genItems(context, itemAmount, colours){
	var items = [];
	var colourAmount = colours.length;

	for(var x = 0; x < itemAmount; x++){
		for(var y = 0; y < itemAmount; y++){
			var randId = Math.floor(Math.random() * colourAmount);
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

function drawGrid(context, items, squareSize, colours){
	for(var i = 0; i < items.length; i++){

		var x = items[i]['x'];
		var y = items[i]['y'];
		var colourId = items[i]['colourId'];

		var colour = colours[colourId];

		drawSquare(context, squareSize, x * squareSize, y * squareSize, colour);
	}
}

function drawSquare(context, size, originX, originY, colour){
	context.fillStyle = colour;
	context.fillRect(originX, originY, size, size);
}