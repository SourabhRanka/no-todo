'use strict';
var http = require('http');
var fs = require('fs');

const util = require('util');

console.log('program started');
http.createServer(function (req, res) {
  console.log('server requested');
  console.log(util.inspect(req.url, { depth: 1 }));
  if (req.url === '/') {
    console.log('inside /');
    fs.readFile('js-todo/index.html', function (err, data) {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write(data);
      res.end();
    });
  } else {
    console.log('else part');
    fs.readFile('js-todo/' + req.url, function (err, data) {
      if(err){
        return err;
      }
      res.writeHead(200);
      res.write(data);
      res.end();
    });
    //res.write('hello world');
    //res.end();
  }
  


}).listen(8080);