var canvas;
var text_size;
var total_cchar;
var current_cchar;

function repaintCChar() {
	canvas.width = canvas.width;
	var cx = canvas.getContext('2d');
	var total_width = measureCChar(cx, text_size, total_cchar);
	cx.translate(canvas.width/2-total_width/2, canvas.height/2);
	printCChar(cx, text_size, total_cchar);
}


function keyin( button ) {
	var phone = button.innerHTML;
	current_cchar.putPhone(phone);
	repaintCChar();
}

function del() {
	current_cchar.deletePhone();
	repaintCChar();
}

function space() {
	current_cchar.deletePhone(0);
	repaintCChar();
	enter();
}

function enter() {
	alert(current_cchar.text + ': ' + current_cchar.phones.filter(String).join(' '));
}
