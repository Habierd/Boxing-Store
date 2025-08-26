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

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // ... (resto de selectores del DOM sin cambios) ...
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

    function renderProducts() { /* ... sin cambios ... */ }

    // --- FUNCIÓN DE MODAL DE PRODUCTO (TOTALMENTE REESCRITA) ---
    function openProductDetailModal(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Poblar información de texto
        modalProductBrand.textContent = product.brand;
        modalProductName.textContent = product.name;
        modalProductPrice.textContent = `$${product.price}`;
        modalProductLongDescription.textContent = product.longDescription;
        modalAddToCartBtn.dataset.id = product.id;
        
        // Poblar especificaciones
        modalProductSpecs.innerHTML = `
            <li><strong>Tallas Disponibles:</strong> <span>${product.sizes}</span></li>
            <li><strong>Colores:</strong> <span>${product.colors}</span></li>
            <li><strong>Material:</strong> <span>${product.material}</span></li>
            <li><strong>Uso Recomendado:</strong> <span>${product.type}</span></li>
        `;

        // Poblar galería de imágenes
        modalProductMainImage.src = product.images[0]; // Cargar imagen principal
        modalProductThumbnails.innerHTML = ''; // Limpiar miniaturas antiguas
        product.images.forEach((imgSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.alt = `Vista ${index + 1} de ${product.name}`;
            thumb.classList.toggle('active', index === 0); // Activar la primera miniatura
            
            // Event listener para cambiar la imagen principal al hacer clic
            thumb.addEventListener('click', () => {
                modalProductMainImage.src = imgSrc;
                // Actualizar la clase 'active' en las miniaturas
                document.querySelectorAll('.thumbnail-container img').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            modalProductThumbnails.appendChild(thumb);
        });
        
        productDetailModal.style.display = 'block';
    }

    // --- OTRAS FUNCIONES Y EVENT LISTENERS (sin cambios significativos) ---
    // ... (El resto del código JavaScript de la respuesta anterior funciona igual) ...
    // Asegúrate de copiar el resto de las funciones (addToCart, removeFromCart, etc.)
    // y los event listeners del script anterior para mantener la funcionalidad del carrito.

});