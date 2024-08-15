import express from "express"
import { CartManager } from "../cartManager.js"

const router = express.Router()
const cartManager = new CartManager("carritos.json")


//Crear un nuevo carrito
router.get("/api/carts", async(req,res)=>{
    try {
        const newCart = await cartManager.createCart()
        res.status(201).json({ message: "Carrito creado con éxito", cart: newCart });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el carrito" });
    }
})

//Listar productos del carrito por ID

router.get("/api/carts/:cid", async (req, res) => {
    try {
        const cart = await cartManager.getCartById(parseInt(req.params.cid));
        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }
        res.json(cart.products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el carrito" });
    }
});

//Agregar producto al carrito
router.post("/api/carts/:cid/product/:pid", async (req, res) => {
    try {
        await cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
        res.json({ message: "Producto agregado al carrito" });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar producto al carrito" });
    }
});


export default router;