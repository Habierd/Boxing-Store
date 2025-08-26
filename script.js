document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS DE EJEMPLO ---
    // En un proyecto real, esto vendría de una base de datos.
    const products = [
        { id: 1, name: 'Guantes de Boxeo Pro', price: 89, image: 'https://via.placeholder.com/300x300.png/a84232/ffffff?text=Guantes' },
        { id: 2, name: 'Saco de Boxeo de Cuero', price: 150, image: 'https://via.placeholder.com/300x300.png/1a1a1a/ffffff?text=Saco' },
        { id: 3, name: 'Vendas de Algodón (Par)', price: 15, image: 'https://via.placeholder.com/300x300.png/d4c5a3/000000?text=Vendas' },
        { id: 4, name: 'Zapatillas de Boxeo Ligeras', price: 120, image: 'https://via.placeholder.com/300x300.png/a84232/ffffff?text=Zapatillas' },
        { id: 5, name: 'Cuerda para Saltar de Velocidad', price: 25, image: 'https://via.placeholder.com/300x300.png/1a1a1a/ffffff?text=Cuerda' },
        { id: 6, name: 'Protector Bucal Profesional', price: 20, image: 'https://via.placeholder.com/300x300.png/d4c5a3/000000?text=Protector' }
    ];

    // --- VARIABLES Y ELEMENTOS DEL DOM ---
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productGrid = document.getElementById('product-grid');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close-button');
    const cartIcon = document.getElementById('cart-icon');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // --- FUNCIONES ---

    /**
     * Carga y muestra los productos en la página.
     */
    function renderProducts() {
        productGrid.innerHTML = ''; // Limpiar la grilla antes de renderizar
        products.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="product-price">$${product.price}</p>
                        <button class="add-to-cart-btn" data-id="${product.id}">Añadir al Carrito</button>
                    </div>
                </div>
            `;
            productGrid.innerHTML += productCard;
        });
    }

    /**
     * Añade un producto al carrito.
     * @param {number} productId - El ID del producto a añadir.
     */
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        saveCart();
        updateCartUI();
    }
    
    /**
     * Elimina un producto del carrito.
     * @param {number} productId - El ID del producto a eliminar.
     */
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
    }

    /**
     * Guarda el estado actual del carrito en localStorage.
     */
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    /**
     * Actualiza toda la interfaz de usuario relacionada con el carrito.
     */
    function updateCartUI() {
        updateCartCount();
        updateCartModal();
    }
    
    /**
     * Actualiza el contador de ítems en el ícono del carrito.
     */
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    /**
     * Actualiza el contenido del modal del carrito.
     */
    function updateCartModal() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
            cartTotal.textContent = '0';
            return;
        }

        let total = 0;
        cart.forEach(item => {
            const itemElement = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <strong>${item.name}</strong>
                        <p>Cantidad: ${item.quantity} | Precio: $${item.price * item.quantity}</p>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">&times;</button>
                </div>
            `;
            cartItemsContainer.innerHTML += itemElement;
            total += item.price * item.quantity;
        });

        cartTotal.textContent = total;
    }

    // --- EVENT LISTENERS ---

    // Abrir y cerrar el modal
    cartIcon.addEventListener('click', () => cartModal.style.display = 'block');
    closeModal.addEventListener('click', () => cartModal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Añadir y eliminar productos del carrito
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            addToCart(productId);
        }
        
        if (event.target.classList.contains('remove-item-btn')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            removeFromCart(productId);
        }
    });

    // --- INICIALIZACIÓN ---
    renderProducts();
    updateCartUI();
});