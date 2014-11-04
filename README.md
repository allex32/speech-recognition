speech-recognition
==================
Для работы необходимо наличие установленного NodeJs-сервера и  установленного и запущенного redis.

NodeJs - http://nodejs.org/

Redis - http://redis.io/

Запускаем отдельными процессами:

*node audio_producer.js*


*node audio_consumer.js*

####audio_producer.js

Отправляет указанный в нем же job в очередь. 
Так же в нем хранятся обработчики событий очереди
*(job complete и job failed)*.

Job в качестве примера один, объявлен непосредственно в *audio_producer.js* и имеет следующий вид:

```
var audio_job = jobs.create('audio', {
     title: 'speech_recognition',
     file: './resources/yandex.mp3',
     lang: 'ru-Ru',
     filetype: 'mp3',
     service: 'yandex'
}
```


####audio_consumer.js
Работает как отдельный процесс, извлекает из очереди job-ы с ключем 'audio', 
обращается к *speech_recognition.js* для их обработки, и, в зависимости от ответа, 
отмечает job-ы либо как выполненные, либо проваленные.

####speech_recognition.js
Получает job-ы, и, в зависимости от параметров, в них указанных, 
обращается либо к yandex либо google(пока не дописан) speech-api.





В случае успешного выполнения job-а заглушки, будет создан файл
./resources/yandex.xml, в котором хранится результат обработки медиафайла сервисом распознавания yandex.



