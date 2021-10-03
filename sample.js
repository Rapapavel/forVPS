var userName = "test423425";
var passWord = "553355";

function authenticateUser(user, password)
{
    var token = user + ":" + password;
    // Base64 Encoding
    var hash = Buffer.from(token).toString('base64');
    return "Basic " + hash;
}

function download(text, name, type) {
  var a = document.getElementById("a");
  var file = new Blob([text], {type: type});
  a.href = URL.createObjectURL(file);
  a.download = name;
}

function myFunctionRequest()
{
		// подавление сообщений о нехватеке памяти
		require('events').EventEmitter.defaultMaxListeners = Infinity;
		var userName = "test423425";
		var passWord = "553355";
		let myHeaders =
		{
			'Date': new Date().toUTCString(),
			'Accept-Encoding': 'gzip,deflate',
			'Authorization': authenticateUser(userName, passWord)
		};

    let options =
    {
     		method: 'GET',
		   hostname: 'www.amocrm.ru',
     		port: 443,
		  	path: '/api/v4/leads/385123?with=contacts',
	  		headers: myHeaders,
     		muteHttpExceptions: true
    };


		const https = require('https');
		//const DOMParser = require('xmldom');
		const fs = require('fs');
		const file = fs.createWriteStream("file.json");
		var i =0;
		const req = https.request(options, res => {
	  	console.log('statusCode: ' + res.statusCode)
	  	if (res.statusCode=='401')
	  	{
			  	return;
	  	}

	  	let head = res.headers;
	  	console.log(head['content-length']);

		var parser = new DOMParser();

		// XMLDocument object:
		var doc1 = parser.parseFromString(d, "text/xml");

	  	return;


	   res.on('data', d => {
	   console.clear();
		console.log('Начато сохранение файла ...')
	   res.pipe(file);
  		console.log('Продолжаем ...')
  		console.log(i);
  		i++;

	   //req.end();
		//return;


		//process.stdout.write(d);
		//const obj = XML.parse(d);
		//console.log(obj.tostring());

	  })
	})

	req.on('error', error => {
	  console.error(error)
	})
	req.end()
	console.log('Сохранен ...')
}

myFunctionRequest();
