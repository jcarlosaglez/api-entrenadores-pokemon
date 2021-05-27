const express = require('express');
let entrenadores = require('./entrenadores.json');
let ultimo_indice = 10;

const app = express();

app.use(express.json());
app.use(express.text());

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

app.get('/obtener-entrenadores', (req, res) => {
	let lista_entrenadores = entrenadores.map(entrenador => ({id: entrenador.id, nombre: entrenador.nombre}));
	res.json(lista_entrenadores);
})

app.get('/entrenador/:id', (req, res) => {
	const {params} = req;
	let id = parseInt(params.id);

	if(!id) {
		res.end("Solo se acepta el id como número.");
		return;
	}

	let entrenador = entrenadores.find(entrenador => entrenador.id === id);

	if(!entrenador) {
		res.end("El entrenador con el ID proporcionado no existe.");
		return;
	}

	res.json(entrenador);
})

app.get('/entrenador/:id/pokemon', (req, res) => {
	const {params} = req;
	let id = parseInt(params.id);

	if(!id) {
		res.end("Solo se acepta el id como número.");
		return;
	}

	let {pokemon} = entrenadores.find(entrenador => entrenador.id === id) ?? {};

	if(!pokemon) {
		res.end("El entrenador con el ID proporcionado no existe.");
		return;
	}

	res.json(pokemon);
})

app.get('/agregar-entrenador', (req, res) => {
	const entrenador = req.body;

	entrenadores.push({ ...entrenador, id: ++ultimo_indice });

  	res.end("Entrenador agregado correctamente.");
})

app.get('/entrenador/:id/agregar-pokemon', (req, res) => {
	const {params} = req;
	let id = parseInt(params.id);

	if(!id) {
		res.end("Solo se acepta el id como número.");
		return;
	}

	const {pokemon} = req.body;

	if(!pokemon) {
		res.end("No se obtuvo el nombre del pokemon en la petición.");
		return;
	}

	let entrenador = entrenadores.find(entrenador => entrenador.id === id);

	if(!entrenador) {
		res.end("El entrenador con el ID proporcionado no existe.");
		return;
	}

	entrenador.pokemon.push(pokemon);

	res.end("El pokemon se agrego correctamente.");
})

app.listen(8080, function () {
	console.log("Escuchando el puerto 8080");
})