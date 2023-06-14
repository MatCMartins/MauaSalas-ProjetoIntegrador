const ical = require('ical-generator');

let {
    banco,
    bancoI
} = require('./calendarConector');

function Callback(rows, nome, tipo) {
    try {
        var json = rows[0]["calendario"];
        var retorno = new ical.ICalCalendar(JSON.parse(json));
    }
    catch {
        var retorno = new ical.ICalCalendar({ name: nome, description: tipo, timezone: "America/Sao_Paulo" });
        const startTime = new Date();
        const endTime = new Date();
        endTime.setHours(startTime.getHours() + 1);
        retorno.createEvent({
            start: startTime,
            end: endTime,
            summary: 'Example Event',
            description: 'It works ;)',
            location: 'my room',
            url: 'http://sebbo.net/'
        });
        var json = JSON.stringify(retorno);
        bancoI('INSERT INTO `calendario` VALUES ("' + nome + '","' + tipo + '",\'' + json + '\');');
    }
    console.log(retorno)
};

function createCalendar(nome, tipo) {
    banco('select calendario from calendario where nome="' + nome + '";', Callback, nome, tipo);
};

// const calendar = new ical.ICalCalendar({ name: 'Test' });
// const startTime = new Date();
// const endTime = new Date();
// endTime.setHours(startTime.getHours() + 1);
// calendar.createEvent({
//     start: startTime,
//     end: endTime,
//     summary: 'Example Event',
//     description: 'It works ;)',
//     location: 'my room',
//     url: 'http://sebbo.net/'
// });
// calendar.createEvent({
//     start: startTime,
//     end: endTime,
//     summary: 'Example Event2',
//     description: 'It works ;)2',
//     location: 'my room2',
//     url: 'http://sebbo.net/2'
// });

// const json1 = JSON.stringify(calendar);

// const batata = new ical.ICalCalendar(JSON.parse(json1));

// console.log(batata)

createCalendar("H204", "Sala")

module.exports = createCalendar;


