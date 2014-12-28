function measureCChar( cx, size, cchar ) {
	var total_width = 0;
	cx.save();
	cx.textAlign = 'left';
	cx.textBaseline = 'top';

	var h = size;
	var m = -Math.round(h/10);
	cx.font = h+'px 標楷體';
	var w = cx.measureText('文').width;
	total_width += w+m;

	var h0 = Math.round(size/3.3);
	var m0 = -Math.round(h0/10);
	cx.font = h0+'px 標楷體';
	var w0 = cx.measureText('ㄅ').width;
	total_width += w0+m0;
	total_width += w0+m0;
	cx.restore();

	total_width *= cchar.length;

	return total_width;
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

	for ( var i=0; i<cchar.length; i++ ) {

		// text
		cx.save();
		cx.font = f;
		cx.translate(0, -h/2)
		cx.fillText(cchar[i].text, 0, 0);
		cx.restore();
		cx.translate(s, 0);

		// phone column
		cx.save();
		cx.font = f0;
		cx.translate(0, -h0/2);
		var col = cchar[i].getPhoneColumn();
		switch ( col.length ) {
			case 1:
				if ( phone_lists[1].indexOf(col[0]) != -1 )
					cx.fillText(col[0], 0,-s0/2);
				else
					cx.fillText(col[0], 0, s0/2);
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
		var side = cchar[i].getPhoneSide();
		if ( side )
			cx.fillText(side, 0, 0);
		cx.restore();
		cx.translate(s0, 0);
	}

	cx.restore();
}
