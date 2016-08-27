var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static('static'));

const divStart = "<div>";
const divStop = "/<div>";

app.get('/getAlbum/:link', (req,res) => {
	const exec = require('child_process').exec;
	exec('python getAlbum.py ' + req.params.link, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
	res.set('Content-Type', 'text/html');
	res.send("Added to queue");
});

app.get('/showAlbum/:link', (req,res) => {
	var dirList = fs.readdirSync('static');
	if(dirList.indexOf(req.params.link)>-1){
		res.set('Content-Type', 'text/html');
		var toSend = divStart;
		var imgList = fs.readdirSync('static/'+req.params.link);
		for(var i=0;i<imgList.length;i++){
			toSend = toSend + "<img src=\"../static/" + req.params.link + "/" + imgList[i] + "\">";
		}
		toSend = toSend + divStop;
		res.send(new Buffer(toSend));
    }
    else{
		res.send("Not found<br>Use /getAlbum/albumName");
    }
});

app.get('/getDirect/:link', (req,res) => {
    const exec = require('child_process').exec;
    exec('python getDirect.py ' + req.params.link, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
    });
    res.send("Added to queue");
});

app.get('/showDirect/:link', (req,res) => {
    var dirList = fs.readdirSync('static/direct');
    if(dirList.indexOf("_" + req.params.link)>-1){
		res.set('Content-Type', 'text/html');
		var toSend ="<img src=\"../static/direct/_" + req.params.link + "\">";
		res.send(new Buffer(toSend));
    }
    else{
		res.send("Not found<br>Use /getDirect/imageName.jpg");
    }
});

app.use(function(req, res, next){
	res.send("Wrong API call<br>Use<br>/getDirect/imageName.jpg, /showDirect/imageName<br>or<br>/getAlbum/albumName, showAlbum/albumName");
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
    console.log("Server started");
});