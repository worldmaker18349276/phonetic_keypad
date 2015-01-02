var text_canvas;
var text_size;
var line_spacing;
var row_size;
var max_row_num;
var row_offset;

var end_cchar = new CChar('　');
var cchar_text;
var hightlight;
var current_index = 0;
var input_mode; /* focus, edit, warning, (select) */


function _text_del() {
	cchar_text.splice(current_index, 1);
}

function _text_insert( cchar ) {
	cchar_text.splice(current_index, 0, cchar);
}



function text_init( canvas, cchars ) {
	text_canvas = canvas;
	text_size = 36;
	line_spacing = text_size/6;

	current_index = cchars.length;
	input_mode = 'focus';
	cchar_text = cchars;
	cchar_text.push(end_cchar);
	hightlight = new Array();

	var cx = text_canvas.getContext('2d');
	var cchar_width = measureCChar(cx, text_size, cchar_text[0]);
	row_size = Math.floor(text_canvas.width/cchar_width);
	max_row_num = Math.floor(text_canvas.height/(text_size+line_spacing));
	row_offset = 0;

	text_repaint();
}

function text_repaint() {
	var current_row = Math.ceil((current_index+1)/row_size)-1;
	while ( current_row < row_offset )
		row_offset--;
	while ( current_row >= row_offset+max_row_num )
		row_offset++;


	var cx = text_canvas.getContext('2d');
	cx.setTransform(1,0,0,1,0,0);
	cx.clearRect(0, 0, text_canvas.width, text_canvas.height);

	cx.translate(0, -(text_size+line_spacing)*row_offset);

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



// only work on focus mode
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
