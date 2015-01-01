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



function keyin( button ) {
	if ( input_mode == 'focus' )
		text_insert(new CChar('　'));
	else if ( input_mode == 'warning' )
		cchar_text[current_index].deletePhone(0);

	var phone = button.innerHTML;
	cchar_text[current_index].putPhone(phone);

	text_setmode('edit');

	text_repaint();
}

function backspace() {
	if ( input_mode == 'focus' ) {

		if ( current_index != 0 ) {
			text_privous();
			text_del();
		}
		text_setmode('focus');

		text_repaint();

	} else if ( input_mode == 'edit' || input_mode == 'warning' ) {

		var current = cchar_text[current_index];
		current.deletePhone();

		var remain = false;
		for ( var i in current.phones )
			remain = true;

		if ( !remain ) {
			text_del();
			text_setmode('focus');
		} else {
			text_setmode('edit');
		}

		text_repaint();

	}
}

function space() {
	if ( input_mode == 'focus' ) {

		text_insert(new CChar('　'));
		text_next();

		text_setmode('focus');

		text_repaint();

	} else if ( input_mode == 'edit' || input_mode == 'warning' ) {
		
		cchar_text[current_index].deletePhone(0);

		text_setmode('edit');

		enter();
	}
}

function enter() {
	var current = cchar_text[current_index];
	var sels = query(current);

	if ( sels.length == 0 ) {
		text_setmode('warning');
	} else {
		selections = sels;
		toggle_selector(true);
		sel_load(0);
		text_setmode('edit');
	}

	text_repaint();
}

function select( button ) {
	if ( button.innerHTML != '　' ) {
		toggle_selector(false);

		cchar_text[current_index].text = button.innerHTML;
		text_next();

		text_setmode('focus');
		text_repaint();
	}
}

function esc() {
	toggle_selector(false);
	cchar_text[current_index].deletePhone(0);
	text_setmode('edit');
	text_repaint();
}

function query( cchar ) {
	return [ '爾', '耳', '洱', '餌', '邇', '珥', '駬', '薾', '鉺', '峏', '尒', '栮' ];
}

