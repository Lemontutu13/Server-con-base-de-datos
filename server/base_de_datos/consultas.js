const { Pool } = require('pg')
const pool = new Pool({
host: 'localhost',
user: 'postgres',
password: 'postgres',
database: 'plan_de_lectura',
allowExitOnIdle: true
})
const getDate = async () => {
const result = await pool.query("SELECT NOW()")
console.log(result)
}
getDate()



const agregarLibro = async (titulo, autor, anio) => {
    console.log("Intentando agregar libro con los siguientes datos:", titulo, autor, anio);
    const consulta = "INSERT INTO libros (titulo, autor, anio) VALUES ($1, $2, $3)";
    const values = [titulo, autor, anio];
    const result = await pool.query(consulta, values);
    console.log("Libro agregado:", result);
};



//listado de todos los libros
const obtenerLibros= async () => {
const { rows } = await pool.query("SELECT * FROM libros")
console.log(rows)
return rows
}



//listar libro por id
const listarLibros = async (id) => {
    const consulta = 'SELECT * FROM libros WHERE id = $1';
    const result = await pool.query(consulta, [id]);
    return result.rows;  // Retorna las filas de la consulta
};


//modificar un libro 
const modificarLibro = async (titulo, id) => {
    const consulta = "UPDATE libros SET titulo = $1 WHERE id = $2"
    const values = [titulo, id]
    const result = await pool.query(consulta, values)
    }



//eliminar libro 
const eliminarLibro = async (id) => {
    const consulta = "DELETE FROM libros WHERE id = $1"
    const values = [id]
    const result = await pool.query(consulta, values)
    }

    
module.exports = {listarLibros,obtenerLibros,agregarLibro,modificarLibro, eliminarLibro}