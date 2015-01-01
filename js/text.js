var canvas;
var text_size; /*text height (px)*/
var line_spacing;
var total_cchar;
var current_cchar;

function repaintText() {
	canvas.width = canvas.width;
	var cx = canvas.getContext('2d');

	cx.save();
	cx.translate(0, text_size/2 + line_spacing/2);

	var offset = 0;
	cx.save();
	for ( var i=0; i<total_cchar.length; i++ ) {
		var cchar_width = measureCChar(cx, text_size, total_cchar[i]);
		offset += cchar_width;
		if ( offset > canvas.width ) {
			cx.restore();
			cx.translate(0, text_size+line_spacing);
			cx.save();
			offset = cchar_width;
		}
		if ( total_cchar.indexOf(current_cchar) == i )
			printBackGround(cx, text_size, 'LightGreen');
			
		printCChar(cx, text_size, total_cchar[i]);
		cx.translate(cchar_width, 0);
	}
	cx.restore();

	cx.restore();
}

