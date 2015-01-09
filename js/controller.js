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
