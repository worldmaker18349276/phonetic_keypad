var punctuation = [
'，', '、', '。', '；', '．', '？', '！', '︰',
'「', '」', '『', '』', '…', '～', '＄', '％',
'＠', '＆', '＃', '＊', '‧', '【', '】', '《',
'》', '（', '）', '＜', '＞', '◎', '○', '●',
'⊕', '⊙', '△', '▲', '☆', '★', '◇', '◆', '□' ];



function query_char( cchar, callback ) {
	var para = 'zhuyin='+base64encode(cchar.getPhoneString());
	
	var oXHR = new XMLHttpRequest();
	oXHR.open("POST", "phonetab.php", false);
	oXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	oXHR.send(para);
	
	var sels = base64decode(oXHR.responseText).split(' ');
	return sels;
}
