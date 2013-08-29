window['regexp'] = function ($, el){
	var inputEl = $('input', el)[0];
	var resultEl = $('.result', el)[0];
	var resultHL = $('.result-hl', el)[0];
	var resultString = resultEl.innerHTML.replace(/<br\s*\/?>/g, '').trim();
	var _debounce;

	inputEl.on('focus', function (){
		shower.freeze = true;
	});

	inputEl.on('blur', function (){
		shower.freeze = false;
	});

	inputEl.on('input', function (){
		clearTimeout(_debounce);
		_debounce = setTimeout(hlMatches, 100);
	});

	var colors = ['#8bced1', '#9fb9db'];
	var colors2 = ['', '#c82829', '#f5871f', '#718c00', '#8959a8', '#4271ae', '#3e999f'];

	function hlMatches(){
		var regexp = inputEl.value.trim();
		var flags = regexp.split('/').pop();

		try {
			regexp = regexp.indexOf('/') == 0 ? regexp.replace(/^.*?\/(.+)\/\w*/, '$1') : regexp;
			regexp = new RegExp(regexp, /[gis]/.test(flags) ? flags : 'm');
		}
		catch (er){
			regexp = null;
		}

		resultHL.innerHTML = '';

		var idx = 0;
		resultEl.innerHTML = resultString.replace(regexp, function (str){
			var groups = arguments, i, n = arguments.length - 2;

			for( i = n; i >= 1; i-- ){
				var div = $('<div style="position: absolute"/>')[0];

				div.innerHTML = (resultString.substr(0, groups[n]) + str.replace(
					groups[i],
					'<span style="padding-bottom: '+((i-1)*3)+'px;border-bottom: 3px solid '+colors2[i]+'; background-color: rgba(255,255,255,.4)">'+groups[i]+'</span>'
				)).replace(/\n/g, '<br/>');

				resultHL.appendChild(div);
			}

			return '<span style="background-color: '+colors[+!(++idx%2)]+';">'+ str +'</span>';
		}).replace(/\n/g, '<br/>');
	}


	// init
	hlMatches();
};
