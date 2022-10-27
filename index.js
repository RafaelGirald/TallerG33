const { request, response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();
mongoose.connect('mongodb+srv://angelgiraldo96:Angel090696@clustermin-tic-33.xszm225.mongodb.net/bd_g33?retryWrites=true&w=majority');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const usuarioSchema = new mongoose.Schema({

    nombre: String,
    cedula: String,
    edad: Number,

});

const UsuarioModelo = new mongoose.model('usuarios', usuarioSchema);

app.post('/AgregarUsuario', (request, response) => {    

    let usuario = new UsuarioModelo({

        nombre: request.body.nombre,
        cedula: request.body.cedula,
        edad: request.body.edad,

    });
    usuario.save(function (error, datos) {
        if (error) {
            response.send('uy error al crear usuario');
        } else {
            response.send('se guardo el usuario');
        }
    });    
});

app.delete('/EliminarUsuario', (request, response)=>{
    UsuarioModelo.deleteOne(
        {cedula: request.body.cedula},
        function(error, documento){
            if(error){
                response.send("error, al eliminar usuario");
            }else{
                response.send("se elimino correctamente.");
            }
        });
});

app.get("/UsuarioBuscar", (request, response)=>{       

    const filtro= {
        cedula: request.body.cedula | request.query.cedula, 
        nombre: request.body.nombre ? request.body.nombre : request.query.nombre,

    };
    

    UsuarioModelo.find(filtro,  function(error, documento){

            if(error){
                response.send("error, al buscar usuario");
            }else{
                response.send(documento);
            }
        });
});

app.put("/EditarUsuario", (request, response)=>{

   const datoNuevo = {nombre: request.body.nombre, edad: request.body.edad};
   const filtro = {cedula: request.body.cedula};

   UsuarioModelo.findOneAndUpdate(filtro, datoNuevo, function(error, documento){
   
    if(error){
        response.send("error al editar");
    }else{
        response.send("se edito correctamente");
    }
   })
});

app.get("/AllUsers", (request, response)=>{
    
    const filtro= {
        cedula: request.body.cedula | request.query.cedula, 
        nombre: request.body.nombre ? request.body.nombre : request.query.nombre,

    };
    

    UsuarioModelo.find(filtro,  function(error, documento){

            if(error){
                response.send("error, al buscar usuario");
            }else{
                response.send(documento);
            }
        });
});

app.get('/', (request, response) => {
    response.send("<h1 style='color:red'>Taller mecánica</h1>");
});
app.get('/inicio', (request, response) => {
    response.send("Grupo 33");
});
app.listen(3000, () => {
    console.log('servidor escuchando...');
});
