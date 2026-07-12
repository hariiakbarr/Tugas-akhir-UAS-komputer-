// 1. DATA PRODUK (Minimal 8-10 Produk sesuai instruksi dosen) produknya:
const PROD_DATA = [
    { id: 1, name: "Gayo Aceh Arabica", category: "biji-kopi", price: 95000, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400", desc: "Biji kopi Arabika Gayo pilihan dengan tingkat keasaman sedang dan aroma rempah yang khas." },
    { id: 2, name: "Toraja Sapan Premium", category: "biji-kopi", price: 110000, img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=400", desc: "Kopi Toraja dengan cita rasa tebal (full body) dan sentuhan akhir rasa cokelat manis." },
    { id: 3, name: "Kintamani Bali Fruity", category: "biji-kopi", price: 85000, img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400", desc: "Cita rasa unik Arabika Bali dengan rasa segar jeruk alami (fruity notes)." },
    { id: 4, name: "Java Preanger Exotic", category: "biji-kopi", price: 90000, img: "java.jpg", desc: "Kopi klasik tanah Jawa dengan aroma bunga yang memikat dan rasa manis seimbang." },
    { id: 5, name: "V60 Dripper Kaca 02", category: "alat-seduh", price: 145000, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400", desc: "Alat seduh V60 bahan kaca tebal tahan panas untuk ekstraksi kopi yang jernih." },
    { id: 6, name: "Gooseneck Kettle 600ml", category: "alat-seduh", price: 210000, img: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=400", desc: "Teko leher angsa dengan termometer analog untuk kontrol aliran air yang presisi." },
    { id: 7, name: "Hand Grinder Stainless", category: "alat-seduh", price: 185000, img: "hand.jpg", desc: "Penggiling kopi manual dengan burr keramik, bisa diatur tingkat kehalusannya." },
    { id: 8, name: "Kertas Filter V60 (100 pcs)", category: "alat-seduh", price: 45000, img: "kertas.jpg", desc: "Paper filter berkualitas tinggi tanpa pemutih, menjaga rasa asli seduhan kopi Anda." }
];


let cart = JSON.parse(localStorage.getItem('KOPI_CART')) || [];

// 2. ELEMENT SELECTORS
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const cartIconBtn = document.getElementById('cart-icon-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutSection = document.getElementById('checkout-section');
const goToCheckoutBtn = document.getElementById('go-to-checkout');
const checkoutItemsList = document.getElementById('checkout-items-list');
const checkoutTotalAmount = document.getElementById('checkout-total-amount');
const checkoutForm = document.getElementById('checkout-form');

// Modal Elements
const productModal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');
const modalAddToCartBtn = document.getElementById('modal-add-to-cart');
let activeModalProductId = null;


// 3. FUNGSI RENDER (MENAMPILKAN DATA)


// Format angka ke Rupiah
function formatRupiah(angka) {
    return 'Rp ' + angka.toLocaleString('id-ID');
}

// Render Produk ke Grid Utama
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    if(productsToRender.length === 0) {
        productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:var(--gray);">Produk tidak ditemukan...</p>`;
        return;
    }

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}" onclick="openModal(${product.id})">
            <div class="product-info">
                <h3 onclick="openModal(${product.id})">${product.name}</h3>
                <span class="price">${formatRupiah(product.price)}</span>
                <button class="btn-primary" onclick="addToCart(${product.id})">
                    <i class="fas fa-plus"></i> Tambah Keranjang
                </button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Filter & Cari Fungsi Combined
function filterAndSearchProducts() {
    const searchKeyword = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = PROD_DATA.filter(product => {
        const matchSearch = product.name.toLowerCase().includes(searchKeyword);
        const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchSearch && matchCategory;
    });

    renderProducts(filtered);
}

// 4. LOGIKA KERANJANG BELANJA 
function updateCartUI() {
    // Simpan ke localStorage
    localStorage.setItem('KOPI_CART', JSON.stringify(cart));
    
    // Hitung badge jumlah barang
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Render isi sidebar keranjang
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <small>${formatRupiah(item.price)} x ${item.quantity}</small>
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
                <button onclick="changeQuantity(${item.id}, -1)" class="btn-primary" style="padding:2px 8px;">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)" class="btn-primary" style="padding:2px 8px;">+</button>
                <i class="fas fa-trash-alt" onclick="removeFromCart(${item.id})" style="color:#dc3545; cursor:pointer; margin-left:10px;"></i>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartTotalPrice.innerText = formatRupiah(totalPrice);
    checkoutTotalAmount.innerText = formatRupiah(totalPrice);
    
    // Update daftar pesanan di halaman checkout jika sedang terbuka
    renderCheckoutSummary();
}

function addToCart(id) {
    const product = PROD_DATA.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    // Beri efek animasi membuka keranjang agar user tahu produk masuk
    cartSidebar.classList.add('open');
}

function changeQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }
    }
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// 5. MODAL DETAIL PRODUK
function openModal(id) {
    const product = PROD_DATA.find(p => p.id === id);
    activeModalProductId = id;
    
    modalImg.src = product.img;
    modalTitle.innerText = product.name;
    modalCategory.innerText = product.category === 'biji-kopi' ? 'Kategori: Biji Kopi (Beans)' : 'Kategori: Alat Seduh';
    modalPrice.innerText = formatRupiah(product.price);
    modalDesc.innerText = product.desc;
    
    productModal.style.display = 'flex';
}

function closeModal() {
    productModal.style.display = 'none';
}

// 6. SIMULASI CHECKOUT & VALIDASI FORMULIR
function renderCheckoutSummary() {
    checkoutItemsList.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.marginBottom = '10px';
        div.innerHTML = `<span>${item.name} (x${item.quantity})</span> <span>${formatRupiah(item.price * item.quantity)}</span>`;
        checkoutItemsList.appendChild(div);
    });
}

goToCheckoutBtn.addEventListener('click', (e) => {
    if(cart.length === 0) {
        e.preventDefault();
        alert('Keranjang belanja Anda masih kosong!');
        return;
    }
    checkoutSection.classList.remove('hidden');
    cartSidebar.classList.remove('open');
    renderCheckoutSummary();
});

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah reload halaman bawaan form
    
    // Mengambil data form untuk validasi
    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const payment = document.getElementById('payment-method').value;

    if(!nama || !alamat || !payment) {
        alert('Mohon lengkapi semua data pengiriman dan pembayaran wajib!');
        return;
    }

    // Simulasi Berhasil (Meniru Callback Payment Gateway Midtrans/Xendit)
    alert(`🎉 Pembayaran BERHASIL via ${payment.toUpperCase()}!\n\nTerima kasih ${nama}, pesanan Anda sedang kami proses dan segera dikirim ke alamat: ${alamat}.`);
    
    // Reset Keranjang & Form
    cart = [];
    updateCartUI();
    checkoutForm.reset();
    checkoutSection.classList.add('hidden');
});

// 7. EVENT LISTENERS UTAMA
searchInput.addEventListener('input', filterAndSearchProducts);
categoryFilter.addEventListener('change', filterAndSearchProducts);

cartIconBtn.addEventListener('click', () => cartSidebar.classList.add('open'));
closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('open'));
closeModalBtn.addEventListener('click', closeModal);

modalAddToCartBtn.addEventListener('click', () => {
    if(activeModalProductId) {
        addToCart(activeModalProductId);
        closeModal();
    }
});

// Tutup modal jika user klik di luar kotak modal
window.addEventListener('click', (e) => {
    if (e.target === productModal) closeModal();
});

// Jalankan fungsi tampilkan produk pertama kali halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(PROD_DATA);
    updateCartUI();
});