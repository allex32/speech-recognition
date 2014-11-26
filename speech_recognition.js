/**
 Получает от audio_consumer job.data и, в соответствии с тем,
 что хранит в себе job, направляет запрос к одному из модулей распознавания
 */
var type_of_module_config=require('./configs/modules_recognition_config.json');


var speech_recognition_response = function(data, callback) {

    //получаем путь к необходимому модулю по названию сервиса
    var pathToServiceModule = type_of_module_config[data.service];
    if(!pathToServiceModule){
        callback('Incorrect service or job');
        return;
    }

    //подключаем и используем модуль.
    var response = require(pathToServiceModule)(data,callback);




};

module.exports = speech_recognition_response;