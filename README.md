# CRUD de Productos

Este proyecto es una aplicación CRUD (Crear, Leer, Actualizar, Eliminar) de productos, desarrollada con Node.js. Utiliza el sistema de archivos (file system) para almacenar los datos y WebSocket para la actualización en tiempo real de la lista de productos.

## Características

- **Crear Producto**: Añade nuevos productos al sistema.
- **Leer Producto**: Visualiza la lista de productos almacenados.
- **Actualizar Producto**: Modifica la información de un producto existente.
- **Eliminar Producto**: Elimina un producto del sistema.
- **Actualización en tiempo real**: La lista de productos se actualiza en tiempo real utilizando WebSocket.

## Tecnologías Utilizadas

- **Node.js**: Para el backend del proyecto.
- **File System (fs)**: Para el almacenamiento de datos en archivos locales.
- **WebSocket**: Para la actualización en tiempo real de los datos en el frontend.

## Requisitos Previos

- Node.js instalado en tu máquina.

## Instalación

1. Clona este repositorio en tu máquina local:
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd tu-repositorio
    ```

3. Instala las dependencias necesarias:
    ```bash
    npm install
    ```

## Uso

1. Inicia el servidor:
    ```bash
    npm start
    ```

2. Abre tu navegador y navega a `http://localhost:3000` para ver la aplicación en acción.

## Estructura del Proyecto

- **app.js**: Archivo principal de la aplicación, donde se configura el servidor.
- **routes/**: Contiene las rutas para manejar las operaciones CRUD.
- **public/**: Contiene los archivos estáticos, como el HTML y los scripts de cliente.
- **views/**: Contiene las vistas que se renderizan en el frontend.
- **utils/**: Funciones auxiliares para manejar la lógica del file system.

# Consigna
✓ Realizar una clase de nombre “ProductManager”,
el cual permitirá trabajar con múltiples
productos. Éste debe poder agregar, consultar,
modificar y eliminar un producto y manejarlo en
persistencia de archivos (basado en entregable
1).
Aspectos a incluir
✓ La clase debe contar con una variable this.path,
el cual se inicializará desde el constructor y debe
recibir la ruta a trabajar desde el momento de
generar su instancia.
Manejo de archivos
DESAFÍO ENTREGABLE
✓ Debe guardar objetos con el siguiente
formato:
- id (se debe incrementar
automáticamente, no enviarse
desde el cuerpo)
- title (nombre del producto)
- description (descripción del
producto)
- price (precio)
- thumbnail (ruta de imagen)
- code (código identificador)
- stock (número de piezas
disponibles)
Aspectos a incluir
✓ Debe tener un método addProduct el
cual debe recibir un objeto con el
formato previamente especificado,
asignarle un id autoincrementable y
guardarlo en el arreglo (recuerda
siempre guardarlo como un array en el
archivo).
✓ Debe tener un método getProducts, el
cual debe leer el archivo de productos y
devolver todos los productos en
formato de arreglo.
✓ Debe tener un método getProductById,
el cual debe recibir un id, y tras leer el
archivo, debe buscar el producto con el
id especificado y devolverlo en formato
objeto
DESAFÍO ENTREGABLE
✓ Debe tener un método updateProduct, el
cual debe recibir el id del producto a
actualizar, así también como el campo a
actualizar (puede ser el objeto completo,
como en una DB), y debe actualizar el
producto que tenga ese id en el archivo.
NO DEBE BORRARSE SU ID
✓ Debe tener un método deleteProduct, el
cual debe recibir un id y debe eliminar el
producto que tenga ese id en el archivo.
Formato del entregable
✓ Archivo de javascript con el nombre
ProductManager.js



# Consigna
✓ Desarrollar un servidor basado en
express donde podamos hacer
consultas a nuestro archivo de
productos.
Aspectos a incluir
✓ Se deberá utilizar la clase
ProductManager que actualmente
utilizamos con persistencia de archivos.
✓ Desarrollar un servidor express que, en
su archivo app.js importe al archivo de
ProductManager que actualmente
tenemos.
Servidor con express
DESAFÍO ENTREGABLE
Aspectos a incluir
✓ El servidor debe contar con los
siguientes endpoints:
○ ruta ‘/products’, la cual debe leer el
archivo de productos y devolverlos
dentro de un objeto. Agregar el
soporte para recibir por query
param el valor ?limit= el cual
recibirá un límite de resultados.
- Si no se recibe query de límite, se
devolverán todos los productos
- Si se recibe un límite, sólo devolver el
número de productos solicitados
Servidor con express
DESAFÍO ENTREGABLE
○ ruta ‘/products/:pid’, la cual debe
recibir por req.params el pid
(product Id), y devolver sólo el
producto solicitado, en lugar de
todos los productos.
Sugerencias
● Tu clase lee archivos con promesas.
recuerda usar async/await en tus
endpoints
● Utiliza un archivo que ya tenga
productos, pues el desafío sólo es para
gets.
Formato del entregable
✓ Link al repositorio de Github con el
proyecto completo, el cual debe incluir:
- carpeta src con app.js dentro y tu
ProductManager dentro.
- package.json con la info del proyecto.
- NO INCLUIR LOS node_modules
generados.


# Consigna
✓ Configurar nuestro proyecto para que
trabaje con Handlebars y websocket.
Aspectos a incluir
✓ Configurar el servidor para integrar el
motor de plantillas Handlebars e instalar
un servidor de socket.io al mismo.
✓ Crear una vista “home.handlebars” la
cual contenga una lista de todos los
productos agregados hasta el momento
Websockets
DESAFÍO ENTREGABLE
✓ Además, crear una vista
“realTimeProducts.handlebars”, la cual
vivirá en el endpoint
“/realtimeproducts” en nuestro views
router, ésta contendrá la misma lista de
productos, sin embargo, ésta trabajará
con websockets.
✓ Al trabajar con websockets, cada
vez que creemos un producto
nuevo, o bien cada vez que
eliminemos un producto, se debe
actualizar automáticamente en
dicha vista la lista.
Sugerencias
✓ Ya que la conexión entre una consulta
HTTP y websocket no está contemplada
dentro de la clase. Se recomienda que,
para la creación y eliminación de un
producto, Se cree un formulario simple
en la vista
realTimeProducts.handlebars. Para que
el contenido se envíe desde
websockets y no HTTP. Sin embargo,
esta no es la mejor solución, leer el
siguiente punto.

