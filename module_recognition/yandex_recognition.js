/**
 * Created by root on 14.11.14.
 */

var yandex_speech = require('yandex-speech');
var new_opts = require('../configs/opts_transform');
var keys = require('../configs/keys');


var fs = require('fs');

var yandex_opt_config = function (data, callback) {

    var result = {};
    for (var key in new_opts.yandex) {
        result[new_opts.yandex[key]] = data[key];
    }
    result.developer_key = keys.yandex;
    callback(null, result);
};

var yandex_recognition_response = function(data,saveDirPath,callback){


        var self_callback = callback;

        //приводим опции к виду, "скармливаемому" yandex-api

        //здесь некорректная обработка ошибок в случае
        //неверного срабатывания функции yandex_opt_conf
        //доделать
        yandex_opt_config(data, newYandexData);

        function newYandexData(err, newYandexOpts) {

            if (err) {
                return self_callback(err);
            }

            //используем функцию из модуля, которая непосредственно отправляет запрос
            //к серверам yandex-а

            yandex_speech.ASR(newYandexOpts, yandex_response);

            //и обрабатываем результат срабатывания модуля.
            function yandex_response(err, httpResponse, xml) {
                //отлов внутренних ошибок модуля

                if (err) {
                    return self_callback(err);
                }

                //если пришел ответ, но не успешный, то отправляем код и тело ответа
                if (httpResponse.statusCode != 200) {
                    var response = httpResponse.statusCode + ' ' + httpResponse.body;
                    return self_callback(response);

                }

                //иначе, в данном случае, как пример, записываем ответ в файл
                else {
                    var tmp = data.file.toString().lastIndexOf('.');
                    var tmp_slash = data.file.toString().lastIndexOf('/');
                    var outFile = saveDirPath+ data.file.substring(tmp_slash, tmp) + '.xml';

                    fs.writeFile(outFile, xml, function (err) {
                        if (err) {
                            return self_callback(err);

                        }

                        self_callback(null, httpResponse, xml, outFile);

                    });
                }
            }
        };




};


module.exports = yandex_recognition_response;