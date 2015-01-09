var hightlight_style = {
	warning: 'Red',
	edit: 'LightGreen',
	select: 'Blue'
};

function printCChars( cx, text_size, line_spacing, total_cchar, hightlight ) {
	cx.save();
	cx.translate(0, text_size/2 + line_spacing/2);

	cx.save();
	var offset = 0;
	for ( var i=0; i<total_cchar.length; i++ ) {
		var cchar_width = measureCChar(cx, text_size, total_cchar[i]);
		offset += cchar_width;
		if ( offset > cx.canvas.width ) {
			cx.restore();
			cx.translate(0, text_size+line_spacing);
			cx.save();
			offset = cchar_width;
		}
		if ( hightlight )
			if ( hightlight[i] == 'focus' )
				printCursor(cx, text_size, cchar_width);
			else if ( hightlight_style[ hightlight[i] ] )
				printBackGround(cx, text_size, cchar_width, hightlight_style[ hightlight[i] ]);

		if ( total_cchar[i] )
			printCChar(cx, text_size, total_cchar[i]);
		cx.translate(cchar_width, 0);
	}
	cx.restore();

	cx.restore();
}


var CChar_width = [];
function measureCChar( cx, size, cchar ) {
	if ( CChar_width[size] === undefined ) {
		CChar_width[size] = 0;
		
		cx.save();
		cx.textAlign = 'left';
		cx.textBaseline = 'top';

		var h = size;
		var m = -Math.round(h/10);
		cx.font = h+'px 標楷體';
		var w = cx.measureText('文').width;
		CChar_width[size] += w+m;

		var h0 = Math.round(size/3.3);
		var m0 = -Math.round(h0/10);
		cx.font = h0+'px 標楷體';
		var w0 = cx.measureText('ㄅ').width;
		CChar_width[size] += w0+m0;
		CChar_width[size] += w0;
		cx.restore();
	}

	return CChar_width[size];
}

function printCChar( cx, size, cchar ) {
	cx.save();
	cx.textAlign = 'left';
	cx.textBaseline = 'top';

	cx.save();
	var h = size;
	var m = -Math.round(h/10);
	var s = h+m;
	var f = h+'px 標楷體';
	cx.font = f;
	var w = cx.measureText('文').width;
	cx.restore();

	cx.save();
	var h0 = Math.round(size/3.3);
	var m0 = -Math.round(h0/10);
	var s0 = h0+m0;
	var f0 = h0+'px 標楷體';
	cx.font = f0;
	var w0 = cx.measureText('ㄅ').width;
	cx.restore();

	// text
	cx.save();
	cx.font = f;
	cx.translate(0, -h/2)
	cx.fillText(cchar.text, 0, 0);
	cx.restore();
	cx.translate(s, 0);

	// phone column
	cx.save();
	cx.font = f0;
	cx.translate(0, -h0/2);
	var col = cchar.getPhoneColumn();
	switch ( col.length ) {
		case 1:
			cx.fillText(col[0], 0, 0);
			break;

		case 2:
			if ( phone_lists[1].indexOf(col[0]) != -1 && phone_lists[3].indexOf(col[1]) != -1 ) {
				cx.fillText(col[0], 0,-s0*2/3);
				cx.fillText(col[1], 0, s0*2/3);
			} else {
				cx.fillText(col[0], 0,-s0/2);
				cx.fillText(col[1], 0, s0/2);
			}
			break;

		case 3:
			cx.fillText(col[0], 0,-s0);
			cx.fillText(col[1], 0, 0);
			cx.fillText(col[2], 0, s0);
			break;

		case 4:
			cx.fillText(col[0], 0,-s0*2);
			cx.fillText(col[1], 0,-s0);
			cx.fillText(col[2], 0, 0);
			cx.fillText(col[3], 0, s0);
			break;
	}
	cx.restore();
	cx.translate(s0, 0);
	
	// phone side
	cx.save();
	cx.font = f0;
	cx.translate(0, -h0/2);
	var side = cchar.getPhoneSide();
	if ( side )
		if ( col.length == 1 )
			cx.fillText(side, 0, -s0/3);
		else
			cx.fillText(side, 0, 0);
	cx.restore();
	cx.translate(w0, 0);

	cx.restore();
}

function printBackGround( cx, size, width, st ) {
	cx.save();
	cx.fillStyle = st;
	cx.fillRect(0, -size/2, width, size);
	cx.restore();
}

function printCursor( cx, size, width ) {
	cx.save();
	cx.strokeStyle = 'Black';
	cx.beginPath();
	cx.moveTo(0, -size/2);
	cx.lineTo(0, size/2);
	cx.stroke();
	cx.restore();
}
