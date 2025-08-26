document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS DE PRODUCTOS (ESTRUCTURA AMPLIADA) ---
    // ¡IMPORTANTE! Rellena estos datos con los de tus 13 productos reales.
    const products = [
        { 
            id: 1, 
            name: 'Guantes de Cuero "Legacy"', 
            price: 110, 
            brand: 'Boxing Store 1971',
            type: 'Sparring / Entrenamiento',
            material: 'Cuero Genuino',
            sizes: '12oz, 14oz, 16oz',
            colors: 'Negro Clásico, Rojo Intenso',
            images: ['1-main.jpg', '1-thumb1.jpg', '1-thumb2.jpg'],
            longDescription: 'Fabricados con cuero genuino de la más alta calidad, estos guantes ofrecen una durabilidad excepcional y un ajuste perfecto que se amolda a tu mano con el tiempo. El acolchado de espuma multicapa proporciona una absorción de impactos superior, protegiendo tus manos y a tu compañero de sparring. Ideales para entrenamiento intensivo y sesiones de sparring exigentes.' 
        },
        { 
            id: 2, 
            name: 'Guantes de MMA "Striker Pro"', 
            price: 75, 
            brand: 'StrikeForce Gear',
            type: 'MMA / Grappling',
            material: 'Piel Sintética Reforzada',
            sizes: 'S/M, L/XL',
            colors: 'Negro/Blanco',
            images: ['2-main.jpg', '2-thumb1.jpg'],
            longDescription: 'Diseño de palma abierta para un agarre superior en grappling, con acolchado de gel en los nudillos para una protección óptima al golpear. Su construcción ligera y ergonómica permite una transición fluida entre el golpeo y la lucha. Perfectos para el luchador de MMA moderno que exige versatilidad y rendimiento.'
        },
        // ...Añade aquí tus otros 11 productos siguiendo la misma estructura...
        {
            id: 13,
            name: 'Guantes Edición Limitada "1971"',
            price: 190,
            brand: 'Boxing Store 1971',
            type: 'Colección / Competición',
            material: 'Cuero Premium Tratado',
            sizes: '16oz',
            colors: 'Marrón Vintage',
            images: ['13-main.jpg', '13-thumb1.jpg', '13-thumb2.jpg'],
            longDescription: 'Nuestra pieza de coleccionista. Cuero premium seleccionado a mano, detalles artesanales y un diseño exclusivo para celebrar nuestra herencia. El sistema de cierre con cordones asegura un ajuste perfecto y profesional. Producidos en unidades limitadas, estos guantes no son solo equipamiento, son una declaración.'
        }
    ];

    // --- SELECTORES DEL DOM ---
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productGrid = document.getElementById('product-grid');
    const cartCount = document.getElementById('cart-count');
    
    // Elementos del Modal del Carrito
    const cartModal = document.getElementById('cart-modal');
    const closeCartModal = document.querySelector('#cart-modal .close-button'); // Selector más específico
    const cartIcon = document.getElementById('cart-icon');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartView = document.getElementById('cart-view');
    const paymentView = document.getElementById('payment-view');
    const checkoutBtn = document.getElementById('checkout-btn');
    const backToCartBtn = document.getElementById('back-to-cart-btn');
    const paymentTotal = document.getElementById('payment-total');

    // Elementos del Modal de Detalles del Producto
    const productDetailModal = document.getElementById('product-detail-modal');
    const closeProductModal = document.getElementById('close-product-modal');
    const modalProductBrand = document.getElementById('modal-product-brand');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductMainImage = document.getElementById('modal-product-main-image');
    const modalProductThumbnails = document.getElementById('modal-product-thumbnails');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalProductSpecs = document.getElementById('modal-product-specs');
    const modalProductLongDescription = document.getElementById('modal-product-long-description');
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');

    // --- FUNCIONES ---

    function renderProducts() {
        productGrid.innerHTML = ''; 
        products.forEach(product => {
            const productCardHTML = `
                <div class="product-card">
                    <div class="product-clickable-area" data-id="${product.id}">
                        <img src="${product.images[0]}" alt="${product.name}">
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

    function openProductDetailModal(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        modalProductBrand.textContent = product.brand;
        modalProductName.textContent = product.name;
        modalProductPrice.textContent = `$${product.price}`;
        modalProductLongDescription.textContent = product.longDescription;
        modalAddToCartBtn.dataset.id = product.id;
        
        modalProductSpecs.innerHTML = `
            <li><strong>Tallas Disponibles:</strong> <span>${product.sizes}</span></li>
            <li><strong>Colores:</strong> <span>${product.colors}</span></li>
            <li><strong>Material:</strong> <span>${product.material}</span></li>
            <li><strong>Uso Recomendado:</strong> <span>${product.type}</span></li>
        `;

        modalProductMainImage.src = product.images[0];
        modalProductThumbnails.innerHTML = '';
        product.images.forEach((imgSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.alt = `Vista ${index + 1} de ${product.name}`;
            thumb.classList.toggle('active', index === 0);
            
            thumb.addEventListener('click', () => {
                modalProductMainImage.src = imgSrc;
                document.querySelectorAll('.thumbnail-container img').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            modalProductThumbnails.appendChild(thumb);
        });
        
        productDetailModal.style.display = 'block';
    }

    // --- Funciones del Carrito ---
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
    
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartUI() {
        updateCartCount();
        if (cartModal.style.display === 'block') {
            updateCartModal();
        }
    }
    
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    function updateCartModal() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="color: var(--color-texto-secundario);">Tu carrito está vacío.</p>';
            cartTotal.textContent = '0.00';
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = '0.5';
            return;
        }
        
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '1';

        let total = 0;
        cart.forEach(item => {
            const itemElement = `
                <div class="cart-item">
                    <img src="${item.images[0]}" alt="${item.name}">
                    <div class="cart-item-info">
                        <strong>${item.name}</strong>
                        <p>Cantidad: ${item.quantity} | Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">&times;</button>
                </div>
            `;
            cartItemsContainer.innerHTML += itemElement;
            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
        paymentTotal.textContent = total.toFixed(2);
    }

    // --- EVENT LISTENERS ---
    cartIcon.addEventListener('click', () => {
        cartView.classList.remove('hidden');
        paymentView.classList.add('hidden');
        updateCartModal(); // Actualizar contenido al abrir
        cartModal.style.display = 'block';
    });

    closeCartModal.addEventListener('click', () => cartModal.style.display = 'none');
    closeProductModal.addEventListener('click', () => productDetailModal.style.display = 'none');
    
    modalAddToCartBtn.addEventListener('click', (event) => {
        const productId = event.target.dataset.id;
        addToCart(productId);
        productDetailModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == cartModal) cartModal.style.display = 'none';
        if (event.target == productDetailModal) productDetailModal.style.display = 'none';
    });

    document.body.addEventListener('click', (event) => {
        const clickableArea = event.target.closest('.product-clickable-area');
        if (clickableArea) {
            const productId = parseInt(clickableArea.dataset.id);
            openProductDetailModal(productId);
        }

        const addToCartBtn = event.target.closest('.add-to-cart-btn');
        if (addToCartBtn && !addToCartBtn.id.includes('modal')) {
            const productId = parseInt(addToCartBtn.dataset.id);
            addToCart(productId);
        }

        const removeItemBtn = event.target.closest('.remove-item-btn');
        if (removeItemBtn) {
            const productId = parseInt(removeItemBtn.dataset.id);
            removeFromCart(productId);
        }
    });
    
    checkoutBtn.addEventListener('click', () => {
        cartView.classList.add('hidden');
        paymentView.classList.remove('hidden');
    });

    backToCartBtn.addEventListener('click', () => {
        paymentView.classList.add('hidden');
        cartView.classList.remove('hidden');
    });

    // --- INICIALIZACIÓN ---
    renderProducts();
    updateCartUI();

});