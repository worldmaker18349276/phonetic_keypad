var current_index = 0;


function keyin( button ) {
	var phone = button.innerHTML;
	total_cchar[current_index].putPhone(phone);
	repaintText();
}

function del() {
	total_cchar[current_index].deletePhone();
	repaintText();
}

function space() {
	total_cchar[current_index].deletePhone(0);
	repaintText();
	sel();
}

function sel() {
	alert(total_cchar[current_index].text + ': ' + total_cchar[current_index].phones.filter(String).join(' '));
}

function text_del() {
	total_cchar.splice(current_index, 1);
}

function text_insert( cchar ) {
	total_cchar.splice(current_index, 0, cchar);
}

