var canvas;
var text_size; /*text height (px)*/
var line_spacing;

var total_cchar;
var current_index = 0;
var hightlight;


function repaintText() {
	canvas.width = canvas.width;
	var cx = canvas.getContext('2d');

	cx.save();
	cx.translate(0, text_size/2 + line_spacing/2);

	cx.save();
	var offset = 0;
	for ( var i=0; i<=total_cchar.length; i++ ) {
		var cchar_width = measureCChar(cx, text_size, total_cchar[i]);
		offset += cchar_width;
		if ( offset > canvas.width ) {
			cx.restore();
			cx.translate(0, text_size+line_spacing);
			cx.save();
			offset = cchar_width;
		}
		if ( current_index == i )
			if ( hightlight == 'warning' )
				printBackGround(cx, text_size, 'Red');
			else if ( hightlight == 'edit' )
				printBackGround(cx, text_size, 'LightGreen');
			else
				printCursor(cx, text_size, 'Black');

		if ( total_cchar[i] )
			printCChar(cx, text_size, total_cchar[i]);
		cx.translate(cchar_width, 0);
	}
	cx.restore();

	cx.restore();
}

function text_del() {
	total_cchar.splice(current_index, 1);
}

function text_insert( cchar ) {
	total_cchar.splice(current_index, 0, cchar);
}

