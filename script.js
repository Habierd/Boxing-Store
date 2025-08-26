document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS DE PRODUCTOS ---
    // ¡IMPORTANTE! Reemplaza estos datos con los de tus 13 productos.
    const products = [
        { id: 1, name: 'Guantes de Cuero "Legacy"', price: 110, image: '1.jpg', description: 'Fabricados con cuero genuino de la más alta calidad, estos guantes ofrecen una durabilidad excepcional y un ajuste perfecto. Ideales para entrenamiento intensivo y sparring.' },
        { id: 2, name: 'Guantes de MMA "Striker Pro"', price: 75, image: '2.jpg', description: 'Diseño de palma abierta para un agarre superior en grappling, con acolchado de gel en los nudillos para una protección óptima al golpear. Perfectos para el luchador de MMA moderno.' },
        { id: 3, name: 'Guantes de Entrenamiento "Rival"', price: 85, image: '3.jpg', description: 'Un guante versátil y fiable para el trabajo diario en el gimnasio. Su sistema de cierre de velcro de doble vuelta garantiza una sujeción inmejorable en la muñeca.' },
        { id: 4, name: 'Venum Contender 1.5 Boxing Gloves', price: 150, image: '4.jpg', description: 'Certificados para competición amateur. Construidos pFabricados con piel sintética de alta calidad y acolchado de espuma multidensidad para ofrecer una durabilidad y protección superiores en cada golpe. Su correa de velcro de ajuste seguro proporciona un soporte óptimo para la muñeca, mientras que su diseño ligero permite movimientos rápidos y precisos. Disponibles en varios tamaños y colores para adaptarse a tu estilo.ara ofrecer la máxima protección y un peso oficial preciso. El guante de los campeones.' },
        { id: 5, name: 'Guantes de Piel Sintética "Endurance"', price: 55, image: '5.jpg', description: 'Excelente opción para principiantes o para entrenamiento ligero. La piel sintética de alta ingeniería resiste el desgaste y es fácil de limpiar.' },
        { id: 6, name: 'Guantes de Saco "Heavy Hitter"', price: 60, image: '6.jpg', description: 'Acolchado denso diseñado específicamente para absorber el impacto en el saco pesado y los pads. Protege tus manos sesión tras sesión.' },
        { id: 7, name: 'Guantes Femeninos "Valkyrie"', price: 90, image: '7.jpg', description: 'Diseñados ergonómicamente para un ajuste más ceñido y cómodo en manos más pequeñas, sin sacrificar la protección ni la calidad.' },
        { id: 8, name: 'Guantes de MMA Híbridos', price: 80, image: '8.jpg', description: 'Lo mejor de dos mundos: el acolchado de un guante de boxeo con la flexibilidad de un guante de grappling. Ideal para entrenamientos de MMA completos.' },
        { id: 9, name: 'Guantes Clásicos "Old School"', price: 130, image: '9.jpg', description: 'Un tributo a la era dorada del boxeo. Confeccionados con cordones tradicionales para un ajuste profesional y una sensación inigualable.' },
        { id: 10, name: 'Guantes de Gel "Impact"', price: 95, image: '10.jpg', description: 'Capa de gel disipadora de impactos sobre un acolchado de espuma multicapa. La máxima protección para tus nudillos durante largas sesiones de sparring.' },
        { id: 11, name: 'Guantes Ligeros "Aero Speed"', price: 70, image: '11.jpg', description: 'Diseñados para la velocidad y la precisión. Perfectos para el trabajo de manoplas y el entrenamiento de reflejos. Siente cada golpe.' },
        { id: 12, name: 'Guantes de Muay Thai "Tiger"', price: 115, image: '12.jpg', description: 'Con un perfil de guante más distribuido y una mayor flexibilidad en la muñeca, son ideales para el clinch y el bloqueo de patadas en el Muay Thai.' },
        { id: 13, name: 'Guantes Edición Limitada "1971"', price: 190, image: '13.jpg', description: 'Nuestra pieza de coleccionista. Cuero premium, detalles hechos a mano y un diseño exclusivo para celebrar nuestra herencia. Unidades limitadas.' }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productGrid = document.getElementById('product-grid');
    const cartCount = document.getElementById('cart-count');
    
    // Elementos del Modal del Carrito
    const cartModal = document.getElementById('cart-modal');
    const closeCartModal = document.getElementById('close-cart-modal');
    const cartIcon = document.getElementById('cart-icon');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartView = document.getElementById('cart-view');
    const paymentView = document.getElementById('payment-view');
    const checkoutBtn = document.getElementById('checkout-btn');
    const backToCartBtn = document.getElementById('back-to-cart-btn');
    const paymentTotal = document.getElementById('payment-total');

    // NUEVO: Elementos del Modal de Detalles del Producto
    const productDetailModal = document.getElementById('product-detail-modal');
    const closeProductModal = document.getElementById('close-product-modal');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductImage = document.getElementById('modal-product-image');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalProductDescription = document.getElementById('modal-product-description');
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');


    // --- FUNCIONES ---

    function renderProducts() {
        productGrid.innerHTML = ''; 
        products.forEach(product => {
            const productCardHTML = `
                <div class="product-card">
                    <div class="product-clickable-area" data-id="${product.id}">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p class="product-price">$${product.price}</p>
                        </div>
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">Añadir al Carrito</button>
                </div>
            `;
            productGrid.innerHTML += productCardHTML;
        });
    }

    // NUEVO: Función para abrir el modal de detalles
    function openProductDetailModal(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        modalProductName.textContent = product.name;
        modalProductImage.src = product.image;
        modalProductPrice.textContent = `$${product.price}`;
        modalProductDescription.textContent = product.description;
        modalAddToCartBtn.dataset.id = product.id; // Asignar el id al botón del modal
        
        productDetailModal.style.display = 'block';
    }

    // Funciones del Carrito (sin cambios, excepto una pequeña adición)
    function addToCart(productId) {
        const product = products.find(p => p.id === parseInt(productId));
        const cartItem = cart.find(item => item.id === parseInt(productId));

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        saveCart();
        updateCartUI();
    }
    
    function removeFromCart(productId) { /* ... sin cambios ... */ cart = cart.filter(item => item.id !== productId); saveCart(); updateCartUI(); }
    function saveCart() { /* ... sin cambios ... */ localStorage.setItem('cart', JSON.stringify(cart)); }
    function updateCartUI() { /* ... sin cambios ... */ updateCartCount(); updateCartModal(); }
    function updateCartCount() { /* ... sin cambios ... */ const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); cartCount.textContent = totalItems; }
    function updateCartModal() { /* ... sin cambios ... */ cartItemsContainer.innerHTML = ''; if (cart.length === 0) { cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>'; cartTotal.textContent = '0.00'; checkoutBtn.disabled = true; checkoutBtn.style.opacity = '0.5'; return; } checkoutBtn.disabled = false; checkoutBtn.style.opacity = '1'; let total = 0; cart.forEach(item => { const itemElement = `<div class="cart-item"><img src="${item.image}" alt="${item.name}"><div class="cart-item-info"><strong>${item.name}</strong><p>Cantidad: ${item.quantity} | Subtotal: $${(item.price * item.quantity).toFixed(2)}</p></div><button class="remove-item-btn" data-id="${item.id}">&times;</button></div>`; cartItemsContainer.innerHTML += itemElement; total += item.price * item.quantity; }); cartTotal.textContent = total.toFixed(2); paymentTotal.textContent = total.toFixed(2); }

    // --- EVENT LISTENERS ---

    // Event Listeners para Modales (Carrito y Producto)
    cartIcon.addEventListener('click', () => { cartView.classList.remove('hidden'); paymentView.classList.add('hidden'); cartModal.style.display = 'block'; });
    closeCartModal.addEventListener('click', () => cartModal.style.display = 'none');
    
    // NUEVO: Listeners para el modal de detalles
    closeProductModal.addEventListener('click', () => productDetailModal.style.display = 'none');
    modalAddToCartBtn.addEventListener('click', (event) => {
        const productId = event.target.dataset.id;
        addToCart(productId);
        productDetailModal.style.display = 'none'; // Opcional: cierra el modal al añadir
    });

    window.addEventListener('click', (event) => {
        if (event.target == cartModal) cartModal.style.display = 'none';
        if (event.target == productDetailModal) productDetailModal.style.display = 'none'; // NUEVO
    });

    // Delegación de eventos para los botones de la página
    document.body.addEventListener('click', (event) => {
        const target = event.target;
        // Click en el área de producto para ver detalles
        if (target.closest('.product-clickable-area')) {
            const productId = parseInt(target.closest('.product-clickable-area').dataset.id);
            openProductDetailModal(productId);
        }
        // Click en el botón "Añadir al Carrito" de la tarjeta
        else if (target.classList.contains('add-to-cart-btn') && !target.id.includes('modal')) {
            const productId = parseInt(target.dataset.id);
            addToCart(productId);
        }
        // Click en el botón de eliminar del carrito
        else if (target.classList.contains('remove-item-btn')) {
            const productId = parseInt(target.dataset.id);
            removeFromCart(productId);
        }
    });
    
    // Listeners para cambio de vista en el modal del carrito
    checkoutBtn.addEventListener('click', () => { cartView.classList.add('hidden'); paymentView.classList.remove('hidden'); });
    backToCartBtn.addEventListener('click', () => { paymentView.classList.add('hidden'); cartView.classList.remove('hidden'); });

    // --- INICIALIZACIÓN ---
    renderProducts();
    updateCartUI();
});