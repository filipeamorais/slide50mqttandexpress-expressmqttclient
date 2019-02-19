const express = require('express'),
           mqtt = require('mqtt');
           app = express();

app.listen(3000, function () {
      console.log("App listening on port 3000")
})

app.get('/stream', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    res.write('\n')
    var timer = setInterval(()=> {
        res.write('#');
    }, 1000);

    var client  = mqtt.connect('mqtt://127.0.0.1')
    client.on('connect', ()=> {
        client.subscribe('/home/temperature', function() {
        });
    });

    client.on('message', (topic, msg)=> {
        res.write(msg);
    });

    req.on("close", ()=> {
        clearTimeout(timer);
        client.end();
    });
});