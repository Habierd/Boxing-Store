document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS DE PRODUCTOS ---
    const products = [
        { 
            id: 1, 
            name: 'Guantes de Cuero "Legacy"', 
            price: 450000, 
            image: '1.jpg', 
            description: 'Fabricados con cuero genuino de la más alta calidad, estos guantes ofrecen una durabilidad excepcional y un ajuste perfecto. Ideales para entrenamiento intensivo y sparring.',
            color: 'Negro/Rojo',
            size: 'S, M, L, XL',
            weight: '340g'
        },
        { 
            id: 2, 
            name: 'Guantes de MMA "Striker Pro"', 
            price: 310000, 
            image: '2.jpg', 
            description: 'Diseño de palma abierta para un agarre superior en grappling, con acolchado de gel en los nudillos para una protección óptima al golpear. Perfectos para el luchador de MMA moderno.',
            color: 'Negro/Azul',
            size: 'S, M, L',
            weight: '280g'
        },
        { 
            id: 3, 
            name: 'Guantes de Entrenamiento "Rival"', 
            price: 350000, 
            image: '3.jpg', 
            description: 'Un guante versátil y fiable para el trabajo diario en el gimnasio. Su sistema de cierre de velcro de doble vuelta garantiza una sujeción inmejorable en la muñeca.',
            color: 'Rojo/Blanco',
            size: 'M, L, XL',
            weight: '320g'
        },
        { 
            id: 4, 
            name: 'Guantes de Competición "Victory"', 
            price: 620000, 
            image: '4.jpg', 
            description: 'Certificados para competición amateur. Construidos para ofrecer la máxima protección y un peso oficial preciso. El guante de los campeones.',
            color: 'Azul/Oro',
            size: 'M, L',
            weight: '285g'
        },
        { 
            id: 5, 
            name: 'Guantes de Piel Sintética "Endurance"', 
            price: 225000, 
            image: '5.jpg', 
            description: 'Excelente opción para principiantes o para entrenamiento ligero. La piel sintética de alta ingeniería resiste el desgaste y es fácil de limpiar.',
            color: 'Negro/Verde',
            size: 'S, M, L, XL',
            weight: '300g'
        },
        { 
            id: 6, 
            name: 'Guantes de Saco "Heavy Hitter"', 
            price: 245000, 
            image: '6.jpg', 
            description: 'Acolchado denso diseñado específicamente para absorber el impacto en el saco pesado y los pads. Protege tus manos sesión tras sesión.',
            color: 'Marrón/Negro',
            size: 'M, L, XL',
            weight: '360g'
        },
        { 
            id: 7, 
            name: 'Guantes Femeninos "Valkyrie"', 
            price: 370000, 
            image: '7.jpg', 
            description: 'Diseñados ergonómicamente para un ajuste más ceñido y cómodo en manos más pequeñas, sin sacrificar la protección ni la calidad.',
            color: 'Rosa/Blanco',
            size: 'XS, S, M',
            weight: '260g'
        },
        { 
            id: 8, 
            name: 'Guantes de MMA Híbridos', 
            price: 330000, 
            image: '8.jpg', 
            description: 'Lo mejor de dos mundos: el acolchado de un guante de boxeo con la flexibilidad de un guante de grappling. Ideal para entrenamientos de MMA completos.',
            color: 'Gris/Naranja',
            size: 'S, M, L, XL',
            weight: '290g'
        },
        { 
            id: 9, 
            name: 'Guantes Clásicos "Old School"', 
            price: 535000, 
            image: '9.jpg', 
            description: 'Un tributo a la era dorada del boxeo. Confeccionados con cordones tradicionales para un ajuste profesional y una sensación inigualable.',
            color: 'Blanco/Dorado',
            size: 'M, L, XL',
            weight: '315g'
        },
        { 
            id: 10, 
            name: 'Guantes de Gel "Impact"', 
            price: 390000, 
            image: '10.jpg', 
            description: 'Capa de gel disipadora de impactos sobre un acolchado de espuma multicapa. La máxima protección para tus nudillos durante largas sesiones de sparring.',
            color: 'Negro/Plata',
            size: 'S, M, L, XL',
            weight: '350g'
        },
        { 
            id: 11, 
            name: 'Guantes Ligeros "Aero Speed"', 
            price: 285000, 
            image: '11.jpg', 
            description: 'Diseñados para la velocidad y la precisión. Perfectos para el trabajo de manoplas y el entrenamiento de reflejos. Siente cada golpe.',
            color: 'Azul/Blanco',
            size: 'S, M, L',
            weight: '240g'
        },
        { 
            id: 12, 
            name: 'Guantes de Muay Thai "Tiger"', 
            price: 475000, 
            image: '12.jpg', 
            description: 'Con un perfil de guante más distribuido y una mayor flexibilidad en la muñeca, son ideales para el clinch y el bloqueo de patadas en el Muay Thai.',
            color: 'Amarillo/Negro',
            size: 'M, L, XL',
            weight: '330g'
        },
        { 
            id: 13, 
            name: 'Guantes Edición Limitada "1971"', 
            price: 780000, 
            image: '13.jpg', 
            description: 'Nuestra pieza de coleccionista. Cuero premium, detalles hechos a mano y un diseño exclusivo para celebrar nuestra herencia. Unidades limitadas.',
            color: 'Oro/Negro',
            size: 'M, L',
            weight: '325g'
        }
    ];

    // --- VARIABLES GLOBALES ---
    let cart = [];
    
    // Elementos del DOM
    const productGrid = document.getElementById('product-grid');
    const cartCount = document.getElementById('cart-count');
    const themeToggle = document.getElementById('theme-toggle');
    
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

    // Elementos del Modal de Detalles del Producto
    const productDetailModal = document.getElementById('product-detail-modal');
    const closeProductModal = document.getElementById('close-product-modal');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductImage = document.getElementById('modal-product-image');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalProductDescription = document.getElementById('modal-product-description');
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');

    // --- FUNCIONES DE TEMA OSCURO ---
    function initializeTheme() {
        // Verificar si hay una preferencia guardada
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Aplicar tema guardado o preferencia del sistema
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Añadir una pequeña animación al botón
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    }

    // --- FUNCIONES DE UTILIDAD ---
    function formatPrice(price) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    }

    // --- FUNCIONES DE PRODUCTOS ---
    function renderProducts() {
        productGrid.innerHTML = ''; 
        products.forEach(product => {
            const productCardHTML = `
                <div class="product-card">
                    <div class="product-clickable-area" data-id="${product.id}">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p class="product-price">${formatPrice(product.price)}</p>
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

        modalProductName.textContent = product.name;
        modalProductImage.src = product.image;
        modalProductImage.alt = product.name;
        modalProductPrice.textContent = formatPrice(product.price);
        modalProductDescription.textContent = product.description;
        
        // Actualizar información de especificaciones
        document.getElementById('modal-product-color').textContent = product.color;
        document.getElementById('modal-product-size').textContent = product.size;
        document.getElementById('modal-product-weight').textContent = product.weight;
        
        modalAddToCartBtn.dataset.id = product.id;
        
        productDetailModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // --- FUNCIONES DEL CARRITO ---
    function initializeCart() {
        // Intentar cargar carrito del localStorage
        try {
            const savedCart = localStorage.getItem('cart');
            cart = savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.warn('Error loading cart from localStorage:', error);
            cart = [];
        }
        updateCartUI();
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === parseInt(productId));
        if (!product) return;

        const cartItem = cart.find(item => item.id === parseInt(productId));

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        saveCart();
        updateCartUI();
        
        // Mostrar feedback visual
        showAddToCartFeedback();
    }
    
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
    }
    
    function saveCart() {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.warn('Error saving cart to localStorage:', error);
        }
    }
    
    function updateCartUI() {
        updateCartCount();
        updateCartModal();
    }
    
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Añadir animación cuando cambia el contador
        if (totalItems > 0) {
            cartCount.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    function updateCartModal() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
            cartTotal.textContent = formatPrice(0);
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = '0.5';
            return;
        }
        
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '1';
        
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="cart-item-info">
                    <strong>${item.name}</strong>
                    <p>Cantidad: ${item.quantity} | Subtotal: ${formatPrice(item.price * item.quantity)}</p>
                </div>
                <button class="remove-item-btn" data-id="${item.id}" title="Eliminar producto">&times;</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        
        cartTotal.textContent = formatPrice(total);
        paymentTotal.textContent = formatPrice(total);
    }

    function showAddToCartFeedback() {
        // Pequeña animación en el icono del carrito
        const cartIcon = document.getElementById('cart-icon');
        cartIcon.style.transform = 'scale(1.1)';
        cartIcon.style.color = 'var(--color-rojo-oxido)';
        
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
            cartIcon.style.color = '';
        }, 300);
    }

    // --- NAVEGACIÓN ENTRE SECCIONES ---
    function showSection(sectionId) {
        // Ocultar todas las secciones
        document.querySelectorAll('.content-section, #products').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Mostrar la sección seleccionada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
        
        // Actualizar navegación activa
        document.querySelectorAll('.main-header nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // --- EVENT LISTENERS ---

    // Navegación entre secciones
    document.querySelectorAll('.main-header nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
            
            // Scroll suave hacia arriba
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Tema oscuro
    themeToggle.addEventListener('click', toggleTheme);

    // Modales
    cartIcon.addEventListener('click', () => {
        cartView.classList.remove('hidden');
        paymentView.classList.add('hidden');
        cartModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    closeCartModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    closeProductModal.addEventListener('click', () => {
        productDetailModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    modalAddToCartBtn.addEventListener('click', (event) => {
        const productId = event.target.dataset.id;
        addToCart(productId);
        productDetailModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
            document.body.style.overflow = '';
        }
        if (event.target === productDetailModal) {
            productDetailModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Cerrar modales con la tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (cartModal.style.display === 'block') {
                cartModal.style.display = 'none';
                document.body.style.overflow = '';
            }
            if (productDetailModal.style.display === 'block') {
                productDetailModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        }
    });

    // Delegación de eventos para botones dinámicos
    document.body.addEventListener('click', (event) => {
        const target = event.target;
        
        // Click en el área de producto para ver detalles
        if (target.closest('.product-clickable-area')) {
            const productId = parseInt(target.closest('.product-clickable-area').dataset.id);
            openProductDetailModal(productId);
        }
        // Click en botón "Añadir al Carrito" de la tarjeta de producto
        else if (target.classList.contains('add-to-cart-btn') && !target.id.includes('modal')) {
            const productId = parseInt(target.dataset.id);
            addToCart(productId);
        }
        // Click en botón de eliminar del carrito
        else if (target.classList.contains('remove-item-btn')) {
            const productId = parseInt(target.dataset.id);
            removeFromCart(productId);
        }
    });
    
    // Navegación del carrito
    checkoutBtn.addEventListener('click', () => {
        cartView.classList.add('hidden');
        paymentView.classList.remove('hidden');
    });

    backToCartBtn.addEventListener('click', () => {
        paymentView.classList.add('hidden');
        cartView.classList.remove('hidden');
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- INICIALIZACIÓN ---
    initializeTheme();
    initializeCart();
    renderProducts();

    // Lazy loading para imágenes (si el navegador no lo soporta nativamente)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        // Observar imágenes lazy
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    console.log('Boxing Store 1971 - Página cargada correctamente ✨');
});