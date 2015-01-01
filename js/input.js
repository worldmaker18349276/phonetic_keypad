function keyin( button ) {
	var phone = button.innerHTML;
	current_cchar.putPhone(phone);
	repaintText();
}

function del() {
	current_cchar.deletePhone();
	repaintText();
}

function space() {
	current_cchar.deletePhone(0);
	repaintText();
	sel();
}

function sel() {
	alert(current_cchar.text + ': ' + current_cchar.phones.filter(String).join(' '));
}
