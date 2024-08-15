const socket = io();
//Cuando se agrega un nuevo producto
document.getElementById("formProducts").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;

  socket.emit("newProduct", { title, description, price, thumbnail, code, stock }); //es la data (nuevo producto) que se envia al servidor

  //limpio el formulario
  document.getElementById("formProducts").reset();
});

// Recibir lista de productos actualizada desde el servidor

socket.on("updateProductList", (products) => {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.textContent = `Id: ${product.id} - Title: ${product.title} - Description: ${product.description} - Price: ${product.price} - Code: ${product.code} - Stock: ${product.stock}`;
    productList.appendChild(productItem);
  });
});

//Cuando se elimina un producto
document.getElementById("formDelete").addEventListener("submit", (e)=>{
    e.preventDefault();
    const idDelete = parseInt(document.getElementById("idDelete").value)

    if (isNaN(idDelete)) {
        alert("Por favor ingrese un ID válido");
        return;
      }
    
    socket.emit("deleteProduct", idDelete) // Se lo envio al servidor

    //limpio el formulario

    document.getElementById("formDelete").reset()
})



// Solicitar la lista de productos cuando el cliente se conecta
socket.emit("requestProductList");


