(function(){ main(); })() // On load

function main(){
	var canvas = document.getElementById('canvas');

	if (canvas.getContext){

		var ctx = canvas.getContext('2d');
		var size = canvas.width;

		var colours = ['rgb(255,131,73)', 'rgb(255,240,73)', 'rgb(139,255,73)',
					   'rgb(73,255,131)', 'rgb(73,226,255)', 'rgb(73,117,255)'];

		var gridItems = genGrid(ctx, size);

		drawGrid(ctx, gridItems, colours);

		$('main ul li').click(function(){
			var colour = $(this).css('backgroundColor');
			drawOver(ctx, gridItems, colour);
		});	

	}
}

function genGrid(context, size){
	var gridItems = [];

	for(var x = 0; x < size; x+=20){
		for(var y = 0; y < size; y+=20){
			
			var randId = Math.floor(Math.random()*6);
			var gridItem = [x, y, randId];

			gridItems.push(gridItem);

		}
	}

	return gridItems;
}

function drawGrid(context, gridItems, colours){
	for(var i = 0; i < gridItems.length; i++){

		var x = gridItems[i][0];
		var y = gridItems[i][1];
		var id = gridItems[i][2];

		var colour = colours[id];

		drawSquare(context, x, y, colour);
	}
}

function drawSquare(context, originX, originY, colour){
	var size = 20;

	context.fillStyle = colour;
	context.fillRect(originX, originY, size, size);
}

function drawOver(context, gridItems, colour){
	drawSquare(context, gridItems[0][0], gridItems[0][1], colour);
};