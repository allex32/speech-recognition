/**
 Модуль, отвечающий за принятие task-ов из очереди

 */


var kue = require('kue'),
    jobs = kue.createQueue();


var speech_recognition = require('./speech_recognition');

jobs.process('audio', function (job, done) {

    var result = speech_recognition(job.data, getResponse);

    function getResponse(err, httpResponse, xml, outFile) {
        if (err) {
            console.log('ERROR ' + err);
            done(err);
        }

        else {
            if (outFile)
                console.log('response is written in ' + outFile + ' file');
            else
                console.log(httpResponse.statusCode, xml);

            done();
        }
    }
});


