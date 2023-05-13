var salas;
const  l= [];
var lista_blocos;
async function carregarSalas(rows){
    salas = rows;
    for (let i = 0; i <rows.length; i++){
        l.push(rows[i].bloco);
    }
    lista_blocos = [...new Set(l)].sort();
    const pagination = document.querySelector(".pagination");
    const itemFinal = document.querySelector("#itemFinal");
    for (let i = 0; i < 5; i++){
        const li = document.createElement("li");
        const a = document.createElement("a");
        li.classList.add("page-item");
        a.classList.add("page-link", "pagina");
        a.id = `pag${i}`;
        a.innerHTML = lista_blocos[i];
        a.addEventListener("click", function(){
        mostrarSalas(a.innerHTML)});
        li.appendChild(a);
        pagination.insertBefore(li, itemFinal);
    }
    const lista = document.querySelector(".list-group");
    for (let i = 0; i <rows.length; i++){
        if(rows[i].bloco == lista_blocos[0]){
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

let indiceBlocos = 5;
async function trocaPagination(id) {
    const pagination = document.querySelector(".pagination");
    const itemInicial = document.querySelector("#itemInicial");
    const itemFinal = document.querySelector("#itemFinal");
    const ant = document.querySelector("#PaginaAnt");
    const prox = document.querySelector("#PaginaProx");
    const BLOCOS_POR_PAGINA = 5
    let qntd = 0;
    if (id === "PaginaProx") {
      if (indiceBlocos + BLOCOS_POR_PAGINA <= lista_blocos.length) {
        for (let i = 0; i < BLOCOS_POR_PAGINA; i++, indiceBlocos++) {
            const pag = document.querySelector("#pag" + i);
            pag.innerHTML = lista_blocos[indiceBlocos];
        }
      } else {
        while (pagination.children.length > 2) {
          pagination.removeChild(pagination.children[1]);
        }
        let novoIndice = indiceBlocos;
        for (let i = 0;i < lista_blocos.length - novoIndice;i++, indiceBlocos++) {
          const li = criarItemPagina();
          const a = criarLinkPagina(i,lista_blocos[indiceBlocos]);
          a.addEventListener("click", function(){
            mostrarSalas(a.innerHTML)});
          li.appendChild(a);
          pagination.insertBefore(li, itemFinal);
        }
        const prox = document.querySelector("#" + id);
        prox.classList.add("disabled");
      }
      
      ant.classList.remove("disabled");
    } else if (id === "PaginaAnt") {
        
        while (pagination.children.length > 2) {
          pagination.removeChild(pagination.children[1]);
          qntd++;
        }
        let novoIndice = indiceBlocos - qntd;
        indiceBlocos = novoIndice;
        for (let i = 0;i < BLOCOS_POR_PAGINA;i++, novoIndice--) {
            const li = criarItemPagina();
            const a = criarLinkPagina(novoIndice - 1,lista_blocos[novoIndice - 1]);
            a.addEventListener("click", function(){
                mostrarSalas(a.innerHTML)});    
            li.appendChild(a);
            pagination.insertBefore(li, itemInicial.nextSibling);
            }
        if (indiceBlocos === 5) {
            const ant = document.querySelector("#" + id);
            ant.classList.add("disabled");
        }
        prox.classList.remove("disabled");
        
    }

  }
  
function criarItemPagina() {
    const li = document.createElement("li");
    li.classList.add("page-item");
    return li;
}

function criarLinkPagina(index,text) {
    const a = document.createElement("a");
    a.classList.add("page-link", "pagina");
    a.innerHTML = text;
    a.id = `pag${index}`;
    return a;
}