(function(){ main(); })() // On load

function main(){
	var squareSize = 600;
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

		var colourSeed = Math.floor(Math.random()*360);
		var colourAmount = 4;

		if(colourAmount > 9){ colourAmount = 9; }
		if(colourAmount < 1){ colourAmount = 1; }

		colours = genColours(colourSeed, colourAmount);

		genButtons(colours);
		$('.buttons button').css('width', (100/colours.length)+'%');

		var items = genItems(ctx, itemAmount, colours);

		// make the first active
		items[0]['active'] = true;
		var intialColour = items[0]['colourId'];
		items = affectItems(items, itemAmount, intialColour, size);

		drawGrid(ctx, items, squareSize, colours);

		$('.counter').html(clickCount + ' clicks left!');

		$('button').click(function(){

			var colourId = $(this).val();
			items = affectItems(items, itemAmount, colourId, size);
			drawGrid(ctx, items, squareSize, colours);

			clickCount--;
			if(clickCount < 0){ clickCount = 0; }
			$('.counter').html(clickCount + ' clicks left!');

			var win = checkWin(items);
			var lose = (clickCount <= 0);
			console.log('win: ', win, 'lose: ', lose);

			$('.win-lose button').click(function(){
				if($(this).hasClass('win-button')){
					squareSize = squareSize / 2;
					clickCount = Math.ceil((intialClickCount + 1) * (intialClickCount + 1));
					game(squareSize, clickCount);
				}else if($(this).hasClass('lose-button')){
					game(squareSize, intialClickCount);
				}
				$('.win-lose').removeClass('win-lose-visible');
			});


			if(win || lose){
				$('.win-lose').addClass('win-lose-visible');				
				$('.counter').html(clickCount + ' clicks left!');				
			}

			// reset
			$('.win-lose button').removeClass();
			$('.win-lose p').html('');

			if(win){
				$('.win-lose h2').html('You win! :D');
				$('.win-lose p').html('You even had '+clickCount+ ' clicks left!');
				$('.win-lose button').addClass('win-button').html('Continue');
			}
			else if(lose){
				$('.win-lose h2').html('You lost... :(');
				$('.win-lose button').addClass('lose-button').html('Try again');
			}

		});	

	}
}

function checkWin(items){
	var state = items[0]['colourId'];

	for(var i = 0; i < items.length; i++){
		if(state != items[i]['colourId']){ return false; }
	}
	return true;
}

function affectItems(items, itemAmount, colourId, size){
	console.log('------');
	for(var i = 0; i < items.length; i++){
		if(items[i]['active']){
			console.log(i);

			// resets
			var left = null; var top = null;
			var right = null;	var bottom = null;

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
		var item = items[i];

		var x = item['x'];
		var y = item['y'];
		var colourId = item['colourId'];
		var active = item['active'];

		var colour = colours[colourId];

		drawSquare(context, squareSize, x * squareSize, y * squareSize, colour);

		// if(active){ drawPattern(context, squareSize, x * squareSize, y * squareSize); }
	}
}

function drawPattern(context, size, originX, originY){
	context.fillStyle = 'rgba(255,255,255,0.1)'
	context.fillRect(originX + size / 4, size / 4, size / 2, size / 2);
}

function drawSquare(context, size, originX, originY, colour){
	context.fillStyle = colour;
	context.fillRect(originX, originY, size, size);
}

function genButtons(colours){
	$('.buttons').html('');
	var buttonChars = 'asdfghjkl';
	for(var i = 0; i < colours.length; i++){
		$('<button style="background-color:'+colours[i]+';" value="'+i+'">'+buttonChars.charAt(i)+'</button>').appendTo('.buttons');
	}
}

function genColours(seed, amount){
	var colours = [];
	for(var i = 0; i < amount; i++){
		var h = (seed + (i * (360 / amount))) / 360;
		var s = 0.6; var l = 0.6;

		if(h > 360){ h = 360; }
		if(h < 0){ h = 0; }

		var rgb = hslToRgb(h, s, l);

		var r = Math.floor(rgb[0]);
		var g = Math.floor(rgb[1]);
		var b = Math.floor(rgb[2]);

		colours.push('rgb('+r+','+g+','+b+')')
	}
	return colours;
}

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r * 255, g * 255, b * 255];
}