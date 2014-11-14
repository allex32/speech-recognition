/**
 * Created by root on 14.11.14.
 */

var google_speech = require('google-speech-api');
var new_opts = require('../configs/opts_transform');
var keys = require('../configs/keys');

var fs = require('fs');


var google_opt_config = function(data,callback){
    var result = {};
    for(var key in new_opts.google){
        result[new_opts.google[key]] = data[key];
    }

    result.key=keys.google;
    callback(null,result)

};


var google_recognition_response = function(data,callback){

    var self_callback=callback;

    google_opt_config(data, newGoogleData);

    function newGoogleData(err, newOpts) {
        
        if (err) {
            return self_callback(err);

        }

         google_speech(newOpts,google_response);

        function google_response(err,result){

            if(err){
                console.log(JSON.stringify(newOpts.key));
                return self_callback(err);

            }

            else{
                var tmp = data.file.toString().lastIndexOf('.');
                var outFile = data.file.substring(0, tmp) + '.json';

                fs.writeFile(outFile, JSON.stringify(result), function (err) {
                    if (err) {
                        return self_callback(err);
                    }

                    return self_callback(null, null, result, outFile);

                });
            }

        }

    }


};

module.exports = google_recognition_response;