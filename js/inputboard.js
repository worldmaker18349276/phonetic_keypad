var inputboards = [ 'keyboard', 'selector', 'controller', 'setting' ];
var current_board = 'keyboard';
function toggle_inputboard( board ) {
	if ( inputboards.indexOf(board) != -1 ) {
		current_board = board;
		for ( var i in inputboards )
			document.getElementById(inputboards[i]).style.display
				= (inputboards[i]==board?'block':'none');
	}
}


