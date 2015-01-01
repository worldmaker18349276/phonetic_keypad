var selections;
var page = 0;


function toggle_selector( bool ) {
	if ( bool ) {
		document.getElementById("keyboard").style.display = 'none';
		document.getElementById("selector").style.display = 'block';
	} else {
		document.getElementById("keyboard").style.display = 'block';
		document.getElementById("selector").style.display = 'none';
	}
}

function sel_load() {
	sel_clear();
	var sels = document.getElementsByClassName("selection");
	var n = Math.min(selections.length-page*sels.length, sels.length);
	for ( var i=0; i<n; i++ )
		sels[i].innerHTML = selections[i+page*sels.length];

	document.getElementById('sel_previous').disabled = ( page == 0 );
	document.getElementById('sel_next').disabled = ( n < sels.length );
}

function sel_clear() {
	var sels = document.getElementsByClassName("selection");
	for ( var i in sels )
		sels[i].innerHTML = '　';
}

function sel_init( sels ) {
	page = 0;
	selections = sels;
	sel_load();
}

function sel_previous() {
	page--;
	sel_load();
}

function sel_next() {
	page++;
	sel_load();
}

