// Creamos unas constantes que van a contener cada archivo necesario para crear la capa final:
const electro = require('./electrolineras.json').data;
const conectores = require('./connectors.json');
// Para facilitar el uso posterior, creamos un nuevo objeto que agrupe los conectores por sus IDs,
// usando el método "reduce":
const connectorsByID = conectores.reduce(function (old,cur,i, arr) {
      old[cur.id] = cur.text;
      return old;
    }, {});

// Cargamos un posible módulo que, como opción más adelante:
const jsonexport = require('jsonexport');

// Eliminamos el primer elemento al no contener datos de electrolineras:
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/splice
// splice modifica el array original. Si no queremos alterarlo, utilizamos slice.
electro.splice(0,1);
var electroDatos = electro;

// Vamos a quedarnos con los datos de las electrolineras que nos son útiles: latitud, longitud,
// ID y características de los conectores (IDs). Al aplicar directamente la función posterior,
// conseguimos los tipos de conectores en menos pasos:
var electroFiltro1 = electroDatos.map(arr => [
  arr[0],
  arr[1],
  arr[2],
  translateConnectorIDs(arr[10]),
  arr[10].length
]);

var electroFiltro2 = electroFiltro1.filter(hola => hola[0] < 90 && hola[0] > -90 && hola[1] < 180 && hola[1] > -180);

// Para enlazar los objetos "electroDatos" y "connectors" mediante los ID, usamos una función que
// recorre "electroFiltro" y devuelve el valor de "connectors" correspondiente:
function translateConnectorIDs(arr){
  return arr
  .sort()
  .map(id => connectorsByID[id])
};

// Finalmente, para "convertir" el objeto completo a csv y poder consumirlo como capa, pasaremos
// por consola las cabeceras y el objeto final:
console.log("LAT;LON;OBJECT_ID;CONNECTORS;NUM_CONNECTORS");
electroFiltro2.map(arr => console.log(`${arr.join(';')}`));
