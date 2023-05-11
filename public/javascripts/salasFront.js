async function pegarSalas(){
    const protocolo = "http";
    const host = "localhost";
    const porta = "3001";
    const endpoint = "salas";
    const url = `${protocolo}://${host}:${porta}/${endpoint}`;
    let resposta = (await axios.get(url)).data;
    return resposta;
}


async function carregarSalas(){
    salas = await pegarSalas();
    const lista = document.querySelector(".list-group");
    for (let i = 0; i <salas.length; i++){
        if(salas[i].bloco == "A"){
            let item = document.createElement("li");
            let a_item = document.createElement("a");
            let botao_item = document.createElement("button");
            item.classList.add("list-group-item");
            a_item.classList.add("d-inline-block","mt-3");
            botao_item.classList.add("btn","btn-outline-primary","d-inline-block","float-end","mt-2");
            botao_item.type = "button";
            botao_item.id = `botao${i}`;
            botao_item.innerHTML = "Editar";
            item.appendChild(botao_item);
            item.appendChild(a_item);
            lista.appendChild(item);
            a_item.id = `Sala${i}`;
            document.querySelector(`#Sala${i}`).innerHTML = salas[i].bloco + salas[i].numero;
        }
    }
}
async function mostrarSalas(letra_pagina){
    let list_group = document.querySelector(".list-group");
    while (list_group.firstChild){
        list_group.removeChild(list_group.firstChild);
    }
    salas = await pegarSalas();
    for (let i = 0; i <salas.length; i++){
        if(salas[i].bloco == letra_pagina){
            let item = document.createElement("li");
            let a_item = document.createElement("a");
            let botao_item = document.createElement("button");
            item.classList.add("list-group-item");
            a_item.classList.add("d-inline-block","mt-3");
            botao_item.classList.add("btn","btn-outline-primary","d-inline-block","float-end","mt-2");
            botao_item.type = "button";
            botao_item.id = `botao${i}`;
            botao_item.innerHTML = "Editar";
            item.appendChild(botao_item);
            item.appendChild(a_item);
            list_group.appendChild(item);
            a_item.id = `Sala${i}`;
            document.querySelector(`#Sala${i}`).innerHTML = salas[i].bloco + salas[i].numero;
        }
    }
}

let i = 0;

async function trocaPagination(id){
    const lista = ["A","B","C","D","E","F","G","H","I","J","L","M","N","P","Q","R","S","V","W"];
    const pagination = document.querySelector(".pagination");
    const itemFinal = document.querySelector("#itemPagination");
    if (id == "PaginaProx"){
        for (let cont=0; cont < 5; cont++, i++){
            let pag = document.querySelector(`#pag${cont}`);
            pag.innerHTML = lista[i+5];
        }
    }
    else{   
        for (let cont=4; cont > -1; cont--, i--){
            let pag = document.querySelector(`#pag${cont}`);
            console.log(i)
            console.log(lista[i-1])
            pag.innerHTML = lista[i-1];
        }
    }
    if (i >= 5){
        document.querySelector("#PaginaAnt").classList.remove("disabled");
    }
    else{
        document.querySelector("#PaginaAnt").classList.add("disabled");
    }
    if (i >= 15){
        document.querySelector("#PaginaProx").classList.add("disabled");
        itemFinal.classList.add("d-none");
    }
    else{
        document.querySelector("#PaginaProx").classList.remove("disabled");
        itemFinal.classList.add("d-block");
        itemFinal.classList.remove("d-none");
    }   
}