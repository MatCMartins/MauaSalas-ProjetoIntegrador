async function pegarAdministradores(){
    const protocolo = "http";
    const host = "localhost";
    const porta = "3002";
    const endpoint = "admin";
    const url = `${protocolo}://${host}:${porta}/${endpoint}`;
    let resposta = (await axios.get(url)).data;
    return resposta;
}
async function carregarAdministradores(){
    const administradores = await pegarAdministradores();
    const lista = document.querySelector(".informacoes");
    for (let i = 0; i <administradores.length; i++){

        const email_div = document.createElement("div");
        email_div.classList.add("col-md-7", "col-5" , "text-start","border-end", "p-0", "pt-1");
        const input_email = document.createElement("input");
        input_email.classList.add("input-email", "w-100");
        input_email.type = "email";
        input_email.value = administradores[i].email;
        input_email.placeholder = "Email";
        input_email.readOnly = true;

        email_div.appendChild(input_email);
        lista.appendChild(email_div);

        tipo_div = document.createElement("div");
        tipo_div.classList.add("col-md-3", "col-5", "text-center", "border-end");
        const forms_tipo = document.createElement("select");
        forms_tipo.classList.add("form-select", "input-select");
        forms_tipo.ariaLabel = "Formulario de seleção de tipo de usuário";
        const option_forms1 = document.createElement("option");
        option_forms1.innerHTML = "Administrador";
        option_forms1.value = "1";
        const option_forms2 = document.createElement("option");
        option_forms2.innerHTML = "Coordenador";
        option_forms1.value = "2";
        const option_forms3 = document.createElement("option");
        option_forms3.innerHTML = "Laboratorista";
        option_forms1.value = "3";

        forms_tipo.appendChild(option_forms1);
        forms_tipo.appendChild(option_forms2);
        forms_tipo.appendChild(option_forms3);
        tipo_div.appendChild(forms_tipo);
        lista.appendChild(tipo_div);


        const editar_div = document.createElement("div");
        editar_div.classList.add("col-md-1", "col-1", "text-center", "border-end", "p-0");
        const botao_editar = document.createElement("button");
        botao_editar.classList.add("botao-editar");
        botao_editar.type = "button";
        const icone_editar = document.createElement("svg");
        icone_editar.classList.add("bi","bi-pencil-square");
        icone_editar.width = "16px";
        icone_editar.height = "16px";
        icone_editar.viewBox = "0 0 16 16";
        icone_editar.fill = "currentColor";
        icone_editar.xmlns = "http://www.w3.org/2000/svg";
        const path_editar = document.createElement("path");
        path_editar.d = "M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z";
        
        icone_editar.appendChild(path_editar);
        botao_editar.appendChild(icone_editar);
        editar_div.appendChild(botao_editar);
        lista.appendChild(editar_div);


        const excluir_div = document.createElement("div");
        excluir_div.classList.add("col-md-1", "col-1", "text-center", "p-0");
        const botao_excluir = document.createElement("button");
        botao_excluir.classList.add("botao-excluir");
        botao_excluir.type = "button";
        const icone_excluir = document.createElement("svg");
        icone_excluir.classList.add("bi","bi-trash", "icon");
        icone_excluir.width = "16px";
        icone_excluir.height = "16px";
        icone_excluir.viewBox = "0 0 16 16";
        icone_excluir.fill = "currentColor";
        icone_excluir.xmlns = "http://www.w3.org/2000/svg";
        const path_excluir = document.createElement("path");
        path_excluir.d = "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z";
        const path_excluir2 = document.createElement("path");
        path_excluir2.d = "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z";
    
        icone_excluir.appendChild(path_excluir, path_excluir2);
        botao_excluir.appendChild(icone_excluir);
        excluir_div.appendChild(botao_excluir);
        lista.appendChild(excluir_div);

    }
}