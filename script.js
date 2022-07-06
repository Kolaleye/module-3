// DOM Elements
var resultEl = document.getElementById('result');
var lengthEl = document.getElementById('length');
var uppercaseEl = document.getElementById('uppercase');
var lowercaseEl = document.getElementById('lowercase');
var numbersEl = document.getElementById('numbers');
var symbolsEl = document.getElementById('symbols');
var generateEl = document.getElementById('generate');
var clipboard = document.getElementById('clipboard');

var randomFunc = {
	upper: getRandomUpper,
	lower: getRandomLower,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

generateBtn.addEventListener("click", writePassword);

clipboard.addEventListener('click', () => {
	var textarea = document.createElement('textarea');
	var password = resultEl.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});

generateEl.addEventListener('click', () => {
	var length = +lengthEl.value;
	var hasUpper = uppercaseEl.checked;
	var hasLower = lowercaseEl.checked;
	var hasNumber = numbersEl.checked;
	var hasSymbol = symbolsEl.checked;
	
	resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

function generatePassword( upper, lower, number, symbol, length) {
	let generatedPassword = '';
	var typesCount = upper + lower + number + symbol;
	var typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			var funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	var finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	var symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}