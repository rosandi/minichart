// javascript tools
// (c) rosandi, 2020


function getJSON(surl, func) {
	var request = new XMLHttpRequest();
	request.open('GET', surl, true);

	request.onload = function() {
	  if (this.status >= 200 && this.status < 400) {
		// console.log(this.response);
		var data = JSON.parse(this.response);
		func(data);
	  } else {
		console.log("not found "+surl);
	  }
	};

	request.send();
}

function getText(surl, func) {
	var request = new XMLHttpRequest();
	request.open('GET', surl, true);

	request.onload = function() {
	  if (this.status >= 200 && this.status < 400) {
		var data=this.response;
		func(data);
	  } else {
		console.log("not found "+surl);
	  }
	};
	
	request.send();
}	

function getval(elid) {
    return document.getElementById(elid).value;
}

function setval(elid,val) {
    document.getElementById(elid).value=val;
}

function setText(id, text) {
	document.getElementById(id).innerHTML=text;
}

function appendText(id, text) {
	document.getElementById(id).innerHTML+=text;
}

function setbgColor(id, clr) {
	document.getElementById(id).style.backgroundColor=clr;
}
