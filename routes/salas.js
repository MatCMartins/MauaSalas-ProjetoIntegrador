var express = require('express');
var router = express.Router();
let banco = require('../conector');
var axios = require('axios');


callback = async (rows, req, res) => {
    if (!req.session.isAuthenticated){
        return res.json(rows);
    }
    else{
        return res.json({
            "unauthorized": "unauthorized"
        });
    }
};

router.get("/blocos/lista", function (req, res, next) {
    banco('select * from blocos;', callback, req, res);
});

router.get('/', function (req, res, next) {
    axios.get("http://localhost:3000/salas/blocos/lista").then((data) => 
    res.render('salas', {
        title: 'Mauá Salas - Salas',
        style: "/stylesheets/stylesSalas.css",
        isAuthenticated: req.session.isAuthenticated,
        // isAdministrator: req.session.isAdministrator,
        username: req.session.account && req.session.account.name,
        funcao: "getBlocos("+JSON.stringify(data.data)+")",
        script: "/javascripts/salasAlunoFront.js"

    }));
});



module.exports = router;