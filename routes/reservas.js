require('dotenv').config();

var express = require('express');
var router = express.Router();
var createError = require('http-errors');
let {
    mail,
    listCalendars,
    createCalendar,
    deleteCalendar,
    listCalendarGroups,
    createCalendarGroup,
    deleteCalendarGroup
} = require('../mailer&calendar');

function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect(`/auth/signin?url=${req.baseUrl+req.url}`); // redirect to sign-in route
    } else {
        next();
    }
};

router.get("/calendario/lista",
    isAuthenticated,
    async function (req, res, next) {
        listCalendars(res)
    }
);

router.post("/calendario/lista",
    isAuthenticated,
    async function (req, res, next) {
        if (req.body.nome == undefined || req.body.GroupID == undefined) {
            next(createError(400));
        } else {
            createCalendar(req.body.nome, req.body.GroupID, res);
        }
    }
);

router.delete("/calendario/lista",
    isAuthenticated,
    async function (req, res, next) {
        if (req.body.CalendarID == undefined || req.body.CalendarID == undefined) {
            next(createError(400));
        } else {
            deleteCalendar(req.body.CalendarID, req.body.GroupID, res);
        }
    }
);

router.get("/grupocalendario/lista",
    isAuthenticated,
    async function (req, res, next) {
        listCalendarGroups(res)
    }
);

router.post("/grupocalendario/lista",
    isAuthenticated,
    async function (req, res, next) {
        if (req.body.nome == undefined) {
            next(createError(400));
        } else {
            createCalendarGroup(req.body.nome, res);
        }
    }
);

router.delete("/grupocalendario/lista",
    isAuthenticated,
    async function (req, res, next) {
        if (req.body.CalendarID == undefined) {
            next(createError(400));
        } else {
            deleteCalendarGroup(req.body.GroupID, res);
        }
    }
);

router.get('/',
    isAuthenticated,
    async function (req, res, next) {
        next(createError(503));
        // res.render('reserva', {
        //     url: process.env.POST_LOGOUT_REDIRECT_URI,
        //     adoptID: process.env.ADOPT_WEBSITE_ID,
        //     title: 'Mauá Salas',
        //     style: "/stylesheets/stylesReserva.css",
        //     isAuthenticated: req.session.isAuthenticated,
        //     username: req.session.account && req.session.account.name,
        //     script: "/javascripts/reservaFront.js"
        // });
    }
);

module.exports = router;