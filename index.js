const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.end("Bienvenido a la API pokemon");
})

/**
 * Reto: API de Pokemon
 *
 * Estructura de los datos de entrenadores
 *  {
 *    "id": 1,
 *    "nombre": "Ash Ketchup",
 *    "region": "Kanto",
 *    "pokemon": [
 *      "Pikachu",
 *      "Charmander",
 *      "Squirtle"
 *    ]
 * }
 *
 *
 * 1. Obtener la lista de los NOMBRES y ID de los entrenadores
 *
 * 2. Obtener la info de un entrenador por su ID
 * 
 * 3. Obtener el listado de POKEMON de un entrenador (por ID)
 * 
 * 4. Crear un nuevo entrenador
 * 
 * 5. Agregar un pokemon a un entrenador
 */

app.listen(8080, function () {
	console.log("Escuchando el puerto 8080");
})