
# Guía de upload archivos con Express js.
Esta guiá tiene como objetivo enseñar y mostrar una forma de subir archivos a aplicaciones con JWT.

# Requisitos:

- VisualStudioCode.
- Node.js v18.
- Npm v8.
- Ubuntu, puedes usar la terminal en windows para seguir los pasos o directamente instalar wls (https://learn.microsoft.com/es-es/windows/wsl/install).

## Pasos:

### -Paso 1:

Primero crearemos un directorio, luego inicializaremos un proyecto y por ultimo importaremos los componentes que utilizaremos
y también importaremos las dependencias a utilizar

```bash
$ mkdir upload
$ cd upload
$ npm init -y
$ npm install express multer mime-types
```

### -Paso 2:

Crearemos la estructura de nuestro proyecto, o bien podemos clonar el proyecto:
```bash
$ git clone https://github.com/PinoLabs/upload.git
$ cd upload
$ npm install
$ node app.js
```
Estructura del Proyecto :

```bash
├── uploads --> carpeta donde se guardan los archivos
├── views
	└── index.ejs --> vista principal
├── app.js --> aplicacion 
├── package.json
├── package-lock.json
├── Readme.md
```
### -Paso 3:
Creamos el archivo app.js y dentro de el pondremos lo siguente:
```js 
// importamos express, app,multer y mime-types
const  express  =  require('express');
const  app  =  express();
const  multer  =  require('multer');
const  mimeTypes  =  require('mime-types')

//declaramos storge para poder guardar los archivos en el disco del servidor
const  storge  =  multer.diskStorage({
// marcamos su destino
destination:'uploads/',
//creamos una funcion con mimetype para guardar la extension del archivo y asignarle un nombre segun la fecha y hora de subida
filename:  function(req, file,cb){
cb("",Date.now() +  "."  +  mimeTypes.extension(file.mimeType));
}
})
// declaramos a multer para que trabaje en la carpeta uploads
const  upload  =  multer({
dest:'uploads/'
})
//creamos el metodo get para ingresar al index
app.get("/",(req,res)=>{
res.sendFile(__dirname  +  "/views/index.html")
})
//creamos el metodo post para guardar los archivos
app.post("/files",upload.single('archivo'),(req,res)=>{
res.send("subido con exito!");

})
// declaramos el puerto en el que trabajaremos
app.listen(3000, ()=>  console.log("Estoy corriendo en http://localhost:3000"));
```

ahora creamos nuestro index.html desde donde subiremos los archivos
```html
<!DOCTYPE  html>
<html lang="es">
<head>
<meta  charset="UTF-80">
<meta  name="viewport"  content="width-device-width, initial-scale=1.0">
<title>uploads</title>
</head>
<body>
<h1>Sube Tu Archivo</h1>
<form  action="/files"  method="post"  enctype="multipart/form-data">
<input  type="file"  name="archivo"  id="archivo">
<input  type="submit"  value="Subir">
</form>
</body>
</html>
```
y wala, ya podemos subir archivos de forma rapida y sencilla.