var phone = new Array(4);
phone[1] = [ 'ㄅ', 'ㄉ', 'ㄓ', 'ㄆ', 'ㄊ', 'ㄍ', 'ㄐ', 'ㄔ', 'ㄗ', 'ㄇ', 'ㄋ', 'ㄎ', 'ㄑ', 'ㄕ', 'ㄘ', 'ㄈ', 'ㄌ', 'ㄏ', 'ㄒ', 'ㄖ', 'ㄙ' ];
phone[2] = [ 'ㄧ', 'ㄨ', 'ㄩ' ];
phone[3] = [ 'ㄚ', 'ㄞ', 'ㄢ', 'ㄦ', 'ㄛ', 'ㄟ', 'ㄣ', 'ㄜ', 'ㄠ', 'ㄤ', 'ㄝ', 'ㄡ', 'ㄥ' ];
phone[0] = [ 'ˇ', 'ˋ', 'ˊ', '˙', '　' ];


function CChar( text, phones, side ) {
	this.text = text;
	this.phones = phones;
	this.side = side;
}