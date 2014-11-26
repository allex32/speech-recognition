/**
 Модуль, отвечающий за принятие task-ов из очереди

 */


var kue = require('kue');
var q = kue.createQueue(redisSettings.ConnectionSettings);
var jobs=q;


var speech_recognition = require('./speech_recognition');

jobs.process('audio', function (job, done) {

    var result = speech_recognition(job.data, getResponse);

    function getResponse(err, httpResponse, bodyresponse, outFile) {
        if (err) {
            console.log('ERROR ' + err);
            done(err);
            return;
        }

        else {
            if (outFile) {
                console.log('response is written in ' + outFile + ' file');
                done();
                return;
            }

            if(httpResponse){
                console.log(httpResponse.statusCode,bodyresponse);
            }
            else{
                console.log(bodyresponse);
            }


            done();
        }
    }
});


