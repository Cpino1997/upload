const express = require('express');
const app = express();
const multer = require('multer');
const mimeTypes = require('mime-types')

const storge = multer.diskStorage({
    destination:'uploads/',
    filename: function(req, file,cb){
        cb("",Date.now() + "." + mimeTypes.extension(file.mimeType));
    }
})

const upload = multer({
    dest:'uploads/'
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/views/index.html")
})

app.post("/files",upload.single('archivo'),(req,res)=>{
    res.send("subido con exito!");
})
app.listen(3000, ()=> console.log("Estoy corriendo en http://localhost:3000"));