var canvas;
var text_size;
var total_cchar;
var current_cchar;

function repaintText() {
	canvas.width = canvas.width;
	var cx = canvas.getContext('2d');
	var total_width = measureCChar(cx, text_size, total_cchar);
	cx.translate(canvas.width/2-total_width/2, canvas.height/2);

	var ind = total_cchar.indexOf(current_cchar);
	bg_style = new Array(total_cchar.length);
	bg_style[ind] = 'LightGreen';
	printBackGround(cx, text_size, bg_style);
	printCChar(cx, text_size, total_cchar);
}

