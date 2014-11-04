/**
 Получает от audio_consumer job.data и, в соответствии с тем,
 что хранит в себе job, направляет запрос к одному из модулей распознавания
 */

var yandex_speech = require('yandex-speech');
var google_speech = require('google-speech-api');
var new_opts = require('./configs/opts_transform');
var keys = require('./configs/keys');

var fs = require('fs');


//функция, которая должна сформировать корректный набор значений названий параметров,
//для использование через yandex-api

//конфигурирует параметры для yandex-сервера(функции подобного рода можно вынести в отдельный модул)
var yandex_opt_config = function (data, callback) {

    var result = {};
    for (var key in new_opts.yandex) {
        result[new_opts.yandex[key]] = data[key];
    }
    result.developer_key = keys.yandex;
    callback(null, result);
};


var speech_recognition_response = function (data, callback) {

    var self_callback = callback;

    if (data.service == 'yandex') {
        //приводим опции к виду, "скармливаемому" yandex-api
        yandex_opt_config(data, returnData);

        function returnData(err, result) {
            if (err)
                self_callback(err);

            //используем функцию из модуля, которая непосредственно отправляет запрос
            //к серверам yandex-а

            yandex_speech.ASR(result, yandex_response);

            function yandex_response(err, httpResponse, xml) {
                //отлов внутренних ошибок модуля

                if (err)
                    self_callback(err);

                //если пришел ответ, но не успешный, то отправляем код и тело ответа

                if (httpResponse.statusCode != 200) {
                    var response = httpResponse.statusCode + ' ' + httpResponse.body;
                    self_callback(response);
                }

                //иначе, в данном случае, как пример, записываем ответ в файл
                else {
                    var tmp = data.file.toString().lastIndexOf('.');
                    var outFile = data.file.substring(0, tmp) + '.xml';

                    fs.writeFile(outFile, xml, function (err) {
                        if (err)
                            self_callback(err);

                        self_callback(null, httpResponse, xml, outFile);

                    });
                }
            }
        }

    }

    //аналогично для гугла, еще не дописано
    if (data.service == 'google') {

        callback(null, name_serivce);

    }


    //если ни один из параметров не подходит
    self_callback('Incorrect task');

};

module.exports = speech_recognition_response;