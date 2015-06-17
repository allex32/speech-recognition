/**
 Поставщик task-ов для очереди
 */

 //ПРИНИМАЕТ НА ВХОД ПАРАМЕТР  - job.json

var kue = require('kue');
var redisSettings = require('./configs/redis_setting.json')

var q = kue.createQueue(redisSettings.ConnectionSettings);

var util= require('util'),
    jf = require('jsonfile'),
    jobs = q;

var argvs =[];
process.argv.forEach(function(val,index,array){
    argvs.push(val);
});

if(argvs.length<3){
    console.log('incorrect arguments');
}
else{


     var jobFile=argvs[2];


    jf.readFile(jobFile,function(err,obj){
        if(err)
            throw new Error(err);
        else{
            obj.forEach(function(el){
                for(var key in el){
                    var audio_job = jobs.create(key,el[key]).save(function(err){
                        if(err)
                            throw new Error(err);
                        else{
                            console.log('Job '+audio_job.id+' is created');
                        }
                    })
                }
            });
        }
    });


    //event_handlers
    //обработчики событий очереди

    jobs.on('job complete', function (id, result) {
        kue.Job.get(id, function (err, job) {
            if (err)
                return;

            console.log('Job ' + job.id + ' completed');
        });
    });

    jobs.on('job failed', function (id, result) {
        kue.Job.get(id, function (err, job) {
            if (err)
                return;
            console.log('Job ' + job.id + ' failed')
        })
    });


    kue.app.listen(2014);
}