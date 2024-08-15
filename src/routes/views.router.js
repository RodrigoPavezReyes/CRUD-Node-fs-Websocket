import express from "express"
import { ProductsManager } from "../productManager.js"

const router = express.Router()


const productManager = new ProductsManager("products.json")

router.get("/home", async(req,res)=>{
    const products = await productManager.getProducts()
    res.render("home",{products})  //me renderiza el home.handlebars como un front, 
    //y envia "products" para hacer el #each
})


router.get("/", (req,res)=>{
    res.render("index.html",{}) //solo se renderiza la vista, para websocket
})




export default router
