/**
 Модуль, отвечающий за принятие task-ов из очереди

ПРИНИМАЕТ НА ВХОД ПАРАМЕТР - ПУТЬ, ПО КОТОРОМУ НЕОБХОДИМО ПОМЕСТИТЬ РАСПОЗНАННЫЕ ФАЙЛЫ
 */

var fs = require('fs');
var kue = require('kue');
var redisSettings = require('./configs/redis_setting.json');
var q = kue.createQueue(redisSettings.ConnectionSettings);
var jobs=q;

var argvs =[];
process.argv.forEach(function(val,index,array){
    argvs.push(val);
});

var mkdirSync = function (path) {
        try {
            fs.mkdirSync(path);
         } catch(e) {
         if ( e.code != 'EEXIST' ) throw e;
        }
    };

if(argvs.length<3){
    console.log('incorrect arguments');
}
else{
    saveDirPath = argvs[2];

   
    mkdirSync(saveDirPath);

    var speech_recognition = require('./speech_recognition');

    jobs.process('job', function (job, done) {

        var result = speech_recognition(job.data, saveDirPath, getResponse);

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

};


