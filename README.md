speech-recognition
==================
Для работы необходимо наличие установленного NodeJs-сервера и  установленного и запущенного redis.

NodeJs - http://nodejs.org/

Redis - http://redis.io/

Запускаем отдельными процессами:

*node audio_producer.js*

*node audio_consumer.js*

####audio_producer.js

Отправляет указанные в jobs.json задания в очередь.
Так же в нем хранятся обработчики событий очереди
*(job complete и job failed)*.





####audio_consumer.js
Работает как отдельный процесс, извлекает из очереди job-ы с ключем 'audio', 
обращается к *speech_recognition.js* для их обработки, и, в зависимости от ответа, 
отмечает job-ы либо как выполненные, либо проваленные.

####speech_recognition.js
Получает job-ы, и, в зависимости от параметров, в них указанных, 
обращается либо к yandex, либо к google - speech-api, либо к модулю-"заглушке".


####Тестовые job-ы
Описаны в configs/jobs.json.
В качестве тестовых данных вписаны 4 job-a, для тестирования каждого из speech-api-модулей, модуля-"заглушки", и случая, если ни один из модулей не подойдет.

Пример job-a.

```
var audio_job = jobs.create('audio', {
     title: 'speech_recognition',
     file: './resources/yandex.mp3',
     lang: 'ru-Ru',
     filetype: 'mp3',
     service: 'yandex'
}
```


