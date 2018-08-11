'use strict';

const sys = require('sys');
const exec = require('child_process').exec;


(() => {
	let fileNames, piIp, loc;
	piIp = process.argv[2];
	fileNames = process.argv[3];
	loc = process.argv[3];
	let call = exec("scp ${fileNames.join(' ')} pi@${piIP}:${loc}", (err, stdout, stderr) => {
		console.log(stdout);
	});
})()
