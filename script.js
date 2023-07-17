
var TAB = "  ";
var LE = "\n";
var header = "#%RAML 1.0 DataType" + LE;
var keysOptional ;
var keysCamelCased;

function convert() {
	keysOptional = areKeysOptional.checked;
	keysCamelCased = areKeysCamelCased.checked;
	jsonInput = input.value;
	// console.log(keysOptional);
	opString = "";
	if (jsonInput == '' || jsonInput == null) {
		output.value = "Input is Empty 🙄🙄";
	} else if (!isValidJSONString(jsonInput)) {
		opString = "Invalid JSON, Plese check your input !!!";
	} else {
		opString = header + buildRoot(jsonInput);
	}
	output.value = opString.replace("\n\n", "\n");
}

function isValidJSONString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

function buildRoot(str) {
	var type = "";
	inpJson = JSON.parse(str);

	if (Array.isArray(inpJson)) {
		type = "type: array" + LE + "items :" + LE;
		type += buildArray(true, inpJson, 1);
	} else if (typeof inpJson === "object") {
		type = "type: object" + LE + "properties:" + LE;
		type += buildObject(true, inpJson, 1);
	}
	return type;
}

function buildObject(isRootObj, str, level) {
	var obj = "";
	if (!isRootObj) {
		level++;
		obj = getTabs(level) + "properties:";
	}
	level++;
	console.log(str);
	for (var key in str) {
		obj += LE + getTabs(level) + getElementType(key, str[key], level);
	}
	return obj;
}

function buildArray(isRootObj, array, level) {
	var obj = "";
	if (array.length > 0) {
		if (!isRootObj) {
			level++;
			obj = getTabs(level) + "items:";
		}
		level++;
		obj += LE + getTabs(level) + getElementType(null, array[0], level);
	} else if (!isRootObj) {
		obj = getTabs(++level) + "type: array" + LE;
	}
	return obj;
}

function getElementType(key, str, level) {
	var type = "";
	if (keysCamelCased) {
		key = (key === null) ? null : v.camelCase(key);
	}
	if (keysOptional) {
		key = (key === null) ? null : key+"?";
	}

	key = (key === null) ? "type" : key;

	if (Array.isArray(str)) {
		type = key + ": " + LE + buildArray(false, str, level);
	} else if (str === null) {
		type = key + ": nil";
	} else if (typeof str === "object") {
		type = key + ":" + LE + buildObject(false, str, level);
	} else if (typeof str === "string") {
		type = key + ": string";
	} else if (typeof str === "number") {
		type = key + ": number";
	} else if (typeof str === "boolean") {
		type = key + ": boolean";
	}
	return type;
}

function getTabs(level) {
	var tabs = "";
	for (var i = 0; i < level; i++) {
		tabs += TAB;
	}
	return tabs;
}

// Non Functional requirments 
function loadPage() {
	clearContents();
	document.getElementById("input").focus();
}

function copy() {
	if (output.value.startsWith(header)) {
		let textarea = document.getElementById("output");
		textarea.select();
		document.execCommand("copy");
		window.getSelection().removeAllRanges();
		alert("Copied to clipboard");
	}
}

function clearContents() {
	input.value = "";
	output.value = "";
	fileName.hidden = true;
}

function downloadRAML() {
	if (fileName.hidden == true) {
		fileName.hidden = false;
		fileName.focus();
	} else if (output.value.startsWith(header) && fileName.value != "") {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output.value));
		element.setAttribute('download', fileName.value + ".raml");
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	} else {
		if (output.value.startsWith(header) && fileName.value == "") {
			alert("Please enter file name");
		} else if (!output.value.startsWith(header) && fileName.value != "") {
			alert("Please check your input");
		} else {
			alert("Please check your input and file name");
		}
	}
}

function comingSoon() {
	alert("This feature is coming soon 🤞🤞");
}