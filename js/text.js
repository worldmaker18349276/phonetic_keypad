var text_canvas;
var text_size;
var line_spacing;

var empty_cchar = new CChar('　');
var cchar_text;
var hightlight;
var current_index = 0;
var input_mode; /* focus, edit, (select) */


function text_init( canvas, cchars ) {
	text_canvas = canvas;
	text_size = 36;
	line_spacing = text_size/6;

	current_index = cchars.length;
	input_mode = 'focus';
	cchar_text = cchars;
	cchar_text.push(empty_cchar);
	hightlight = new Array();
	hightlight[current_index] = 'focus';

	text_repaint();
}

function text_repaint() {
	var cx = text_canvas.getContext('2d');
	cx.clearRect(0, 0, text_canvas.width, text_canvas.height);
	printCChars(cx, text_size, line_spacing, cchar_text, hightlight);
}

function text_del() {
	cchar_text.splice(current_index, 1);
}

function text_insert( cchar ) {
	cchar_text.splice(current_index, 0, cchar);
}

function text_privous() {
	if ( current_index > 0 )
		current_index--;
}

function text_next() {
	if ( current_index < cchar_text.length-1 )
		current_index++;
}

function text_setmode( mode ) {
	input_mode = mode;
	for ( var i in hightlight )
		delete hightlight[i];
	hightlight[current_index] = mode;
}

