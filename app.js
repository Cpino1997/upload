// importamos express, app,multer y mime-types
const express = require('express');
const app = express();
const multer = require('multer');
const mimeTypes = require('mime-types')

//declaramos storge para poder guardar los archivos en el disco del servidor
const storge = multer.diskStorage({
    // marcamos su destino
    destination:'uploads/',
    //creamos una funcion con mimetype para guardar la extension del archivo y asignarle un nombre segun la fecha y hora de subida
    filename: function(req, file,cb){
        cb("",Date.now() + "." + mimeTypes.extension(file.mimeType));
    }
})

// declaramos a multer para que trabaje en la carpeta uploads
const upload = multer({
    dest:'uploads/'
})

//creamos el metodo get para ingresar al index
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/views/index.html")
})

//creamos el metodo post para guardar los archivos 
app.post("/files",upload.single('archivo'),(req,res)=>{
    res.send("subido con exito!");
})

// declaramos el puerto en el que trabajaremos
app.listen(3000, ()=> console.log("Estoy corriendo en http://localhost:3000"));