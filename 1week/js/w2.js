var onmessage = function( data ) {
	
	var first = temp = 0,second = 1;
	for( var i = 0;i < data.data - 2;i++ ) {
		temp = first + second;
		first = second;
		second = temp;
	}
	
	postMessage(second);
}