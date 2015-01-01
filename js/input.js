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
