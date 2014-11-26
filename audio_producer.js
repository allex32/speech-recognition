/**
 Поставщик task-ов для очереди
 */

var kue = require('kue');
var redisSettings = require('./configs/redis_setting.json')

var q = kue.createQueue(redisSettings.ConnectionSettings);

var util= require('util'),
    jf = require('jsonfile'),
    jobs = q;



 var jobFile='./configs/jobs.json';

//получение job-ов из jobs.json
 jf.readFile(jobFile,function(err,obj) {
    if (err)
        throw new Error(err);
    else {
        for(var job_key in obj) {
            if(job_key=='audio') {
                for(var keys in obj[job_key])
                var audio_job = jobs.create(job_key,obj[job_key][keys]).save(function (err) {
                    if (err)
                        throw new Error(err);
                    else {
                        console.log('Job ' + audio_job.id + ' is created');
                    }
                })
            }
        }
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