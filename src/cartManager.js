import fs from "fs"

export class CartManager{
    constructor(path){
        this.path=path
        this.carts=[]
    }

    async loadCarts() {
        try {
            const fileExist = await fs.promises.access(this.path)
                    .then(() => true)
                    .catch(() => false);

            if (fileExist) {
                const data = await fs.promises.readFile(this.path, "utf8");
                this.carts = JSON.parse(data);
            } else {
                await this.writeCarts();
            }
        } catch (error) {
            console.error('Error al cargar los carritos', error);
            this.carts= [];
        }
    }
    
    async writeCarts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error("Error al guardar carritos", error);
        }
    }

    async createCart(){
        await this.loadCarts()
        const newCart = {
            id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
            products: []
        }
        this.carts.push(newCart)
        await this.writeCarts()
        return newCart
    }

    async getCartById(id) {
        await this.loadCarts();
        return this.carts.find(cart => cart.id === id);
    }

    async addProductToCart(cartId, productId){
        await this.loadCarts()
        const cart = this.carts.find(cart => cart.id === cartId)
        if(!cart){
            throw new Error("Carrito no encontrado");
        }
        const existingProduct = cart.products.find(p => p.product === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }
        await this.writeCarts();
    }
}