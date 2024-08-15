import express from "express"
import { ProductsManager } from "../productManager.js"

const router = express.Router()
const productManager = new ProductsManager("products.json")


router.get("/products", async(req,res)=>{
    try {
        const products= await productManager.getProducts()
        
        const limit = parseInt(req.query.limit)

        if (!isNaN(limit) && limit > 0) {
            const productosLimitados = products.slice(0, limit);
            res.json(productosLimitados);
        } else {
            // Si no se proporciona un limit válido, devolvemos todos los productos
            res.json(products)
        }
        
        
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
    
})

router.get("/products/:pid", async(req,res)=>{
    try {

        const urlId = parseInt(req.params.pid)
        const products = await productManager.getProducts()
    
        const productId = products.find(p=>p.id ===urlId)
    
        if (!productId) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(productId);
        
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
})

router.post("/products",async(req,res)=>{
   try {
    const newProduct = req.body
    await productManager.addProducts(newProduct)
    
    res.json({ message: "Producto agregado con éxito", productManager });

   } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto" });
   }
})


router.put("/products/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updateFields = req.body;

        // Obtengo el producto existente
        const existingProduct = await productManager.getProductById(productId);

        if (!existingProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Actualizo solo los campos enviados, sin modificar el id
        const updatedProduct = {
            ...existingProduct,
            ...updateFields
        };

        // Actualizar el producto en el archivo JSON
        await productManager.updateProduct(productId, updatedProduct);

        res.json({ message: "Producto actualizado con éxito", product: updatedProduct });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
});


router.delete("/products/:pid", async(req,res)=>{
    try {
        const deleteId = parseInt(req.params.pid)
        const productDelete = await productManager.deleteProduct(deleteId)
        res.json({message:"Producto eliminado con éxito",productDelete})

    }catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ error: "Error al eliminar el producto" });
        }



})


export default router;
