var items;
var sel_previous_page_button;
var sel_next_page_button;

var selections;
var page = 0;


function _sel_load() {
	_sel_clear();
	var n = Math.min(selections.length-page*items.length, items.length);
	for ( var i=0; i<n; i++ )
		items[i].innerHTML = selections[i+page*items.length];

	sel_previous_page_button.disabled = ( page == 0 );
	sel_next_page_button.disabled = ( n < items.length );
}

function _sel_clear() {
	var items = document.getElementsByClassName("selection");
	for ( var i in items )
		items[i].innerHTML = '　';
}



function sel_init( it, pre, next ) {
	items = it;
	sel_previous_page_button = pre;
	sel_next_page_button = next;
}

function sel_set( sels ) {
	page = 0;
	selections = sels;
	_sel_load();
}

function sel_previous_page() {
	page--;
	_sel_load();
}

function sel_next_page() {
	page++;
	_sel_load();
}

function sel_esc() {
	toggle_inputboard('keyboard');

	if ( input_mode == 'edit' ) {
		text_current().deletePhone(0);
	}

	text_repaint();
}

function select( button ) {
	if ( button.innerHTML != '　' ) {
		toggle_inputboard('keyboard');

		if ( input_mode == 'focus' ) {
			text_insert(new CChar(button.innerHTML));
		} else if ( input_mode == 'edit' ) {
			text_current().text = button.innerHTML;
			text_edit_finish();
		}

		text_repaint();
	}
}

