function measureCChar( cx, size, cchar ) {
	var total_width = 0;
	cx.save();
	cx.textAlign = 'left';
	cx.textBaseline = 'top';

	var h = size;
	var m = -Math.round(h/10);
	cx.font = h+'px 標楷體';
	var w = cx.measureText(cchar.text).width;
	total_width += w+m;

	var h0 = Math.round(size/3.3);
	var m0 = -Math.round(h0/10);
	cx.font = h0+'px 標楷體';
	var w0 = cx.measureText(cchar.text).width;
	total_width += w0+m0;
	total_width += w0+m0;
	cx.restore();

	return total_width;
}

function printCChar( cx, size, cchar ) {
	var total_width = 0;
	cx.save();
	cx.textAlign = 'left';
	cx.textBaseline = 'top';

	var h = size;
	var m = -Math.round(h/10);
	cx.font = h+'px 標楷體';
	var w = cx.measureText(cchar.text).width;

	cx.save();
	cx.translate(0, -h/2)
	cx.fillText(cchar.text, 0, 0);
	cx.restore();
	
	total_width += w+m;
	cx.translate(w+m, 0);

	var h0 = Math.round(size/3.3);
	var m0 = -Math.round(h0/10);
	var s0 = h0+m0;
	cx.font = h0+'px 標楷體';
	var w0 = cx.measureText(cchar.text).width;

	var col = cchar.getFirstColumn();
	switch ( col.length ) {
		case 1:
			cx.save();
			cx.translate(0, -h0/2);
			cx.fillText('　', 0,-s0/2);
			cx.fillText(col[0], 0, (s0/2));
			cx.restore();
			break;

		case 2:
			cx.save();
			cx.translate(0, -h0/2);
			cx.fillText(col[0], 0,-(s0/2));
			cx.fillText(col[1], 0, (s0/2));
			cx.restore();
			break;

		case 3:
			cx.save();
			cx.translate(0, -h0/2);
			cx.fillText(col[0], 0,-s0);
			cx.fillText(col[1], 0, 0);
			cx.fillText(col[2], 0, s0);
			cx.restore();
			break;

		case 4:
			cx.save();
			cx.translate(0, -h0/2);
			cx.fillText(col[0], 0,-s0*2);
			cx.fillText(col[1], 0,-s0);
			cx.fillText(col[2], 0, 0);
			cx.fillText(col[3], 0, s0);
			cx.restore();
			break;
	}

	total_width += s0;
	cx.translate(s0, 0);
	
	if ( cchar.side ) {
		cx.save();
		cx.translate(0, -h0/2)
		cx.fillText(cchar.side, 0, 0);
		cx.restore();
	}
	total_width += s0;

	cx.restore();

	return total_width;
}

