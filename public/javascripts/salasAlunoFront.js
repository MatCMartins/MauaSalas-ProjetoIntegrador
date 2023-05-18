var map = L.map('map',{zoomControl:false}).setView([(-23.6515300 +-23.6449700)/2 , (-46.57975+-46.56745)/2], 17,);

map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();
map.dragging.disable();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var data;
var lista_blocos = [];

var markers = {};

async function getBlocos(rows){
    data = rows;
    for (let i =0; i < data.length; i++){
        var bloco = data[i];
        lista_blocos.push(bloco.bloco);
    }
    for (let i =0; i < data.length; i++){
        var bloco = data[i];
        markers[bloco.id] = L.circle([bloco.latitude, bloco.longitude],{color: bloco.cor}).addTo(map);
        markers[bloco.id].bindPopup("Bloco " + bloco.bloco);
        markers[bloco.id].on('click', function(e){
            getSalas(lista_blocos[i]);
        });
    }
};

async function getSalas(bloco){
    axios.post(("http://localhost:3000/salas/blocos/bloco"),{
        bloco: bloco
    })
    .then((data) => {
        const salas = document.getElementById('salas');
        const container = document.createElement('div');
        container.classList.add("container-fluid");
        const row = document.createElement('div');
        row.classList.add("row");
        while (salas.firstChild) {
            salas.removeChild(salas.firstChild);
        }
        for (let i =0; i < data.data.length; i++){
            if (i/3 == 0){
                const row = document.createElement('div');
                row.classList.add("row");
            }
                const col = document.createElement('div');
                col.classList.add("col-lg-4", "col-12");
                const card = document.createElement('div');
                card.classList.add("card", "text-center", "mb-3");
                const cardBody = document.createElement('div');
                cardBody.classList.add("card-body");
                const cardTitle = document.createElement('h5');
                cardTitle.classList.add("card-title");
                cardTitle.innerHTML = data.data[i].bloco + data.data[i].andar + data.data[i].numero_sala;
                const cardText1 = document.createElement('p');
                cardText1.classList.add("card-text");
                const cardText2 = document.createElement('p');
                cardText1.classList.add("card-text");

                if (data.data[i].tipo_metodo == "Ativa"){
                    cardText1.innerHTML = "Metodologia: Ativa";
                    cardText2.innerHTML = "Capacidade: " + data.data[i].mesas * data.data[i].cadeiras + " pessoas";
                }
                else if (data.data[i].tipo_metodo == "Tradiconal"){
                    cardText1.innerHTML = "Metodologia: Tradicional";
                    cardText2.innerHTML = "Capacidade: " + data.data[i].cadeiras + " pessoas";
                }
                else{
                    cardText1.innerHTML = "Metodologia: Laboratório";
                    cardText2.innerHTML = "Capacidade: " + data.data[i].computadores + " pessoas";
                }

                const cardButton = document.createElement('button');
                cardButton.classList.add("btn", "btn-primary");
                cardButton.innerHTML = "Reservar";
                

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText1);
                cardBody.appendChild(cardText2);
                cardBody.appendChild(cardButton);
                card.appendChild(cardBody);
                col.appendChild(card);
                row.appendChild(col);
                container.appendChild(row);
            }
            salas.appendChild(container);
    });


}









