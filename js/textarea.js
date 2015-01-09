var text_canvas;
var text_size = 36;
var line_spacing = Math.round(text_size/6);
var canvas_width = 764;
var row_size;

var end_cchar = new CChar('　');
var cchar_text;
var hightlight;
var current_index = 0;
var input_mode; /* focus, edit, warning, (select) */



// inner method
function _text_del() {
	cchar_text.splice(current_index, 1);
}

function _text_insert( cchar ) {
	cchar_text.splice(current_index, 0, cchar);
}

function _text_canvas_width( canvas_width ) {
	text_canvas.width = canvas_width;
	text_canvas.style.width = canvas_width+'px';
	var cx = text_canvas.getContext('2d');
	var cchar_width = measureCChar(cx, text_size, end_cchar);
	row_size = Math.floor(text_canvas.width/cchar_width);
}

function _text_canvas_height( canvas_height ) {
	text_canvas.height = canvas_height;
	text_canvas.style.height = canvas_height+'px';
}

function _text_canvas_clear( cx ) {
	cx.setTransform(1,0,0,1,0,0);
	cx.clearRect(0, 0, text_canvas.width, text_canvas.height);
}



function text_init( canvas, textsize, linespacing, canvaswidth ) {
	if ( canvas !== undefined )
		text_canvas = canvas;

	if ( textsize !== undefined )
		text_size = textsize;

	if ( linespacing !== undefined )
		line_spacing = linespacing;

	if ( canvaswidth !== undefined )
		canvas_width = canvaswidth;

	_text_canvas_width(canvas_width);
}

function text_set( cchars ) {
	current_index = cchars.length;
	input_mode = 'focus';
	cchar_text = cchars;
	cchar_text.push(end_cchar);
	hightlight = new Array();

	text_repaint();
}

function text_repaint() {
	var cx = text_canvas.getContext('2d');
	var row_num = Math.ceil(cchar_text.length/row_size);
	var canvas_height = (text_size+line_spacing)*row_num;
	_text_canvas_height(canvas_height);
	_text_canvas_clear(cx);

	for ( var i in hightlight )
		delete hightlight[i];
	hightlight[current_index] = input_mode;
	printCChars(cx, text_size, line_spacing, cchar_text, hightlight);
}

function text_current() {
	return cchar_text[current_index];
}



// method for edit mode
function text_edit_start() {
	if ( input_mode == 'focus' ) {
		_text_insert(new CChar('　'));
		input_mode = 'edit';
	}
}

function text_edit_warning() {
	if ( input_mode == 'edit' ) {
		input_mode = 'warning';
	}
}

function text_edit_editing() {
	if ( input_mode == 'warning' ) {
		input_mode = 'edit';
	}
}

function text_edit_abandon() {
	if ( input_mode == 'edit' || input_mode == 'warning' ) {
		_text_del();
		input_mode = 'focus';
	}
}

function text_edit_finish() {
	if ( input_mode == 'edit' || input_mode == 'warning' ) {
		current_index++;
		input_mode = 'focus';
	}
}



// method for focus mode
function text_del() {
	if ( input_mode == 'focus' ) {
		if ( current_index < cchar_text.length-1 ) {
			_text_del();
		}
	}
}

function text_backspace() {
	if ( input_mode == 'focus' ) {
		if ( current_index > 0 ) {
			current_index--;
			_text_del();
		}
	}
}

function text_insert( cchar ) {
	if ( input_mode == 'focus' ) {
		_text_insert(cchar);
		current_index++;
	}
}

function text_privous() {
	if ( input_mode == 'focus' ) {
		if ( current_index > 0 ) {
			current_index--;
		}
	}
}

function text_next() {
	if ( input_mode == 'focus' ) {
		if ( current_index < cchar_text.length-1 ) {
			current_index++;
		}
	}
}
