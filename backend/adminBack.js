var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());


const port = 3002;

const listaUsuarios = [
    {   
        email: "a@a.com",
        tipo: "Administrador",
    },
    {   
        email: "a@a.com",
        tipo: "Administrador",
    },
    {   
        email: "a@a.com",
        tipo: "Administrador",
    },
    {   
        email: "a@a.com",
        tipo: "Administrador",
    },
    {   
        email: "a@a.com",
        tipo: "Administrador",
    },
    {   
        email: "a@a.com",
        tipo: "Administrador",
    },
    {   
        email: "a@a.com",
        tipo: "Administrador",
    },
    {   
        email: "a@a.com",
        tipo: "Administrador",
    },
    {   
        email: "a@a.com",
        tipo: "Administrador",
    },
];

app.get('/admin', (req, res) => {
    res.send(listaUsuarios);
});

app.post('/admin', (req, res) => {
    usuario = {
        nome: req.body.nome,
        email: req.body.email,
        tipo: req.body.tipo,
    };
    listaUsuarios.push(usuario);
    res.send(listaUsuarios);
});
app.put('/admin', (req, res) => {
    index = req.body.index;
    if (req.body.nome != null) {
        listaUsuarios[index].nome = req.body.nome;
    }
    if (req.body.email != null) {
        listaUsuarios[index].email = req.body.email;
    }
    if (req.body.tipo != null) {
        listaUsuarios[index].tipo = req.body.tipo;
    }
    res.send(listaUsuarios[index]);
});
app.delete("/admin", (req, res) => {
    index = req.body.index;
    listaUsuarios.splice(index, 1);
    res.send(listaUsuarios);
});

app.listen(port, () => {
    console.log("Servidor rodando na porta 3002");
}
);