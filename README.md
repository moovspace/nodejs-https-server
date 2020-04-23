# Node.js https server
Node.js https server with express router and mysql databases.

# Ssl certs

## Folder
```
mkdir .ssh
cd .ssh
```

## Create certs
```
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```

## Or
```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 9999
# Install
sudo apt install nodejs npm
```

## Folder
```
mkdir app
cd app
```

## Add required
```
npm init
npm install express express-fileupload body-parser cookie-parser mysql cors serve-favicon morgan multer --save
```

## Optional
```
npm install mongoose ejs req-flash --save
npm install nodemon -g
```

## Database
```
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
```

## Run server it
```
node main.js
```

## See in browser:
http://localhost:8000
https://localhost:4443

## See and kill node app
```
netstat -tulpn
killall -9 node
```

## Poczytaj:
```
https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server
https://expressjs.com/en/guide/routing.html
http://expressjs.com/en/4x/api.html#app.listen
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
https://dev.to/achowba/build-a-simple-app-using-node-js-and-mysql-19me
https://stackoverflow.com/questions/38112643/how-to-use-routes-from-express-for-https
# upload
https://www.npmjs.com/package/express-fileupload
https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp
https://bezkoder.com/node-js-upload-multiple-files
https://blog.eduonix.com/web-programming-tutorials/learn-build-upload-multiple-files-using-nodejs
https://github.com/burib/nodejs-multiple-file-upload-example
# sql injection
https://www.veracode.com/blog/secure-development/how-prevent-sql-injection-nodejs
https://fsgeek.pl/post/node-mysql
https://github.com/mysqljs/mysql#escaping-query-values
# pfx to pem
https://www.xolphin.com/support/Certificate_conversions/Convert_pfx_file_to_pem_file
```
