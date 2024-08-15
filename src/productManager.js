import fs from "fs";

export class ProductsManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async loadProducts() {
        try {
            const fileExists = await fs.promises.access(this.path)
                .then(() => true)
                .catch(() => false);

            if (fileExists) {
                const data = await fs.promises.readFile(this.path, "utf8");
                this.products = JSON.parse(data);
            } else {
                await this.writeProducts();
            }
        } catch (error) {
            console.error("Error al cargar los productos", error);
            this.products = [];
        }
    }

    async writeProducts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error("Error al guardar productos", error);
        }
    }
    

    async addProducts(product) {
        await this.loadProducts()
        try {
            const newProduct = {
                id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock
            };
            this.products.push(newProduct);
            await this.writeProducts();
            console.log("Producto agregado con éxito:", newProduct);
        } catch (error) {
            console.error(`Error al agregar producto`, error);
        }
    }

    async getProducts() {
        await this.loadProducts();
        try {
            return this.products;
        } catch (error) {
            console.error("no se puede cargar los productos",error);
        }
    }

    async getProductById(id) {
        await this.loadProducts();
        try {            
            const findProduct = this.products.find(producto => producto.id === id);
            return findProduct;
        } catch (error) {
            console.error("No se encuentra el producto",error);
        
        }
    }

    async updateProduct(id, updateFields) {
        await this.loadProducts();
        try {
            const productIndex = this.products.findIndex(product => product.id === id);
            if (productIndex === -1) return; // Producto no encontrado
    
            // Solo actualizamos los campos enviados, conservando el id
            this.products[productIndex] = { ...this.products[productIndex], ...updateFields };
            await this.writeProducts();
        } catch (error) {
            console.error("No se puede actualizar el producto", error);
        }
    }
    

    async deleteProduct(id) {
        await this.loadProducts()
        try {
            const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) return;

        this.products.splice(productIndex, 1);
        await this.writeProducts();
        console.log("Producto eliminado con exito")

        } catch (error) {
            console.error("no se puede eliminar el producto",error);
        }
    }
}


//Pruebas


/* const manager = new ProductsManager("products.json") // Instanciamos la clase

 //Creamos productos en nuestro archivo products.json
manager.addProducts({
                title: "Notebook",
                description: "Apple",
                price: 2100,
                thumbnail: "Gris",
                code: "n5",
                stock: 4
})


manager.getProducts().then(products=>console.log(products)) //consultamos los productos del archivo products.json 
//Cuando llamas a una función asincrónica sin await o .then, la promesa se ejecuta, pero no se espera su resultado, por lo que no se muestra nada en la consola.
//Por eso la llamamos con un .then.


manager.getProductById(3).then(p=>console.log(p))  

manager.deleteProduct(6) */