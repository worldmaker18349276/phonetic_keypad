var phone_lists = new Array(4);
phone_lists[1] = [ 'ㄅ', 'ㄉ', 'ㄓ', 'ㄆ', 'ㄊ', 'ㄍ', 'ㄐ', 'ㄔ', 'ㄗ', 'ㄇ', 'ㄋ', 'ㄎ', 'ㄑ', 'ㄕ', 'ㄘ', 'ㄈ', 'ㄌ', 'ㄏ', 'ㄒ', 'ㄖ', 'ㄙ' ];
phone_lists[2] = [ 'ㄧ', 'ㄨ', 'ㄩ' ];
phone_lists[3] = [ 'ㄚ', 'ㄞ', 'ㄢ', 'ㄦ', 'ㄛ', 'ㄟ', 'ㄣ', 'ㄜ', 'ㄠ', 'ㄤ', 'ㄝ', 'ㄡ', 'ㄥ' ];
phone_lists[0] = [ 'ˇ', 'ˋ', 'ˊ', '˙', '　' ];


function CChar( text, phones ) {
	this.text = text;
	this.phones = phones;
}

CChar.prototype.getFirstColumn = function() {
	var col = new Array();

	for ( i in this.phones ) {
		var e = this.phones[i];
		if ( e == '˙' ) {
			col.push(e);
			break;
		}
	}

	for ( i in this.phones ) {
		var e = this.phones[i];
		if ( phone_lists[1].indexOf(e) != -1 ) {
			col.push(e);
			break;
		}
	}

	for ( i in this.phones ) {
		var e = this.phones[i];
		if ( phone_lists[2].indexOf(e) != -1 ) {
			col.push(e);
			break;
		}
	}

	for ( i in this.phones ) {
		var e = this.phones[i];
		if ( phone_lists[3].indexOf(e) != -1 ) {
			col.push(e);
			break;
		}
	}

	return col;
}

CChar.prototype.getSide = function() {
	for ( i in this.phones ) {
		if ( phone_lists[0].indexOf(e) != -1 && e != '˙' )
			return e;
	}
}
