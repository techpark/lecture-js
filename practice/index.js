var form = document.getElementsByTagName('form')[0],
	inputs = form.getElementsByTagName('input'),
	selects = form.getElementsByTagName('select');

function validate(e){
	var isValid = true,
		input = e.target || e;

	if (input.required && !validateRequired(input)){
		isValid = false;
	}

	if (input.type == 'email' && !validateEmail(input)){
		isValid = false;
	}

	setError(input, !isValid);

	return isValid;
}

function validateRequired(input){
	return !!input.value;
}

function validateEmail(input){
	return !!input.value.match(/.+?@(.+?\.)+.+/i);
}

function validateSelects(){
	var isValid = true;

	if (selects[0].value && !selects[1].value || !selects[0].value && selects[1].value){
		isValid = false;
	}

	setError(selects[0], !isValid);
	setError(selects[1], !isValid);

	return isValid;
}

function setError(input, isError){
	input.classList[isError ? 'add' : 'remove']('form__field-input_error');
}

for (var i = 0, l = inputs.length; i < l; i++){
	inputs[i].addEventListener('input', validate, false);
}

selects[0].addEventListener('change', validateSelects, false);
selects[1].addEventListener('change', validateSelects, false);

form.noValidate = true;

form.addEventListener('submit', function(e){
	var isValid = true;
	for (var i = 0, l = inputs.length; i < l; i++){
		if (!validate(inputs[i])){
			isValid = false;
		}
	}

	if (!validateSelects()){
		isValid = false;
	}

	if (!isValid){
		e.preventDefault();
	}

}, false);
