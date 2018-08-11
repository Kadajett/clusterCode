'use strict';
const sys = require('sys')
const exec = require('child_process').exec;
const fig = require('figlet');
const express = require('express');

(() => {
    let app = express();
    // RUNNER sudo bash ./runner.sh "ls ~/books" 
    // copier "sudo bash ./copier.sh 0 0 '~/books' './clusterCode/books/*'"
    
    const booksLocation = './books';
    const endLocation = '~/books/.';
    const runner = 'sudo bash ./runner.sh';
	const servers = ['192.168.2.61', '192.168.2.84', '192.168.2.54'];
	const hashToFind = "1a74381c8afca5dc84d3b23c2a60f24e"

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
