'use strict';

const { fork } = require('child_process');
const figlet = require('figlet');
const request = require('request');
const md5 = require('md5');
const fs = require('fs');
let Master = {};

figlet('Cluster Buster', (err, data) => {
	console.log(data);
});

console.log("Lets get started");

request('http://norvig.com/big.txt', (err, res, body) => {
	if (err) { return console.log(err); }
	let tempArray = body.split("\n");
	
	//console.log(Master.hashed);
});


(() => {
	if(process && process.argv && Array.isArray(process.argv)) {
		Master.requestedHash = process.argv[2];

		request('http://norvig.com/big.txt', (err, res, body) => {
			if (err) {return console.log(err);}

			Master.body = body;
			//console.log(Master.hashed);});
			
			for(var i = 0; i < Master.body.length; i ++) {
				let tempHash = md5(Master.body.substr(i, i+19));
				if(Master.requestedHash === tempHash) {
					console.log('success!')
					return;
				}
			}
		})
	}
})()
