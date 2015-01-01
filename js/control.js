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
	var sels = query_char(current);

	if ( sels.length == 0 ) {
		text_setmode('warning');
	} else {
		toggle_selector(true);
		sel_init(sels);

		text_setmode('edit');
	}

	text_repaint();
}

function dot() {
	if ( input_mode == 'focus' )
		text_insert(new CChar('　'));
	else if ( input_mode == 'warning' || input_mode == 'edit' )
		cchar_text[current_index] = new CChar('　');

	toggle_selector(true);
	sel_init(punctuation);

	text_setmode('edit');
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

