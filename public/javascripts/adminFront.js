async function carregarAdministradores(rows) {
    const lista = document.querySelector(".informacoes");
    for (let i = 0; i < rows.length; i++) {

        const email_div = document.createElement("div");
        email_div.classList.add("col-md-7", "col-5", "text-start", "border-end", "p-0", "pt-1");
        const input_email = document.createElement("input");
        input_email.classList.add("input-email", "w-100");
        input_email.type = "email";
        input_email.value = rows[i].email;
        input_email.placeholder = "Email";
        input_email.readOnly = true;

        email_div.appendChild(input_email);
        lista.appendChild(email_div);

        tipo_div = document.createElement("div");
        tipo_div.classList.add("col-md-3", "col-5", "text-center", "border-end", "tipo-user");
        const tipo_de_usuario = document.createElement("p");
        if (rows[i].tipo_de_user == 1) {
            tipo_de_usuario.innerHTML = "Administrador";
        }
        else if (rows[i].tipo_de_user == 2) {
            tipo_de_usuario.innerHTML = "Coordenador";
        }
        else if (rows[i].tipo_de_user == 3) {
            tipo_de_usuario.innerHTML = "Laboratorista";
        }


        tipo_div.appendChild(tipo_de_usuario);
        lista.appendChild(tipo_div);


        const editar_div = document.createElement("div");
        editar_div.classList.add("col-md-1", "col-1", "text-center", "border-end", "p-0");
        const botao_editar = document.createElement("button");
        botao_editar.classList.add("botao-editar");
        botao_editar.type = "button";
        const icone_editar = document.createElement("i");
        icone_editar.classList.add("fa", "fa-pencil");
        botao_editar.addEventListener("click", function () {
            var modal = new bootstrap.Modal(document.getElementById("modalEditarAdmin"));
            var titulo = document.querySelector("#email_usuario_edit");
            titulo.value = rows[i].email;
            modal.show();
        })


        botao_editar.appendChild(icone_editar);
        editar_div.appendChild(botao_editar);
        lista.appendChild(editar_div);


        const excluir_div = document.createElement("div");
        excluir_div.classList.add("col-md-1", "col-1", "text-center", "p-0");
        const botao_excluir = document.createElement("button");
        botao_excluir.classList.add("botao-excluir");
        botao_excluir.type = "button";
        const icone_excluir = document.createElement("i");
        icone_excluir.classList.add("fa", "fa-trash");
        botao_excluir.addEventListener("click", function () {
            var modal = new bootstrap.Modal(document.getElementById("modalDeletarAdmin"));
            var titulo = document.querySelector("#tituloDeletarAdmin");
            var emailUsuario = document.querySelector("#emailUsuario");
            emailUsuario.innerHTML = rows[i].email;
            var tipoUsuario = document.querySelector("#tipoUsuario");

            if (rows[i].tipo_de_user == 1) {
                tipoUsuario.innerHTML = "Administrador";
            }
            else if (rows[i].tipo_de_user == 2) {
                tipoUsuario.innerHTML = "Coordenador";
            }
            else if (rows[i].tipo_de_user == 3) {
                tipoUsuario.innerHTML = "Laboratorista";
            }


            titulo.innerHTML = rows[i].email;
            modal.show();
        })

        botao_excluir.appendChild(icone_excluir);
        excluir_div.appendChild(botao_excluir);
        lista.appendChild(excluir_div);

    }
}

function cadastrarAdministrador() {
    let condicao = 0;
    let email_usuario = document.querySelector("#email_usuario").value;
    let tipo_usuario = document.querySelector("#tipo_usuario").value;
    if (email_usuario == "" || tipo_usuario == "Selecione o tipo de usuário") {
        showToast("Preencha todos os campos");
    }
    else {
        axios.post("https://mauasalas.lcstuber.net/admin/manterAdmin/lista", {
            email: email_usuario,
            tipo: tipo_usuario
        }, {timeout: 5000}).then(response => {
            if (response.data == "") {
                showToast("Esse usuário já existe! Tente novamente!")
            }
            else {
                showToast("Administrador cadastrado com sucesso")
            }
        })
    }
}

function editarAdministrador() {
    let email_usuario = document.querySelector("#email_usuario_edit").value;
    let tipo_usuario = document.querySelector("#tipo_usuario_edit").value;
    let titulo = document.querySelector("#tituloEditarAdmin").innerHTML;
    if (email_usuario == "" || tipo_usuario == "") {
        showToast("Preencha todos os campos");
    }
    else {
        (axios.put("https://mauasalas.lcstuber.net/admin/manterAdmin/lista", {
            email: email_usuario,
            tipo: tipo_usuario
        }, {timeout: 5000})
            .then(function (response) {
                if (response.data == "") {
                    showToast("Esse usuário já existe! Tente novamente!")
                }
                else {
                    showToast("Administrador editado com sucesso")
                }
            }));
    }
}


function deletarAdministrador() {
    let email_usuario = document.querySelector("#emailUsuario").innerHTML;
    let tipo_usuario = document.querySelector("#tipoUsuario").innerHTML;

    (axios.delete("https://mauasalas.lcstuber.net/admin/manterAdmin/lista", {
        timeout: 5000,
        data: {
            email: email_usuario,
            tipo: tipo_usuario
        }
    }).then(response => {
        showToast("Usuário deletado com sucesso")
    }).catch(error => {
        showToast("Erro ao deletar")
    }));
}

function recarregar() {
    setTimeout(function () {
        location.reload();
    }, 2000)
};

function showToast(mensagem) {
    const toastMensagem = document.getElementById('mensagemToast')
    const bodyToast = document.getElementById('toast-body')
    bodyToast.innerHTML = mensagem
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastMensagem)
    toastBootstrap.show()
    recarregar();
}