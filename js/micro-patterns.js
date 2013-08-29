window['micro-patterns'] = function ($, el){
	var debouncingEl = $('.debouncing', el)[0];
	var throttlingEl = $('.throttling', el)[0];

	var debounceId;
	var throttleId;


	function debounce(){
		debouncingEl.removeChild(debouncingEl.lastChild);
		addTick(debouncingEl, 'def');
	}


	function throttle(){
		throttleId = null;
		throttlingEl.removeChild(throttlingEl.lastChild)
		addTick(throttlingEl, 'purple');
	}


	function addTick(el, color){
		var tickEl = $('<div class="mp-tick '+color+'" />')[0];
		el.appendChild(tickEl);
	}


	function isActiveView(){
		return	debouncingEl.offsetWidth > 0;
	}


	setInterval(function (){
		if( isActiveView() ){
			addTick(debouncingEl, 'white');
			addTick(throttlingEl, 'white');
			if( debouncingEl.scrollHeight > 150 ){
				debouncingEl.innerHTML = '';
				throttlingEl.innerHTML = '';
			}
		}
	}, 200);



	// Debouncing
	document.addEventListener('keyup', function (){
		if( isActiveView() ){
			clearTimeout(debounceId);
			debounceId = setTimeout(debounce, 600);
		}
	});


	// Throttling
	document.addEventListener('keyup', function (){
		if( isActiveView() ){
			if( !throttleId ){
				clearTimeout(throttleId);
				throttleId = setTimeout(throttle, 600);
			}
		}
	});
};
