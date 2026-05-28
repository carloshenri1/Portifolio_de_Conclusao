// Base de dados simulada de produtos (Brinquedos)
const products = [
    { id: 1, name: "Ursinho Pelúcia", price: 79.90, emoji: "🧸" },
    { id: 2, name: "Carro de Controle", price: 149.90, emoji: "🏎️" },
    { id: 3, name: "Blocos de Montar", price: 119.90, emoji: "🧱" },
    { id: 4, name: "Foguete Espacial", price: 89.90, emoji: "🚀" },
    { id: 5, name: "Boneca Articulada", price: 95.00, emoji: "🪆" },
    { id: 6, name: "Dinossauro T-Rex", price: 65.40, emoji: "🦖" }
];

// Estado da aplicação (Carrinho)
let cart = [];

const productsGrid = document.getElementById('products-grid');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalValue = document.getElementById('cart-total-value');
const checkoutBtn = document.getElementById('checkout-btn');
const cartSidebar = document.getElementById('cart-sidebar');

// 1. Renderizar os produtos na tela automaticamente
function displayProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <div class="product-emoji">${product.emoji}</div>
            <h3>${product.name}</h3>
            <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        `;
        productsGrid.appendChild(card);
    });
}

// 2. Adicionar item ao carrinho
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity++; // Se já existe, aumenta quantidade
    } else {
        cart.push({ ...product, quantity: 1 }); // Se não existe, adiciona novo objeto
    }

    updateCart();
}

// 3. Atualizar e calcular totais do carrinho
function updateCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Seu carrinho está vazio.</p>';
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.emoji} ${item.name}</h4>
                    <p>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${index})">🗑️</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // Calcular quantidade de ícones e valor total total
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;
    cartTotalValue.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
}

// 4. Mudar quantidade (+ ou -)
function changeQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCart();
    }
}

// 5. Remover item completamente
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// 6. Efeito abrir/fechar carrinho (Útil para Mobile)
function toggleCart() {
    cartSidebar.classList.toggle('open');
}

// 7. Finalizar Compra (Ação do sistema)
function finalizePurchase() {
    alert("🎉 Compra simulada com sucesso! Obrigado por testar o projeto de ADS.");
    cart = [];
    updateCart();
    if(cartSidebar.classList.contains('open')) toggleCart();
}

// Execução Inicial
displayProducts();
updateCart();