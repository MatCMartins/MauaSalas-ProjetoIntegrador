var salas;
const lista_blocos = [];
async function carregarSalas(rows){
    salas = rows;
    for (let i = 0; i <rows.length; i++){
        lista_blocos.push(rows[i].bloco);
    }
    const uniq = [...new Set(lista_blocos)].sort();

    const pagination = document.querySelector(".pagination");
    const itemFinal = document.querySelector("#itemPagination");
    for (let i = 0; i < 5; i++){
        const li = document.createElement("li");
        const a = document.createElement("a");
        li.classList.add("page-item");
        a.classList.add("page-link", "pagina");
        a.id = `pag${i}`;
        a.innerHTML = uniq[i];
        li.appendChild(a);
        pagination.insertBefore(li, itemFinal);
    }
    const lista = document.querySelector(".list-group");
    for (let i = 0; i <rows.length; i++){
        if(rows[i].bloco == uniq[0]){
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
            document.querySelector(`#Sala${i}`).innerHTML = rows[i].bloco + rows[i].numero_sala;
        }
    }
}
async function mostrarSalas(letra_pagina){
    let list_group = document.querySelector(".list-group");
    while (list_group.firstChild){
        list_group.removeChild(list_group.firstChild);
    }
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
            document.querySelector(`#Sala${i}`).innerHTML = salas[i].bloco + salas[i].numero_sala;
        }
    }
}

let indicePagination = 0;

async function trocaPagination(id){
    const pagination = document.querySelector(".pagination");
    const itemFinal = document.querySelector("#itemPagination");
    if (id == "PaginaProx"){
        if (lista_blocos.length - indicePagination > 10){
            for (let i = 0; i < 5; i++, indicePagination++){
                const pag = document.querySelector("#pag" + i);
                pag.innerHTML = lista_blocos[indicePagination];
            }
        }
        else{
            while (pagination.children.length > 2){
                pagination.removeChild(pagination.children[1]);
            }	
            for (let i = 0; i < lista_blocos.length - indicePagination*2 - 2; i++, indicePagination++){
                const li = document.createElement("li");
                const a = document.createElement("a");
                li.classList.add("page-item");
                a.classList.add("page-link", "pagina");
                a.id = `pag${i}`;
                a.innerHTML = lista_blocos[indicePagination];
                li.appendChild(a);
                pagination.insertBefore(li, itemFinal);
            }
            const prox = document.querySelector("#" + id);
            prox.classList.add("disabled");
        }
        const ant = document.querySelector("#PaginaAnt");
        ant.classList.remove("disabled");
    }
    else{   
        if (indicePagination < 5){
            while (pagination.children.length > 2){
                pagination.removeChild(pagination.children[1]);
            }
            for (let i = 0; i < 5; i++, indicePagination++){
                const li = document.createElement("li");
                const a = document.createElement("a");
                li.classList.add("page-item");
                a.classList.add("page-link", "pagina");
                a.id = `pag${i}`;
                a.innerHTML = lista_blocos[indicePagination];
                li.appendChild(a);
                pagination.insertBefore(li, itemFinal);
            }	

        }
        else{
            for (let i = 0; i < 5; i++, indicePagination++){
                const pag = document.querySelector("#pag" + i);
                pag.innerHTML = lista_blocos[indicePagination];
            }
        }
    }  
}