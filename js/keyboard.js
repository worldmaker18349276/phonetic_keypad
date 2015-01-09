function _edit_confirm() {
	var sels = query_char(text_current());

	if ( sels.length == 0 ) {

		text_edit_warning();

	}else if ( sels.length == 1 ) {

		text_current().text = sels[0];
		text_edit_finish();

	} else {

		toggle_inputboard('selector');
		sel_set(sels);

	}
}


// action
function keyin( phone ) {
	if ( input_mode == 'focus' )
		text_edit_start();
	text_edit_editing();

	text_current().deletePhone(0);
	text_current().putPhone(phone);

	text_repaint();
}

function tone( tone ) {
	if ( input_mode == 'focus' ) {

		text_edit_start();

		text_current().text = tone;

		text_edit_finish();
		text_repaint();

	} else if ( input_mode == 'edit' || input_mode == 'warning' ) {

		text_edit_editing();

		text_current().putPhone(tone);

		_edit_confirm();
		text_repaint();

	}
}

function space() {
	if ( input_mode == 'focus' ) {

		text_edit_start();

		text_current().text = '　';

		text_edit_finish();
		text_repaint();

	} else if ( input_mode == 'edit' || input_mode == 'warning' ) {
		
		text_edit_editing();

		text_current().deletePhone(0);

		_edit_confirm();
		text_repaint();

	}
}

function dot() {
	if ( input_mode == 'warning' || input_mode == 'edit' )
		text_edit_abandon();

	toggle_inputboard('selector');
	sel_set(punctuation);

	text_repaint();
}

function backspace() {
	if ( input_mode == 'focus' ) {

		text_backspace();
		text_repaint();


	} else if ( input_mode == 'edit' || input_mode == 'warning' ) {

		text_current().deletePhone();

		var remain = false;
		for ( var i in text_current().phones )
			if ( text_current().phones[i] !== undefined )
				remain = true;

		if ( !remain ) {
			text_edit_abandon();
		} else {
			text_edit_editing();
		}

		text_repaint();

	}
}

function left() {
	if ( input_mode == 'focus' ) {
		text_privous();
		text_repaint();
	} else if ( input_mode == 'edit' ||  input_mode == 'warning' ) {
		text_edit_abandon();
		text_repaint();
	}
}

function right() {
	if ( input_mode == 'focus' ) {
		text_next();
		text_repaint();
	} else if ( input_mode == 'edit' ||  input_mode == 'warning' ) {
		text_edit_abandon();
		text_repaint();
	}
}

function up() {
	if ( input_mode == 'focus' ) {
		for ( var i=0; i<row_size; i++ )
			text_privous();
		text_repaint();
	} else if ( input_mode == 'edit' ||  input_mode == 'warning' ) {
		text_edit_abandon();
		text_repaint();
	}
}

function down() {
	if ( input_mode == 'focus' ) {
		for ( var i=0; i<row_size; i++ )
			text_next();
		text_repaint();
	} else if ( input_mode == 'edit' ||  input_mode == 'warning' ) {
		text_edit_abandon();
		text_repaint();
	}
}
