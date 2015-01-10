function ctrl_copy_text() {
	var str = '';
	for ( var i in cchar_text )
		str += cchar_text[i].text;
	window.prompt('Copy to clipboard: Ctrl+C, Enter', str);
}

function ctrl_copy_phone() {
	var str = '';
	for ( var i in cchar_text ) {
		var ph = cchar_text[i].getPhoneString();
		if ( ph )
			str += ph + ' ';
	}
	window.prompt('Copy to clipboard: Ctrl+C, Enter', str);
}

function ctrl_save_img() {
	var url = text_canvas.toDataURL('image/png');

	var a = document.createElement('a');
	a.href = url;
	a.download = 'text';
	a.style.display = 'none';
	document.body.appendChild(a);
	a.click();
	delete a;
}

function ctrl_read() {
	var url = 'http://translate.google.com/translate_tts?tl=zh&q=';
	for ( var i in cchar_text )
		url += cchar_text[i].text;
	var audio = new Audio(url);
	audio.play();
}

var stylesheets = [ 'main.css', 'keyboard.css', 'selector.css', 'controller.css' ];
function ctrl_resize( size ) {
	var link;
	for ( var i in stylesheets ) {
		link = document.createElement('link');
		link.href = 'style/'+size+'/'+stylesheets[i];
		link.type = 'text/css';
		link.rel = 'stylesheet';
		document.getElementsByTagName('head')[0].appendChild(link);
	}

	var canvaswidth;
	switch ( size ) {
		case 'small':
			canvaswidth = 530;
			break;

		case 'big':
			canvaswidth = 764;
			break;
	}
	text_init(text_canvas, canvaswidth);
}