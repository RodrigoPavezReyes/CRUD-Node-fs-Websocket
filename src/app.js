import express from "express"
import path from "path"
import http from "http"
import handlebars from "express-handlebars"
import { fileURLToPath } from "url"// seria de utils.js
import { dirname,join } from "path"// seria de utils.js
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import { Server } from "socket.io"
import { ProductsManager } from "./productManager.js"



const __filename = fileURLToPath(import.meta.url)// seria de utils.js
const __dirname = dirname(__filename)// seria de utils.js

const app = express()
const PORT = 8080
const productManager = new ProductsManager("products.json") //instancio productManager

//MIDDLEWARS
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "/views"))) //indico donde quiero que me muestre
//informacion cuando visito un url(index hb que esta dentro de views)

app.use(express.static(path.join(__dirname, "/public"))) //para trabajar con websocket y 
//mostrar form en tiempo real con la carga de productos

//HANDLEBARS
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")


//RUTAS
app.use("/api", productsRouter)
app.use("/api", cartsRouter)
app.use("/", viewsRouter)




app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"))
}) //esta linea me permite trabajar con index.html simulando un front 



//CONEXION CON SOCKET IO
const httpServer = app.listen(PORT, ()=>console.log(`Servidor ${PORT}`))
const io = new Server(httpServer)


io.on("connection", async (socket) => {
    console.log("Nuevo Cliente Conectado");

    // Enviar lista de productos al cliente que se conecta
    socket.on("requestProductList", async () => {
        const products = await productManager.getProducts();
        socket.emit("updateProductList", products);
    });

    //Socket ON escuchador de eventos
    // Escuchar evento de nuevo producto
    socket.on("newProduct", async (data) => {
        await productManager.addProducts(data);
        const products = await productManager.getProducts();

    // Emitir lista de productos actualizada a todos los clientes
        io.emit("updateProductList", products);//se usa io para que todos los usuario conectados reciban la lista actualizada
    });

     //Escuchar evento cuando se elimina un producto
     socket.on("deleteProduct",async(id)=>{  //la data es el id que me envia el cliente
        await productManager.deleteProduct(id)
        const products = await productManager.getProducts()

    //Envio la lista actualizada de producto al cliente
    io.emit("updateProductList", products)
    })
});




















