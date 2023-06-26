require('dotenv').config();

const msal = require("@azure/msal-node");
const axios = require('axios');

var {
    msalConfig,
    REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI,
    GRAPH_ME_ENDPOINT
} = require('./authConfig');

const pca = new msal.PublicClientApplication(msalConfig);

const usernamePasswordRequest = {
    scopes: ["Mail.Send","Calendars.ReadWrite"],
    username: process.env.EMAIL_ACCOUNT,
    password: process.env.EMAIL_PASSWORD
}

async function sendMail(destinatário, assunto, mensagem) {
    pca.acquireTokenByUsernamePassword(usernamePasswordRequest).then(async (response) => {
        const options = {
            headers: {
                Authorization: `Bearer ${response.accessToken}`,
                ContentType: "application/json"
            }
        };
        
        console.log('Email referente à '+ assunto +'  enviado: ' + new Date().toString() + " para o seguinte destinatário: " + destinatário);
        
        await axios.post(GRAPH_ME_ENDPOINT+"/sendMail", {
            message: {
                subject: assunto,
                body: {
                  contentType: 'HTML',
                  content: `
                  <!doctype html>
                  <html lang="pt-br">
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Mauá Salas</title>
                      <link rel="stylesheet" href="${POST_LOGOUT_REDIRECT_URI}stylesheets/bootstrap.min.css">
                      <link rel="stylesheet" href="${POST_LOGOUT_REDIRECT_URI}stylesheets/stylesNavbar.css">
                  </head>
                  <body class="d-flex flex-column vh-100 min-vh-100">
                      <header>
                          <nav class="navbar navbar-expand-lg">
                              <div class="container-fluid">
                                  <a href="${POST_LOGOUT_REDIRECT_URI}" class="navbar-brand m-lg-auto">
                                      <img src="${POST_LOGOUT_REDIRECT_URI}images/logo.svg" alt="Logo Maua Salas" id="logo" width="80px">
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
                  </html>`
                },
                toRecipients: [
                  {
                    emailAddress: {
                      address: destinatário
                    }
                  }
                ]
              },
              saveToSentItems: 'true'
          }, options);
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = sendMail;