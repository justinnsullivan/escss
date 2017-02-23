#! /usr/bin/env node
var exec = require('child_process').exec;
var comm = process.argv.splice(2)
if (comm.length == 0){
	console.log('You must provide a source and a destination.');
	return;
}
if (comm.length == 1){
	console.log('You must provide a destination.');
	return;
}

var cmd = "babel-node src/main.js " + comm[0] + ' ' + comm[1];
exec(cmd, function(error, stdout, stderr) {
	console.log(stdout);
});