/*
Ssl certs
# Folder
mkdir .ssh
cd .ssh
# Create certs
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem

# Or
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 9999

Install
sudo apt install nodejs npm

# Folder
mkdir app
cd app

# Packages
npm init
npm install express express-fileupload body-parser mysql mongoose ejs req-flash cors --save
npm install nodemon -g

# Database
CREATE DATABASE nodejs;
CREATE TABLE IF NOT EXISTS `players` (
	`id` int(5) NOT NULL AUTO_INCREMENT,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`position` varchar(255) NOT NULL,
	`number` int(11) NOT NULL,
	`image` varchar(255) NOT NULL,
	`user_name` varchar(20) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1;

INSERT INTO `players` (`id`, `first_name`, `last_name`, `position`, `number`, `image`, `user_name`) VALUES (NULL, 'Beny', 'Hill', 'Miszcz', '123', 'Brak', 'BennyHill');

# Run it
node main.js
# See in browser:
https://localhost:8000
https://localhost:4443

# See and kill node app
netstat -tulpn
killall -9 node

# Poczytaj:
https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server
https://expressjs.com/en/guide/routing.html
http://expressjs.com/en/4x/api.html#app.listen
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
https://dev.to/achowba/build-a-simple-app-using-node-js-and-mysql-19me
https://stackoverflow.com/questions/38112643/how-to-use-routes-from-express-for-https
# sql injection
https://www.veracode.com/blog/secure-development/how-prevent-sql-injection-nodejs
https://fsgeek.pl/post/node-mysql
https://github.com/mysqljs/mysql#escaping-query-values
# pfx to pem
https://www.xolphin.com/support/Certificate_conversions/Convert_pfx_file_to_pem_file
*/

var fs              = require('fs');
var http            = require('http');
var https           = require('https');
var express         = require('express');       // call express
var app             = express();                // define our app using express
var mysql           = require('mysql');
var bodyParser      = require('body-parser');
var cors            = require('cors');
var config          = require('./config');
// const path       = require('path');
// var fileUpload   = require('express-fileupload');
// var mongoose     = require('mongoose');

// Configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Parse form data client

// Configure the CORS rights
app.use(cors());

// Enable https
var privateKey = fs.readFileSync('../.ssh/key.pem', 'utf8');
var certificate = fs.readFileSync('../.ssh/cert.pem', 'utf8');
// var ca = fs.readFileSync("../.ssh/ca.pem", "utf8");
// var pass_phrase = '';

var credentials = {
	// ca: ca,
	// passphrase: pass_phrase,
	key: privateKey,
	cert: certificate
};

// Http
var httpServer = http.createServer(app);
// Https
var httpsServer = https.createServer(credentials, app);

// Configure app port
var port_http = process.env.PORT || config.port_http; // 8000
var port_https = process.env.PORT_HTTPS || config.port_https; // 4443

/*
	Configure database connection
*/
const db = mysql.createConnection ({
	host: 'localhost',
	user: 'root',
	password: 'toor',
	database: 'nodejs'
});

db.connect((err) => {
	if (err) {
			throw err;
	}
	console.log('Connected to database');
});
global.db = db;

// Router
var router = express.Router();

// Middleware for all req
router.use(function(req, res, next) {
	// do logging
	console.log('>>>> Hi, something is happening. Here is the path: '+req.path);
	next();
});

// Routes
var app_routes = require('./routes/app.js');
app.use('/', app_routes);

// Sample route
// router.route('/waitlist/join').post(waitlistCtrl.joinWaitlist);
// app.use('/api', router);

// Sample route
// router.get('/contact', function (req, res) {
//   res.send('Contact page');
// });

// Http
httpServer.listen(port_http, () => {
	console.log(`Server http running on port: ${port_http}`);
});
// Or
// http.createServer(app).listen(port_http);

// Https
httpsServer.listen(port_https, () => {
	console.log(`Server https running on port: ${port_https}`);
});
// Or
// https.createServer(credentials, app).listen(port_https);