/**
 Поставщик task-ов для очереди
 */

var kue= require('kue'),
    jobs=kue.createQueue();
//на данный момент используется как заглушка
//сами task-и могут браться из различных источников
var audio_job = jobs.create('audio',{
    title: 'speech_recognition',
    file: './resources/yandex.mp3',
    lang: 'ru-Ru',
    filetype:'mp3',

    //переменная service на данный момент используется как заглушка
    //для определения сервиса к которому будет обращаться процесс
    service: 'yandex'
}).priority('high').save(function(err){
    if(err)
        throw  new Error(err);
    else
        console.log('Job ' + audio_job.id + ' is created');
});




//event_handlers
//обработчики событий очереди

jobs.on('job complete',function(id,result){
    kue.Job.get(id,function(err,job){
        if(err) return;
        console.log('Job ' + job.id + ' completed');
        /*
        job.remove(function(err){
            if(err) throw err;
            console.log('removed completed job #%d', job.id);
        })
        */
    });
});

jobs.on('job failed',function(id,result){
    kue.Job.get(id,function(err,job){
        if(err) return;
        console.log('Job ' + job.id + ' failed')
    })
})



kue.app.listen(2014);