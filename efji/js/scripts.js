(function(){ main(); })() // On load

function main(){
	var itemAmount = 2;
	var tryCount = 4;
	var colourSeed = Math.floor(Math.random()*360);
	game(true, colourSeed, itemAmount, tryCount);
}

function game(intial, colourSeed, itemAmount, tryCount){
	var canvas = document.getElementById('canvas');

	if(canvas.getContext){

		var intialTryCount = tryCount;

		var ctx = canvas.getContext('2d');
		var size = canvas.width;

		// clear the canvas
		ctx.clearRect(0, 0, size, size);

		var squareSize = size / itemAmount;
		
		var colourAmount = 4;

		if(colourAmount > 9){ colourAmount = 9; }
		if(colourAmount < 1){ colourAmount = 1; }

		colours = genColours(colourSeed, colourAmount);

		genButtons(colours);
		var buttonSize = (100 / colours.length)+'%';
		$('.input-button').css('width', buttonSize);
		$('.input-button').css('height', $('.input-button').css('width'));

		var items = genItems(ctx, itemAmount, colours);

		// make the first active
		items[0]['active'] = true;

		if(intial){
			items[0]['colourId'] = 0;
			items[1]['colourId'] = 1;
			items[2]['colourId'] = 2;
			items[3]['colourId'] = 3;
		}

		var intialColour = items[0]['colourId'];
		items = affectItems(items, itemAmount, intialColour, size);

		drawGrid(ctx, items, squareSize, colours);

		$('.counter').html(tryCount + ' tries left!');

		$('button').unbind().click(function(){

			var colourId = $(this).val();
			items = affectItems(items, itemAmount, colourId, size);
			drawGrid(ctx, items, squareSize, colours);

			tryCount--;
			if(tryCount < 0){ tryCount = 0; }
			$('.counter').html(tryCount + ' tries left!');

			var win = checkWin(items);
			var lose = (tryCount <= 0);
			console.log('win: ', win, 'lose: ', lose);

			if(win || lose){
				$('.win-lose').addClass('win-lose-visible');				
				$('.counter').html(tryCount + ' tries left!');				
			}

			// reset
			$('.win-lose button').removeClass();
			$('.win-lose p').html('');

			if(win){
				$('.win-lose h2').html('You win! :D');
				$('.win-lose p').html('You even had '+tryCount+ ' tries left!');
				$('.win-lose button').addClass('win-button').html('Continue <span>[space]</span>');
			}
			else if(lose){
				$('.win-lose h2').html('You lost... :(');
				$('.win-lose button').addClass('lose-button').html('Try again <span>[space]</span>');
			}

		});

		$('.win-lose button').unbind().click(function(){
			if($('.win-lose button').hasClass('win-button')){
				itemAmount += 1;
				tryCount = Math.ceil(intialTryCount * 1.5);
				game(false, colourSeed, itemAmount, tryCount);
			}else if($('.win-lose button').hasClass('lose-button')){
				game(false, colourSeed, itemAmount, intialTryCount);
			}

			$('.win-lose button').removeClass();
			$('.win-lose').removeClass('win-lose-visible');
		});

		$(document).unbind().keyup(function(e){
			var key = e.which;
			var keys = getKeys();
			var colourId = keys.indexOf(key);

			if(colourId != -1){

				console.log($('.win-lose button').hasClass());
				console.log(!$('.win-lose button').hasClass()); 

				if(!$('.win-lose button').hasClass()){

					items = affectItems(items, itemAmount, colourId, size);
					drawGrid(ctx, items, squareSize, colours);

					tryCount--;
					if(tryCount < 0){ tryCount = 0; }
					$('.counter').html(tryCount + ' tries left!');

					var win = checkWin(items);
					var lose = (tryCount <= 0);
					console.log('win: ', win, 'lose: ', lose);

					if(win || lose){
						$('.win-lose').addClass('win-lose-visible');				
						$('.counter').html(tryCount + ' tries left!');				
					}

					// reset
					$('.win-lose button').removeClass();
					$('.win-lose p').html('');

					if(win){
						$('.win-lose h2').html('You win! :D');
						$('.win-lose p').html('You even had '+tryCount+ ' tries left!');
						$('.win-lose button').addClass('win-button').html('Continue <span>[space]</span>');
					}
					else if(lose){
						$('.win-lose h2').html('You lost... :(');
						$('.win-lose button').addClass('lose-button').html('Try again <span>[space]</span>');
					}

				}

			}else if(key == 13 || key == 32){

				if($('.win-lose button').hasClass('win-button')){
					itemAmount += 1;
					tryCount = Math.ceil(intialTryCount * 1.5);
					game(false, colourSeed, itemAmount, tryCount);
				}else if($('.win-lose button').hasClass('lose-button')){
					game(false, colourSeed, itemAmount, intialTryCount);
				}

				$('.win-lose button').removeClass();
				$('.win-lose').removeClass('win-lose-visible');

			}
		});

	}else{
		alert('Your browser doesn\'t support canvas. :(');
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

function getKeys(){
	var keys = [];
	$('.input-button').each(function(){
		var letter = $(this).html().toUpperCase();
		keys.push(letter.charCodeAt(0));
	});		
	return keys;
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

		if(active){ drawPattern(context, squareSize, x * squareSize, y * squareSize); }
	}
}

function drawPattern(context, size, originX, originY){
	context.fillStyle = 'rgba(255,255,255,0.1)'
	context.fillRect(originX + size / 4, originY + size / 4, size / 2, size / 2);
}

function drawSquare(context, size, originX, originY, colour){
	context.fillStyle = colour;
	context.fillRect(originX, originY, size, size);
}

function genButtons(colours){
	$('.buttons').html('');
	var buttonChars = 'efji';
	for(var i = 0; i < colours.length; i++){
		$('<button class="input-button" style="background-color:'+colours[i]+';" value="'+i+'">'+buttonChars.charAt(i)+'</button>').appendTo('.buttons');
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