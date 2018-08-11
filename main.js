'use strict';
const sys = require('sys')
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const fig = require('figlet');
const express = require('express');

var walkSync = function(dir, filelist) {
    var path = path || require('path');
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        }
        else {
            if(file.indexOf('txt') !== -1) {
                filelist.push(path.join(dir, file));
            }
        }
    });
    return filelist;
};

(() => {
    let app = express();
    // RUNNER sudo bash ./runner.sh "ls ~/books" 
    // copier "sudo bash ./copier.sh 0 0 '~/books' './clusterCode/books/*'"
    
    const booksLocation = '/home/pi/usb/sda1';
    const endLocation = './booksEnd';
    const runner = 'sudo bash ./runner.sh';
	const servers = ['192.168.2.61', '192.168.2.84', '192.168.2.54'];
	const hashToFind = "1a74381c8afca5dc84d3b23c2a60f24e"

    const bookList = walkSync(`${booksLocation}`, []);
    exec(`rm -rf ${endLocation} && mkdir ${endLocation}`)
    bookList.forEach((location) => {
        exec(`mv ${location} ${endLocation}/.`, (err, stdout, stderr) => {
            if(err) {
                console.error(err);
            }
        });
    });

    // console.time('ClusterBuster')
    for(let i = 1; i < 4; i++) {
        // change this ./clusterCode/books/* to the location of the usb drive with all the books
        exec(`sudo sshpass -p "pipass${i}" scp -r ./books${i} pi@${servers[i-1]}:~/books`, function(err, stdout, stderr) {
            if (err) {
            // retsart your timers
            console.error(err);
            // console.timeEnd('ClusterBuster');
            }
            console.log(stdout);
            exec(`sudo sshpass -p "pipass${i}" scp -r ./filechecker.py pi@${servers[i-1]}:~/`, function(err, stdout, stderr) {
                if (err) {
                // retsart your timers
                console.error(err);
                // console.timeEnd('ClusterBuster');
                }
                exec(`${runner} "python filechecker.py ${hashToFind}"  ${i}`, (err, stdout, stderr) => {
                    if (err) {
                    // retsart your timers
                    console.error(err);
                    // console.timeEnd('ClusterBuster');
                    }
                    console.log(stdout)
                });
            });
            
        });
    }
    
    app.get('success',function(request,response){
        console.log(`Success ${new Date().getDate()}`)
        });

    app.listen(3000,function(){
        console.log("Started on PORT 3000");
    });
})();

