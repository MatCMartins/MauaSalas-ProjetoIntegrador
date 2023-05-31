const ical = require('ical-generator');
const http = require('http');

const calendar = new ical.ICalCalendar({ name: 'my first iCal' });
const startTime = new Date();
const endTime = new Date();
endTime.setHours(startTime.getHours() + 1);
calendar.createEvent({
    start: startTime,
    end: endTime,
    summary: 'Example Event',
    description: 'It works ;)',
    location: 'my room',
    url: 'http://sebbo.net/'
});

console.log(calendar.events())