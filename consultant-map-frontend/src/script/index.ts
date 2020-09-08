import * as leaflet from 'leaflet';
import '../css/index.scss';
const offices = require('../assets/data/offices.json');

interface Office {
  id: string,
  address: string,
  coordinates: [
    number,
    number,
  ]
}

const createOfficeContainer = (): HTMLElement => {
  const officeElement: HTMLElement = document.createElement('div');
  officeElement.setAttribute('class', 'office');
  document.getElementById('offices').appendChild(officeElement);
  return officeElement;
}


const createHeader = (office: Office): HTMLElement => {
  const header: HTMLElement = document.createElement('h2');
  header.innerHTML = 'Cygni - ' + office.id;
  return header;
};

const createAdress = (office: Office): HTMLElement => {
  const adress: HTMLElement = document.createElement('p');
  adress.innerHTML = office.address;
  return adress;
};

const createMap = (office: Office): HTMLElement => {
  const mapContainer: HTMLElement = document.createElement('div');
    mapContainer.setAttribute('class', 'map');
    mapContainer.setAttribute('id', office.id);
    mapContainer.setAttribute('style', 'height: 600px');
  const map: leaflet.Map =
    leaflet
      .map(office.id)
      .setView(office.coordinates, 14);
  leaflet
    .tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: `Map data &copy;
      <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,
      <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
      Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiYWRhbS1jeWduaSIsImEiOiJja2VvZW1kN3YxaDVuMnNrN3dubHF5bGl4In0.6Wa9u40_O9arB79J2RmUnA'
    }).addTo(map);
  leaflet
    .marker(office.coordinates)
    .addTo(map)
    .bindPopup(office.address);
  return mapContainer;
};

const initMaps = (): void => {
  offices.map((office: Office) => {
    const officeElement: HTMLElement = createOfficeContainer();
    officeElement.appendChild(createHeader(office));
    officeElement.appendChild(createAdress(office));
    officeElement.appendChild(createMap(office));
  });
}

initMaps();