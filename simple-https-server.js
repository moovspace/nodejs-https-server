const fs = require('fs');
const https = require('http');
const https = require('https');

const port_http = 8000;
const port_https = 4443;

const options = {
	key: fs.readFileSync('./.ssh/key.pem'),
	cert: fs.readFileSync('./.ssh/cert.pem')
};

// Https
https.createServer(options, function (req, res) {
	res.writeHead(200);
	res.end("Hello world https\n");
}).listen(port_https, () => {
	console.log(`Server https running on port: ${port_https}`);
});

// Http
https.createServer(function (req, res) {
	res.writeHead(200);
	res.end("Hello world http\n");
}).listen(port_http, () => {
	console.log(`Server http running on port: ${port_http}`);
});