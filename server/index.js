const { agregarLibro, obtenerLibros, listarLibros, modificarLibro,eliminarLibro } = require('./base_de_datos/consultas.js');
const express = require('express');
const app = express();
app.use(express.json())


// middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

app.listen(3000, () => console.log('El servidor se inicio con exito'));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Obtener todos los libros
app.get('/libros', async (req, res) => {
    const libros = await obtenerLibros();
    res.json(libros);
});

//Obtener un libro
app.get('/libros/:id', async (req, res) => {
    const { id } = req.params;  
    const libro = await listarLibros(id); 
    res.json(libro); 
});


// Agregar un libro
app.post('/libros', async (req, res) => {
    const { titulo, autor, anio } = req.body
    await agregarLibro(titulo, autor, anio)
    res.send("Libro agregado con éxito")
});

// Editar un libro http://localhost:3000/libros/(id del que se quiera modificar)?titulo=(nuevo titulo)
app.put("/libros/:id", async (req, res) => {
    const { id } = req.params
    const { titulo } = req.query
    await modificarLibro(titulo, id)
    res.send("Titulo modificado con éxito")
    })


// Eliminar un libro
app.delete("/libros/:id", async (req, res) => {
    const { id } = req.params
    await eliminarLibro(id)
    res.send("Libro eliminado con éxito")
    })



