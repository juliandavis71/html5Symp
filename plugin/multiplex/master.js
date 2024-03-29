(function() {
	// don't emit events from inside the previews themselves
	if ( window.location.search.match( /receiver/gi ) ) { return; }

	var socket = io.connect(multiplex.url);
	
	Reveal.addEventListener( 'slidechanged', function( event ) {
		var nextindexh;
		var nextindexv;
		var slideElement = event.currentSlide;

		if (slideElement.nextElementSibling && slideElement.parentNode.nodeName == 'SECTION') {
			nextindexh = event.indexh;
			nextindexv = event.indexv + 1;
		} else {
			nextindexh = event.indexh + 1;
			nextindexv = 0;
		}

		var notes = slideElement.querySelector('aside.notes');
		var slideData = {
			indexh : event.indexh,
			indexv : event.indexv,
			nextindexh : nextindexh,
			nextindexv : nextindexv,
			secret: multiplex.secret,
			socketId : multiplex.id
		};

		if( event.origin !== 'remote') socket.emit('slidechanged', slideData);
	} );
}());