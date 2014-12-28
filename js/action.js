var canvas;
var text_size;
var current_cchar;

function repaintCChar() {
	canvas.width = canvas.width;
	var cx = canvas.getContext('2d');
	cx.translate(5, canvas.height/2);
	printCChar(cx, text_size, ch);
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
