var phone_lists = new Array(4);
phone_lists[1] = [ 'ㄅ', 'ㄉ', 'ㄓ', 'ㄆ', 'ㄊ', 'ㄍ', 'ㄐ', 'ㄔ', 'ㄗ', 'ㄇ', 'ㄋ', 'ㄎ', 'ㄑ', 'ㄕ', 'ㄘ', 'ㄈ', 'ㄌ', 'ㄏ', 'ㄒ', 'ㄖ', 'ㄙ' ];
phone_lists[2] = [ 'ㄧ', 'ㄨ', 'ㄩ' ];
phone_lists[3] = [ 'ㄚ', 'ㄞ', 'ㄢ', 'ㄦ', 'ㄛ', 'ㄟ', 'ㄣ', 'ㄜ', 'ㄠ', 'ㄤ', 'ㄝ', 'ㄡ', 'ㄥ' ];
phone_lists[0] = [ 'ˇ', 'ˋ', 'ˊ', '˙', '　' ];


function CChar( text, phones ) {
	this.text = text;
	this.phones = new Array(4);
	for ( i in phones )
		this.putPhone(phones[i]);
}

CChar.prototype.getPhoneColumn = function() {
	var col = new Array();

	if ( this.phones[0] )
		if ( this.phones[0] == '˙' )
			col.unshift(this.phones[0]);

	for ( i=1; i<4; i++ )
		if ( this.phones[i] )
			col.push(this.phones[i]);

	return col;
}

CChar.prototype.getPhoneSide = function() {
	if ( this.phones[0] )
		if ( this.phones[0] != '˙' )
			return this.phones[0];
}

CChar.prototype.putPhone = function( phone ) {
	for ( i=0; i<4; i++ )
		if ( phone_lists[i].indexOf(phone) != -1 )
			this.phones[i] = phone;
}

CChar.prototype.deletePhone = function( i ) {
	if ( i === undefined )
		delete this.phones[i];
	else
		for ( i=4; i>0; i-- )
			if ( this.phones[i%4] ) {
				delete this.phones[i];
				break;
			}
}
