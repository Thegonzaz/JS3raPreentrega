let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

class Productos {
    // Filtrado para buscar un producto por su nombre en el carrito
    static buscarProductoPorNombre(nombre, carrito) {
        return carrito.find(producto => producto.nombre === nombre);
    }

    // Filtrado de productos por precio máximo en el carrito
    static filtrarProductosPorPrecioMaximo(precioMaximo, carrito) {
        return carrito.filter(producto => producto.precio <= precioMaximo);
    }
}


// Función para agregar un producto al carrito
document.getElementById('agregarProducto').onclick = function agregarProducto() {
    const nombre = prompt("Ingrese el nombre del producto:");
    const precio = parseFloat(prompt("Ingrese el precio del producto:"));

    // Crea objeto producto
    const producto = {
        nombre: nombre,
        precio: precio,
    };

    // Agrega producto al carrito
    carrito.push(producto);

    // Muestra el producto en el DOM
    const productList = document.getElementById("lista-productos");
    const listItem = document.createElement("li");
    listItem.textContent = `Nombre: ${nombre}, Precio: $${precio.toFixed(2)}`;
    productList.appendChild(listItem);

    // Guarda el carrito en el Storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para buscar un producto en el carrito
document.getElementById('buscarProducto').onclick = function buscarProducto() {
    const nombre = prompt("Ingrese el nombre del producto a buscar:");

    const productoEncontrado = Productos.buscarProductoPorNombre(nombre, carrito);

    if (productoEncontrado) {
        alert(`El producto "${nombre}" se encuentra en el carrito.`);
    } else {
        alert(`El producto "${nombre}" no se encuentra en el carrito.`);
    }
}

// Función para filtrar productos por precio máximo en el carrito
document.getElementById('filtrarProductos').onclick = function filtrarProductos() {
    const precioMaximo = parseFloat(prompt("Ingrese el precio máximo para filtrar productos:"));

    const productosFiltrados = Productos.filtrarProductosPorPrecioMaximo(precioMaximo, carrito);

    if (productosFiltrados.length > 0) {
        console.log(`Productos con precio máximo de $${precioMaximo}:`);
        productosFiltrados.forEach(producto => console.log(`- ${producto.nombre}: $${producto.precio.toFixed(2)}`));
    } else {
        console.log(`No se encontraron productos con precio máximo de $${precioMaximo}.`);
    }
}

// Función para calcular el valor total de los productos en el carrito
document.getElementById('calcularValorCarrito').onclick = function calcularValorCarrito() {
    const total = carrito.reduce((accum, producto) => accum + producto.precio, 0);
    document.getElementById("valor-total").textContent = total.toFixed(2);
}

// Función para finalizar la compra
document.getElementById('finalizarCompra').onclick = function finalizarCompra() {
    alert("¡Compra finalizada! Gracias por su compra.");
    carrito.length = 0; // Vaciar el carrito
    localStorage.removeItem("carrito"); // Eliminar el carrito del Storage
    document.getElementById("lista-productos").innerHTML = ""; // Limpiar la lista de productos en el DOM
    document.getElementById("valor-total").textContent = "0"; // Reiniciar el valor total
}