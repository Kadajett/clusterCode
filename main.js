'use strict';
const sys = require('sys')
const exec = require('child_process').exec;
const fig = require('figlet');

(() => {
    // RUNNER sudo bash ./runner.sh "ls ~/books" 
    // copier "sudo bash ./copier.sh 0 0 '~/books' './clusterCode/books/*'"
    
    const booksLocation = './books';
    const endLocation = '~/books/.';
    const runner = 'sudo bash ./runner.sh';
	const servers = ['192.168.2.61', '192.168.2.84', '192.168.2.54'];
	

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
            // exec(runner + " ")
        });
    }
    
})();
