require('dotenv').config();

const nodemailer = require("nodemailer");

async function mail(destinatário, assunto, mensagem) {

    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SMTP,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Mauá Salas" <' + process.env.EMAIL_ACCOUNT + '>',
        to: destinatário,
        subject: assunto,
        text: "O Sistema do Mauá Salas informa: " + mensagem,
        html: `
        <!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mauá Salas</title>
            <link rel="stylesheet" href="${process.env.POST_LOGOUT_REDIRECT_URI}stylesheets/bootstrap.min.css">
            <link rel="stylesheet" href="${process.env.POST_LOGOUT_REDIRECT_URI}stylesheets/stylesNavbar.css">
        </head>
        <body class="d-flex flex-column vh-100 min-vh-100">
            <header>
                <nav class="navbar navbar-expand-lg">
                    <div class="container-fluid">
                        <a href="${process.env.POST_LOGOUT_REDIRECT_URI}" class="navbar-brand m-lg-auto">
                            <img src="${process.env.POST_LOGOUT_REDIRECT_URI}images/logo.svg" alt="Logo Maua Salas" id="logo" width="80px">
                        </a>
                    </div>
                </nav>
            </header>
            <br>
            <h1>O Sistema do Mauá Salas informa:</h1>
            <article>
            ${mensagem}
            </article>
            </body>
        </html>`,
    });
}

module.exports = mail;