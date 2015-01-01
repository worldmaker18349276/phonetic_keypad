var canvas;
var text_size; /*text height (px)*/
var line_spacing;
var total_cchar;
var current_cchar;

function repaintText() {
	canvas.width = canvas.width;
	var cx = canvas.getContext('2d');
	var cchar_width = measureCChar(cx, text_size, total_cchar[0]);
	var row_size = Math.floor(canvas.width/cchar_width);
	cx.translate(0, text_size/2 + line_spacing/2);

	var ind = total_cchar.indexOf(current_cchar);
	bg_style = new Array(total_cchar.length);
	bg_style[ind] = 'LightGreen';
	printBackGround(cx, text_size, bg_style);
	printCChar(cx, text_size, total_cchar);
}

