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
async function getBlocos(rows){
    data = rows;
    console.log(data)
};

var markers = {};





