var express = require('express');
var router = express.Router();
const ical = require('ical-generator');
var createError = require('http-errors');
let mail = require('../mailer');
let {
    banco,
    bancoI
} = require('../calendarConector');

function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/signin'); // redirect to sign-in route
    } else {
        next();
    }
};

function Callback6(rows, req, res) {
    var nome = req.body.GTL;
    var tipo = "GTL";
    if (nome == '') {
        res.sendStatus(200);
    } else {
        try {
            var json6 = rows[0]["calendario"];
            var retorno6 = new ical.ICalCalendar(JSON.parse(json6));
        }
        catch {
            var retorno6 = new ical.ICalCalendar({ name: nome, description: tipo, timezone: "America/Sao_Paulo" });
            var json6 = JSON.stringify(retorno6);
            bancoI('INSERT INTO `calendario` VALUES ("' + nome + '","' + tipo + '",\'' + json6 + '\');');
        }
        const startTime = new Date();
        const endTime = new Date();
        startTime.setFullYear(parseInt(req.body.dia.slice(0,4)), parseInt(req.body.dia.slice(5, 7)) - 1, parseInt(req.body.dia.slice(8, 10)))
        startTime.setHours(parseInt(req.body.horaInicio.slice(0, 2)), parseInt(req.body.horaInicio.slice(3, 5)), 0, 0)
        endTime.setFullYear(parseInt(req.body.dia.slice(0,4)), parseInt(req.body.dia.slice(5, 7)) - 1, parseInt(req.body.dia.slice(8, 10)))
        endTime.setHours(parseInt(req.body.horaFim.slice(0, 2)), parseInt(req.body.horaFim.slice(3, 5)), 0, 0)
        if (req.body.freq == "unique") {
            retorno6.createEvent({
                start: startTime,
                end: endTime,
                summary: req.body.tipo,
                timezone: "America/Sao_Paulo",
                // description: {html: "<p>{Criador: req.session.account.name', Professor: req.body.professor, Sala: req.body.nome, Curso: req.body.curso, Matéria: req.body.materia, GTL: req.body.GTL}</p>"},
                location: req.body.nome
            })
        } else {
            var finalDate = new Date();
            finalDate.setFullYear(parseInt(req.body.diaFimRec.slice(0,4)), parseInt(req.body.diaFimRec.slice(5, 7)) - 1, parseInt(req.body.diaFimRec.slice(8, 10)));
            retorno6.createEvent({
                start: startTime,
                end: endTime,
                summary: req.body.tipo,
                repeating: { freq: req.body.freq, until: finalDate },
                timezone: "America/Sao_Paulo",
                // description: {html: "<p>{Criador: req.session.account.name', Professor: req.body.professor, Sala: req.body.nome, Curso: req.body.curso, Matéria: req.body.materia, GTL: req.body.GTL}</p>"},
                location: req.body.nome
            })
        }
        var json7 = JSON.stringify(retorno6);
        bancoI('UPDATE `calendario` set calendario = \'' + json7 + '\' where nome = \'' + nome + '\' and tipo = \'' + tipo + '\';');
        res.sendStatus(200);
    }
}

function Callback5(rows, req, res) {
    var nome = req.body.materia;
    var tipo = "Matéria";
    if (nome == '') {
        banco('select calendario from calendario where nome="' + req.body.GTL + '";', Callback6, req, res)
    } else {
        try {
            var json5 = rows[0]["calendario"];
            var retorno5 = new ical.ICalCalendar(JSON.parse(json5));
        }
        catch {
            var retorno5 = new ical.ICalCalendar({ name: nome, description: tipo, timezone: "America/Sao_Paulo" });
            var json5 = JSON.stringify(retorno5);
            bancoI('INSERT INTO `calendario` VALUES ("' + nome + '","' + tipo + '",\'' + json5 + '\');');
        }
        const startTime = new Date();
        const endTime = new Date();
        startTime.setFullYear(parseInt(req.body.dia.slice(0,4)), parseInt(req.body.dia.slice(5, 7)) - 1, parseInt(req.body.dia.slice(8, 10)))
        startTime.setHours(parseInt(req.body.horaInicio.slice(0, 2)), parseInt(req.body.horaInicio.slice(3, 5)), 0, 0)
        endTime.setFullYear(parseInt(req.body.dia.slice(0,4)), parseInt(req.body.dia.slice(5, 7)) - 1, parseInt(req.body.dia.slice(8, 10)))
        endTime.setHours(parseInt(req.body.horaFim.slice(0, 2)), parseInt(req.body.horaFim.slice(3, 5)), 0, 0)
        if (req.body.freq == "unique") {
            retorno5.createEvent({
                start: startTime,
                end: endTime,
                summary: req.body.tipo,
                timezone: "America/Sao_Paulo",
                // description: {html: "<p>{Criador: 'req.session.account.name', Professor: req.body.professor, Sala: req.body.nome, Curso: req.body.curso, Matéria: req.body.materia, GTL: req.body.GTL}</p>"},
                location: req.body.nome
            })
        } else {
            var finalDate = new Date();
            finalDate.setFullYear(parseInt(req.body.diaFimRec.slice(0,4)), parseInt(req.body.diaFimRec.slice(5, 7)) - 1, parseInt(req.body.diaFimRec.slice(8, 10)));
            retorno5.createEvent({
                start: startTime,
                end: endTime,
                summary: req.body.tipo,
                repeating: { freq: req.body.freq, until: finalDate },
                timezone: "America/Sao_Paulo",
                // description: {html: "<p>{Criador: 'req.session.account.name', Professor: req.body.professor, Sala: req.body.nome, Curso: req.body.curso, Matéria: req.body.materia, GTL: req.body.GTL}</p>"},
                location: req.body.nome
            })
        }
        var json6 = JSON.stringify(retorno5);
        bancoI('UPDATE `calendario` set calendario = \'' + json6 + '\' where nome = \'' + nome + '\' and tipo = \'' + tipo + '\';');
        banco('select calendario from calendario where nome="' + req.body.GTL + '";', Callback6, req, res)
    }
}

function Callback4(rows, req, res) {
    var nome = req.body.curso;
    var tipo = "Curso";
    if (nome == '---') {
        banco('select calendario from calendario where nome="' + req.body.materia + '";', Callback5, req, res)
    } else {
        try {
            var json4 = rows[0]["calendario"];
            var retorno4 = new ical.ICalCalendar(JSON.parse(json4));
        }
        catch {
            var retorno4 = new ical.ICalCalendar({ name: nome, description: tipo, timezone: "America/Sao_Paulo" });
            var json4 = JSON.stringify(retorno4);
            bancoI('INSERT INTO `calendario` VALUES ("' + nome + '","' + tipo + '",\'' + json4 + '\');');
        }
        const startTime = new Date();
        const endTime = new Date();
        startTime.setFullYear(parseInt(req.body.dia.slice(0,4)), parseInt(req.body.dia.slice(5, 7)) - 1, parseInt(req.body.dia.slice(8, 10)))
        startTime.setHours(parseInt(req.body.horaInicio.slice(0, 2)), parseInt(req.body.horaInicio.slice(3, 5)), 0, 0)
        endTime.setFullYear(parseInt(req.body.dia.slice(0,4)), parseInt(req.body.dia.slice(5, 7)) - 1, parseInt(req.body.dia.slice(8, 10)))
        endTime.setHours(parseInt(req.body.horaFim.slice(0, 2)), parseInt(req.body.horaFim.slice(3, 5)), 0, 0)
        if (req.body.freq == "unique") {
            retorno4.createEvent({
                start: startTime,
                end: endTime,
                summary: req.body.tipo,
                timezone: "America/Sao_Paulo",
                // description: {html: "<p>{Criador: 'req.session.account.name', Professor: req.body.professor, Sala: req.body.nome, Curso: req.body.curso, Matéria: req.body.materia, GTL: req.body.GTL}</p>"},
                location: req.body.nome
            })
        } else {
            var finalDate = new Date();
            finalDate.setFullYear(parseInt(req.body.diaFimRec.slice(0,4)), parseInt(req.body.diaFimRec.slice(5, 7)) - 1, parseInt(req.body.diaFimRec.slice(8, 10)));
            retorno4.createEvent({
                start: startTime,
                end: endTime,
                summary: req.body.tipo,
                repeating: { freq: req.body.freq, until: finalDate },
                timezone: "America/Sao_Paulo",
                // description: {html: "<p>{Criador: 'req.session.account.name', Professor: req.body.professor, Sala: req.body.nome, Curso: req.body.curso, Matéria: req.body.materia, GTL: req.body.GTL}</p>"},
                location: req.body.nome
            })
        }
        var json5 = JSON.stringify(retorno4);
        bancoI('UPDATE `calendario` set calendario = \'' + json5 + '\' where nome = \'' + nome + '\' and tipo = \'' + tipo + '\';');
        banco('select calendario from calendario where nome="' + req.body.materia + '";', Callback5, req, res)
    }
}

function Callback3(rows, req, res) {
    var nome = req.body.professor;
    var tipo = "Professor";
    if (nome == '') {
        banco('select calendario from calendario where nome="' + req.body.curso + '";', Callback4, req, res)
    } else {
        try {
            var json3 = rows[0]["calendario"];
            var retorno3 = new ical.ICalCalendar(JSON.parse(json3));
        }
        catch {
            var retorno3 = new ical.ICalCalendar({ name: nome, description: tipo, timezone: "America/Sao_Paulo" });
            var json3 = JSON.stringify(retorno3);
            bancoI('INSERT INTO `calendario` VALUES ("' + nome + '","' + tipo + '",\'' + json3 + '\');');
        }
        const startTime = new Date();
        const endTime = new Date();
        startTime.setFullYear(parseInt(req.body.dia.slice(0,4)), parseInt(req.body.dia.slice(5, 7)) - 1, parseInt(req.body.dia.slice(8, 10)))
        startTime.setHours(parseInt(req.body.horaInicio.slice(0, 2)), parseInt(req.body.horaInicio.slice(3, 5)), 0, 0)
        endTime.setFullYear(parseInt(req.body.dia.slice(0,4)), parseInt(req.body.dia.slice(5, 7)) - 1, parseInt(req.body.dia.slice(8, 10)))
        endTime.setHours(parseInt(req.body.horaFim.slice(0, 2)), parseInt(req.body.horaFim.slice(3, 5)), 0, 0)
        if (req.body.freq == "unique") {
            retorno3.createEvent({
                start: startTime,
                end: endTime,
                summary: req.body.tipo,
                timezone: "America/Sao_Paulo",
                // description: {html: "<p>{Criador: 'req.session.account.name', Professor: req.body.professor, Sala: req.body.nome, Curso: req.body.curso, Matéria: req.body.materia, GTL: req.body.GTL}</p>"},
                location: req.body.nome
            })
        } else {
            var finalDate = new Date();
            finalDate.setFullYear(parseInt(req.body.diaFimRec.slice(0,4)), parseInt(req.body.diaFimRec.slice(5, 7)) - 1, parseInt(req.body.diaFimRec.slice(8, 10)));
            retorno3.createEvent({
                start: startTime,
                end: endTime,
                summary: req.body.tipo,
                repeating: { freq: req.body.freq, until: finalDate },
                timezone: "America/Sao_Paulo",
                // description: {html: "<p>{Criador: 'req.session.account.name', Professor: req.body.professor, Sala: req.body.nome, Curso: req.body.curso, Matéria: req.body.materia, GTL: req.body.GTL}</p>"},
                location: req.body.nome
            })
        }
        var json4 = JSON.stringify(retorno3);
        bancoI('UPDATE `calendario` set calendario = \'' + json4 + '\' where nome = \'' + nome + '\' and tipo = \'' + tipo + '\';');
        banco('select calendario from calendario where nome="' + req.body.curso + '";', Callback4, req, res)
    }
}

function Callback2(rows, req, res) {
    var nome = req.session.account.name;
    var tipo = "Criador";
    try {
        var json2 = rows[0]["calendario"];
        var retorno2 = new ical.ICalCalendar(JSON.parse(json2));
    }
    catch {
        var retorno2 = new ical.ICalCalendar({ name: nome, description: tipo, timezone: "America/Sao_Paulo" });
        var json2 = JSON.stringify(retorno2);
        bancoI('INSERT INTO `calendario` VALUES ("' + nome + '","' + tipo + '",\'' + json2 + '\');');
    }
    const startTime = new Date();
    const endTime = new Date();
    startTime.setFullYear(parseInt(req.body.dia.slice(0,4)), parseInt(req.body.dia.slice(5, 7)) - 1, parseInt(req.body.dia.slice(8, 10)))
        startTime.setHours(parseInt(req.body.horaInicio.slice(0, 2)), parseInt(req.body.horaInicio.slice(3, 5)), 0, 0)
        endTime.setFullYear(parseInt(req.body.dia.slice(0,4)), parseInt(req.body.dia.slice(5, 7)) - 1, parseInt(req.body.dia.slice(8, 10)))
        endTime.setHours(parseInt(req.body.horaFim.slice(0, 2)), parseInt(req.body.horaFim.slice(3, 5)), 0, 0)
    if (req.body.freq == "unique") {
        retorno2.createEvent({
            start: startTime,
            end: endTime,
            summary: req.body.tipo,
            timezone: "America/Sao_Paulo",
            // description: {html: "<p>{Criador: 'req.session.account.name', Professor: req.body.professor, Sala: req.body.nome, Curso: req.body.curso, Matéria: req.body.materia, GTL: req.body.GTL}</p>"},
            location: req.body.nome
        })
    } else {
        var finalDate = new Date();
        finalDate.setFullYear(parseInt(req.body.diaFimRec.slice(0,4)), parseInt(req.body.diaFimRec.slice(5, 7)) - 1, parseInt(req.body.diaFimRec.slice(8, 10)));
        retorno2.createEvent({
            start: startTime,
            end: endTime,
            summary: req.body.tipo,
            repeating: { freq: req.body.freq, until: finalDate },
            timezone: "America/Sao_Paulo",
            // description: {html: "<p>{Criador: 'req.session.account.name', Professor: req.body.professor, Sala: req.body.nome, Curso: req.body.curso, Matéria: req.body.materia, GTL: req.body.GTL}</p>"},
            location: req.body.nome
        })
    }
    var json3 = JSON.stringify(retorno2);
    bancoI('UPDATE `calendario` set calendario = \'' + json3 + '\' where nome = \'' + nome + '\' and tipo = \'' + tipo + '\';');
    banco('select calendario from calendario where nome="' + req.body.professor + '";', Callback3, req, res)
}

function Callback(rows, req, res) {
    var nome = req.body.nome;
    var tipo = "Sala";
    try {
        var json = rows[0]["calendario"];
        var retorno = new ical.ICalCalendar(JSON.parse(json));
    }
    catch {
        var retorno = new ical.ICalCalendar({ name: nome, description: tipo, timezone: "America/Sao_Paulo" });
        var json = JSON.stringify(retorno);
        bancoI('INSERT INTO `calendario` VALUES ("' + nome + '","' + tipo + '",\'' + json + '\');');
    }
    if (req.body.horaFim == undefined) {
        return res.json(retorno.events())
    } else {
        const startTime = new Date();
        const endTime = new Date();
        startTime.setFullYear(parseInt(req.body.dia.slice(0,4)), parseInt(req.body.dia.slice(5, 7)) - 1, parseInt(req.body.dia.slice(8, 10)))
        startTime.setHours(parseInt(req.body.horaInicio.slice(0, 2)), parseInt(req.body.horaInicio.slice(3, 5)), 0, 0)
        endTime.setFullYear(parseInt(req.body.dia.slice(0,4)), parseInt(req.body.dia.slice(5, 7)) - 1, parseInt(req.body.dia.slice(8, 10)))
        endTime.setHours(parseInt(req.body.horaFim.slice(0, 2)), parseInt(req.body.horaFim.slice(3, 5)), 0, 0)
        if (req.body.freq == "unique") {
            retorno.createEvent({
                start: startTime,
                end: endTime,
                summary: req.body.tipo,
                timezone: "America/Sao_Paulo",
                // description: {html: "<p>{Criador: 'req.session.account.name', Professor: req.body.professor, Sala: req.body.nome, Curso: req.body.curso, Matéria: req.body.materia, GTL: req.body.GTL}</p>"},
                location: req.body.nome
            })
        } else {
            var finalDate = new Date();
            finalDate.setFullYear(parseInt(req.body.diaFimRec.slice(0,4)), parseInt(req.body.diaFimRec.slice(5, 7)) - 1, parseInt(req.body.diaFimRec.slice(8, 10)));
            retorno.createEvent({
                start: startTime,
                end: endTime,
                summary: req.body.tipo,
                repeating: { freq: req.body.freq, until: finalDate },
                timezone: "America/Sao_Paulo",
                // description: {html: "<p>{Criador: 'req.session.account.name', Professor: req.body.professor, Sala: req.body.nome, Curso: req.body.curso, Matéria: req.body.materia, GTL: req.body.GTL}</p>"},
                organizer: {
                    name: req.session.account.name,
                    email: req.session.account.username
                },
                location: req.body.nome
            })
        }
        var json2 = JSON.stringify(retorno);
        bancoI('UPDATE `calendario` set calendario = \'' + json2 + '\' where nome = \'' + nome + '\' and tipo = \'' + tipo + '\';');
        mail(req.session.account.username, "Reservas Mauá Salas", `A sala ${nome} foi reservada para o dia ${req.body.dia}${(req.body.freq == "MONTHLY") ? " se repetindo mensalmente até " + req.body.diaFimRec : (req.body.tipo == "WEEKLY") ? " se repetindo semanalmente até " + req.body.diaFimRec : ""} no horário das ${req.body.horaInicio} às ${req.body.horaFim} através do sistema do Mauá Salas por: <a href=mailto:${req.session.account.username}>${req.session.account.name}</a>`).catch(console.error);
        banco('select calendario from calendario where nome="' + req.session.account.name + '";', Callback2, req, res)
    }
};

router.post("/calendario/lista",
    isAuthenticated,
    async function (req, res, next) {
        if (req.body.nome == undefined) {
            next(createError(400));
        } else {
            banco('select calendario from calendario where nome="' + req.body.nome + '";', Callback, req, res);
        }
    });

router.get('/',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        res.render('reserva', { title: 'Mauá Salas',
        style: "/stylesheets/stylesHomePage.css",
        isAuthenticated: req.session.isAuthenticated,
        username: req.session.account && req.session.account.name,
        script: "/javascripts/reservaFront.js" });
    }
);

module.exports = router;