var punctuation = [
'，', '、', '。', '；', '．', '？', '！', '︰',
'「', '」', '『', '』', '…', '～', '＄', '％',
'＠', '＆', '＃', '＊', '‧', '【', '】', '《',
'》', '（', '）', '＜', '＞', '◎', '○', '●',
'⊕', '⊙', '△', '▲', '☆', '★', '◇', '◆', '□' ];



function query_char( cchar, callback ) {
	var para = 'zhuyin='+cchar.getPhoneString();
	
	var oXHR = new XMLHttpRequest();
	oXHR.open("POST", "phonetab.php", false);
	oXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	oXHR.send(para);
	
	if ( oXHR.responseText === '' )
		return new Array();
	else
		return oXHR.responseText.split(' ');
}
