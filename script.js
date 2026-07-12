oh// 1. DATA PRODUK (Minimal 8-10 Produk sesuai instruksi dosen) produknya:
const PROD_DATA = [
    { id: 1, name: "Gayo Aceh Arabica", category: "biji-kopi", price: 95000, img: "arabicagayo.jpg", desc: "Biji kopi Arabika Gayo pilihan dengan tingkat keasaman sedang dan aroma rempah yang khas." },
    { id: 2, name: "Toraja Sapan Premium", category: "biji-kopi", price: 110000, img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=400", desc: "Kopi Toraja dengan cita rasa tebal (full body) dan sentuhan akhir rasa cokelat manis." },
    { id: 3, name: "Kintamani Bali Fruity", category: "biji-kopi", price: 85000, img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400", desc: "Cita rasa unik Arabika Bali dengan rasa segar jeruk alami (fruity notes)." },
    { id: 4, name: "Java Preanger Exotic", category: "biji-kopi", price: 90000, img: "java.jpg", desc: "Kopi klasik tanah Jawa dengan aroma bunga yang memikat dan rasa manis seimbang." },
    { id: 5, name: "V60 Dripper Kaca 02", category: "alat-seduh", price: 145000, img: "dripperkaca.jpg", desc: "Alat seduh V60 bahan kaca tebal tahan panas untuk ekstraksi kopi yang jernih." },
    { id: 6, name: "Gooseneck Kettle 600ml", category: "alat-seduh", price: 210000, img: "goosenectkettle.jpg", desc: "Teko leher angsa dengan termometer analog untuk kontrol aliran air yang presisi." },
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
/* ==========================================================================
   ADMIN.JS — Logic Admin Dashboard KopiKita Roastery
   ========================================================================== */

// ---------- STATE ----------
let PRODUCTS = loadProducts();
let ORDERS = loadOrders();
let SETTINGS = loadSettings();

let currentOrderFilter = 'all';
let editingProductId = null;
let chartInstance = null;

// ---------- DOM REFERENCES ----------
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const themeToggle = document.getElementById('themeToggle');
const pageTitle = document.getElementById('pageTitle');
const pageSubtitle = document.getElementById('pageSubtitle');

const sectionMeta = {
    dashboard: { title: 'Ikhtisar Dashboard', subtitle: 'Ringkasan performa toko KopiKita Roastery hari ini.' },
    products: { title: 'Manajemen Produk', subtitle: 'Kelola daftar produk, stok, dan harga di katalog toko.' },
    orders: { title: 'Manajemen Pesanan', subtitle: 'Pantau dan perbarui status setiap pesanan pelanggan.' },
    customers: { title: 'Manajemen Pelanggan', subtitle: 'Daftar pelanggan berdasarkan riwayat transaksi.' },
    settings: { title: 'Pengaturan Toko', subtitle: 'Perbarui informasi dasar toko KopiKita Roastery.' }
};

// ---------- HELPERS ----------
function getCSSVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast' + (type === 'danger' ? ' toast-danger' : '');
    toast.innerHTML = `<i class="fas ${type === 'danger' ? 'fa-circle-exclamation' : 'fa-circle-check'}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2600);
}

function categoryLabel(cat) {
    return cat === 'biji-kopi' ? 'Biji Kopi' : 'Alat Seduh';
}

function statusBadgeClass(status) {
    return {
        'Pending': 'badge-pending',
        'Diproses': 'badge-diproses',
        'Dikirim': 'badge-dikirim',
        'Selesai': 'badge-selesai'
    }[status] || 'badge-pending';
}

// ---------- NAVIGASI SIDEBAR ----------
function switchSection(section) {
    document.querySelectorAll('.page-section').forEach(el => el.classList.remove('is-active'));
    document.getElementById(section + '-section').classList.add('is-active');

    document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('is-active', el.dataset.section === section));

    const meta = sectionMeta[section];
    pageTitle.textContent = meta.title;
    pageSubtitle.textContent = meta.subtitle;

    closeMobileSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchSection(btn.dataset.section));
});

document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => switchSection(btn.dataset.goto));
});

function openMobileSidebar() {
    sidebar.classList.add('is-open');
    sidebarOverlay.classList.add('is-active');
}
function closeMobileSidebar() {
    sidebar.classList.remove('is-open');
    sidebarOverlay.classList.remove('is-active');
}
hamburgerBtn.addEventListener('click', openMobileSidebar);
sidebarOverlay.addEventListener('click', closeMobileSidebar);

// ---------- TEMA (LIGHT/DARK) ----------
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('KOPI_ADMIN_THEME', theme);
}
themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    renderSalesChart(); // warna grid/label chart menyesuaikan tema
});
applyTheme(localStorage.getItem('KOPI_ADMIN_THEME') || 'light');

// ==========================================================================
// DASHBOARD
// ==========================================================================
function renderDashboard() {
    const totalRevenue = ORDERS.reduce((sum, o) => sum + o.total, 0);
    const totalProducts = PRODUCTS.length;
    const totalOrders = ORDERS.length;

    const customers = getCustomersFromOrders(ORDERS);
    const now = new Date();
    const newCustomers = customers.filter(c => {
        const d = new Date(c.firstOrderDate);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    document.getElementById('statRevenue').textContent = formatRupiah(totalRevenue);
    document.getElementById('statProducts').textContent = totalProducts;
    document.getElementById('statOrders').textContent = totalOrders;
    document.getElementById('statNewCustomers').textContent = newCustomers;

    // Tren pendapatan bulan ini vs bulan lalu
    const monthly = getMonthlySales(ORDERS, 6);
    const thisMonth = monthly[monthly.length - 1].total;
    const lastMonth = monthly[monthly.length - 2] ? monthly[monthly.length - 2].total : 0;
    const trendEl = document.getElementById('statRevenueTrend');
    if (lastMonth === 0 && thisMonth === 0) {
        trendEl.innerHTML = '<i class="fas fa-minus"></i> Belum ada data';
    } else if (lastMonth === 0) {
        trendEl.innerHTML = '<i class="fas fa-arrow-trend-up"></i> Baru bulan ini';
    } else {
        const pct = Math.round(((thisMonth - lastMonth) / lastMonth) * 100);
        const naik = pct >= 0;
        trendEl.innerHTML = `<i class="fas ${naik ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}"></i> ${naik ? '+' : ''}${pct}% vs bulan lalu`;
        trendEl.style.color = naik ? getCSSVar('--st-done-fg') : getCSSVar('--danger');
    }

    renderSalesChart();
    renderLowStockList();
    renderRecentOrders();
}

function renderSalesChart() {
    const monthly = getMonthlySales(ORDERS, 6);
    const ctx = document.getElementById('salesChart').getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, 'rgba(185, 112, 47, 0.35)');
    gradient.addColorStop(1, 'rgba(185, 112, 47, 0)');

    const inkSoft = getCSSVar('--ink-soft') || '#7C6C5A';
    const gridColor = document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(42,31,23,0.06)';

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: monthly.map(m => m.label),
            datasets: [{
                label: 'Pendapatan',
                data: monthly.map(m => m.total),
                borderColor: '#B9702F',
                backgroundColor: gradient,
                fill: true,
                tension: 0.35,
                borderWidth: 2.5,
                pointBackgroundColor: '#3B2B20',
                pointBorderColor: '#fff',
                pointBorderWidth: 1.5,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#2A1F17',
                    padding: 10,
                    titleFont: { family: 'Inter', weight: '600' },
                    bodyFont: { family: 'JetBrains Mono' },
                    callbacks: { label: (item) => ' ' + formatRupiah(item.parsed.y) }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { family: 'Inter', size: 11.5 }, color: inkSoft }
                },
                y: {
                    grid: { color: gridColor },
                    border: { display: false },
                    ticks: {
                        font: { family: 'JetBrains Mono', size: 10.5 },
                        color: inkSoft,
                        callback: (v) => v === 0 ? '0' : (v / 1000) + 'rb'
                    }
                }
            }
        }
    });
}

function renderLowStockList() {
    const threshold = SETTINGS.lowStockThreshold ?? 10;
    document.getElementById('lowStockNote').textContent = `ambang batas ${threshold}`;
    const lowStockProducts = PRODUCTS.filter(p => p.stock <= threshold).sort((a, b) => a.stock - b.stock);
    const container = document.getElementById('lowStockList');

    if (lowStockProducts.length === 0) {
        container.innerHTML = '<p class="low-stock-empty">Semua stok produk masih aman.</p>';
        return;
    }

    container.innerHTML = lowStockProducts.map(p => `
        <div class="low-stock-item">
            <span class="lsi-name">${p.name}</span>
            <span class="lsi-stock">${p.stock <= 0 ? 'Habis' : p.stock + ' pcs'}</span>
        </div>
    `).join('');
}

function renderRecentOrders() {
    const recent = [...ORDERS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    const tbody = document.getElementById('recentOrdersBody');

    if (recent.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--ink-soft);">Belum ada pesanan.</td></tr>';
        return;
    }

    tbody.innerHTML = recent.map(o => `
        <tr>
            <td class="mono">${o.id}</td>
            <td>${o.customerName}</td>
            <td class="mono">${formatRupiah(o.total)}</td>
            <td><span class="badge ${statusBadgeClass(o.status)}">${o.status}</span></td>
        </tr>
    `).join('');
}

// ==========================================================================
// MANAJEMEN PRODUK
// ==========================================================================
function renderProducts() {
    const keyword = document.getElementById('productSearch').value.toLowerCase();
    const category = document.getElementById('productCategoryFilter').value;
    const threshold = SETTINGS.lowStockThreshold ?? 10;

    const filtered = PRODUCTS.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(keyword);
        const matchCategory = category === 'all' || p.category === category;
        return matchSearch && matchCategory;
    });

    const tbody = document.getElementById('productsBody');

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--ink-soft);">Produk tidak ditemukan.</td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(p => {
        const isLow = p.stock <= threshold;
        return `
        <tr>
            <td><img class="prod-thumb" src="${p.img}" alt="${p.name}" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'"></td>
            <td class="prod-name-cell wrap-cell"><strong>${p.name}</strong></td>
            <td>${categoryLabel(p.category)}</td>
            <td class="mono">${formatRupiah(p.price)}</td>
            <td class="mono ${isLow ? 'stock-low' : ''}">${p.stock}${isLow ? '<span class="tag-lowstock">Menipis</span>' : ''}</td>
            <td>
                <div class="row-actions">
                    <button class="btn-icon-only" title="Edit" onclick="openProductModal('edit', ${p.id})"><i class="fas fa-pen"></i></button>
                    <button class="btn-icon-only danger" title="Hapus" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>`;
    }).join('');
}

document.getElementById('productSearch').addEventListener('input', renderProducts);
document.getElementById('productCategoryFilter').addEventListener('change', renderProducts);

// ---- Modal Tambah/Edit Produk ----
const productModalOverlay = document.getElementById('productModalOverlay');
const productForm = document.getElementById('productForm');

function openProductModal(mode, id = null) {
    editingProductId = mode === 'edit' ? id : null;
    document.getElementById('productModalTitle').textContent = mode === 'edit' ? 'Edit Produk' : 'Tambah Produk Baru';
    document.getElementById('productFormSubmit').textContent = mode === 'edit' ? 'Simpan Perubahan' : 'Simpan Produk';

    if (mode === 'edit') {
        const p = PRODUCTS.find(item => item.id === id);
        document.getElementById('productId').value = p.id;
        document.getElementById('productName').value = p.name;
        document.getElementById('productCategory').value = p.category;
        document.getElementById('productStock').value = p.stock;
        document.getElementById('productPrice').value = p.price;
        document.getElementById('productImg').value = p.img;
        document.getElementById('productDesc').value = p.desc;
    } else {
        productForm.reset();
        document.getElementById('productId').value = '';
    }

    productModalOverlay.classList.add('is-active');
}

function closeProductModal() {
    productModalOverlay.classList.remove('is-active');
    editingProductId = null;
}

document.getElementById('addProductBtn').addEventListener('click', () => openProductModal('add'));
document.getElementById('closeProductModal').addEventListener('click', closeProductModal);
document.getElementById('cancelProductForm').addEventListener('click', closeProductModal);
productModalOverlay.addEventListener('click', (e) => { if (e.target === productModalOverlay) closeProductModal(); });

productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value;
    const stock = parseInt(document.getElementById('productStock').value, 10);
    const price = parseInt(document.getElementById('productPrice').value, 10);
    const img = document.getElementById('productImg').value.trim() || FALLBACK_IMG;
    const desc = document.getElementById('productDesc').value.trim();

    if (!name || isNaN(price) || isNaN(stock)) {
        showToast('Mohon lengkapi nama, harga, dan stok produk.', 'danger');
        return;
    }

    if (editingProductId) {
        const p = PRODUCTS.find(item => item.id === editingProductId);
        Object.assign(p, { name, category, stock, price, img, desc });
        showToast(`Produk "${name}" berhasil diperbarui.`);
    } else {
        const newProduct = { id: nextProductId(PRODUCTS), name, category, stock, price, img, desc };
        PRODUCTS.push(newProduct);
        showToast(`Produk "${name}" berhasil ditambahkan.`);
    }

    saveProducts(PRODUCTS);
    closeProductModal();
    renderProducts();
    renderDashboard();
});

function deleteProduct(id) {
    const p = PRODUCTS.find(item => item.id === id);
    if (!p) return;
    if (!confirm(`Hapus produk "${p.name}"? Tindakan ini tidak bisa dibatalkan.`)) return;

    PRODUCTS = PRODUCTS.filter(item => item.id !== id);
    saveProducts(PRODUCTS);
    renderProducts();
    renderDashboard();
    showToast(`Produk "${p.name}" telah dihapus.`);
}

// ==========================================================================
// MANAJEMEN PESANAN
// ==========================================================================
function renderOrders() {
    let filtered = ORDERS;
    if (currentOrderFilter !== 'all') {
        filtered = ORDERS.filter(o => o.status === currentOrderFilter);
    }
    filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));

    const tbody = document.getElementById('ordersBody');

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--ink-soft);">Tidak ada pesanan dengan status ini.</td></tr>';
    } else {
        tbody.innerHTML = filtered.map(o => `
            <tr>
                <td class="mono">${o.id}</td>
                <td>${o.customerName}</td>
                <td>${formatTanggal(o.date)}</td>
                <td class="mono">${formatRupiah(o.total)}</td>
                <td>
                    <select class="status-select" onchange="changeOrderStatus('${o.id}', this.value)">
                        ${['Pending', 'Diproses', 'Dikirim', 'Selesai'].map(s => `<option value="${s}" ${s === o.status ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                </td>
                <td>
                    <button class="btn-icon-only" title="Lihat Detail" onclick="openOrderDetailModal('${o.id}')"><i class="fas fa-eye"></i></button>
                </td>
            </tr>
        `).join('');
    }

    document.getElementById('navOrdersBadge').textContent = ORDERS.filter(o => o.status === 'Pending').length;
}

document.getElementById('orderStatusFilter').addEventListener('click', (e) => {
    const btn = e.target.closest('.pill');
    if (!btn) return;
    currentOrderFilter = btn.dataset.status;
    document.querySelectorAll('#orderStatusFilter .pill').forEach(p => p.classList.toggle('is-active', p === btn));
    renderOrders();
});

function changeOrderStatus(id, newStatus) {
    const order = ORDERS.find(o => o.id === id);
    if (!order) return;
    order.status = newStatus;
    saveOrders(ORDERS);
    renderOrders();
    renderDashboard();
    showToast(`Status pesanan ${id} diubah menjadi "${newStatus}".`);
}

// ---- Modal Detail Pesanan ----
const orderModalOverlay = document.getElementById('orderModalOverlay');

function openOrderDetailModal(id) {
    const o = ORDERS.find(item => item.id === id);
    if (!o) return;

    document.getElementById('orderDetailId').textContent = o.id;
    document.getElementById('orderDetailBody').innerHTML = `
        <div class="od-row"><span>Nama Pelanggan</span><span>${o.customerName}</span></div>
        <div class="od-row"><span>Alamat</span><span style="text-align:right;max-width:250px;">${o.customerAddress}</span></div>
        <div class="od-row"><span>Tanggal Pesanan</span><span>${formatTanggal(o.date)}</span></div>
        <div class="od-row"><span>Metode Pembayaran</span><span>${(o.paymentMethod || '-').toUpperCase()}</span></div>
        <div class="od-row"><span>Status</span><span><span class="badge ${statusBadgeClass(o.status)}">${o.status}</span></span></div>
        <div class="od-items">
            ${o.items.map(it => `<div class="od-item"><span>${it.name} × ${it.quantity}</span><span class="mono">${formatRupiah(it.price * it.quantity)}</span></div>`).join('')}
        </div>
        <div class="od-total"><span>Total</span><span class="mono">${formatRupiah(o.total)}</span></div>
    `;
    orderModalOverlay.classList.add('is-active');
}

function closeOrderModal() { orderModalOverlay.classList.remove('is-active'); }
document.getElementById('closeOrderModal').addEventListener('click', closeOrderModal);
orderModalOverlay.addEventListener('click', (e) => { if (e.target === orderModalOverlay) closeOrderModal(); });

// ==========================================================================
// MANAJEMEN PELANGGAN
// ==========================================================================
function renderCustomers() {
    const customers = getCustomersFromOrders(ORDERS);
    const tbody = document.getElementById('customersBody');

    if (customers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--ink-soft);">Belum ada pelanggan.</td></tr>';
        return;
    }

    tbody.innerHTML = customers.map(c => `
        <tr>
            <td><strong>${c.name}</strong></td>
            <td class="wrap-cell">${c.address}</td>
            <td class="mono">${c.totalOrders}</td>
            /* ==========================================================================
   STORE-DATA.JS
   Lapisan data bersama untuk KopiKita Roastery.
   Dipakai oleh index.html (toko) DAN admin.html (dashboard admin) supaya
   produk, pesanan, dan pengaturan selalu sinkron lewat localStorage.
   ========================================================================== */

const STORAGE_KEYS = {
    PRODUCTS: 'KOPI_PRODUCTS',
    ORDERS: 'KOPI_ORDERS',
    SETTINGS: 'KOPI_SETTINGS',
    ORDER_COUNTER: 'KOPI_ORDER_COUNTER'
};

// Gambar cadangan jika URL produk rusak/tidak ditemukan
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=400';

// Data awal produk (dipakai hanya sekali saat localStorage masih kosong)
const DEFAULT_PRODUCTS = [
    { id: 1, name: "Gayo Aceh Arabica", category: "biji-kopi", price: 95000, stock: 42, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400", desc: "Biji kopi Arabika Gayo pilihan dengan tingkat keasaman sedang dan aroma rempah yang khas." },
    { id: 2, name: "Toraja Sapan Premium", category: "biji-kopi", price: 110000, stock: 28, img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=400", desc: "Kopi Toraja dengan cita rasa tebal (full body) dan sentuhan akhir rasa cokelat manis." },
    { id: 3, name: "Kintamani Bali Fruity", category: "biji-kopi", price: 85000, stock: 35, img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400", desc: "Cita rasa unik Arabika Bali dengan rasa segar jeruk alami (fruity notes)." },
    { id: 4, name: "Java Preanger Exotic", category: "biji-kopi", price: 90000, stock: 8, img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=400", desc: "Kopi klasik tanah Jawa dengan aroma bunga yang memikat dan rasa manis seimbang." },
    { id: 5, name: "V60 Dripper Kaca 02", category: "alat-seduh", price: 145000, stock: 20, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400", desc: "Alat seduh V60 bahan kaca tebal tahan panas untuk ekstraksi kopi yang jernih." },
    { id: 6, name: "Gooseneck Kettle 600ml", category: "alat-seduh", price: 210000, stock: 15, img: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=400", desc: "Teko leher angsa dengan termometer analog untuk kontrol aliran air yang presisi." },
    { id: 7, name: "Hand Grinder Stainless", category: "alat-seduh", price: 185000, stock: 6, img: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=400", desc: "Penggiling kopi manual dengan burr keramik, bisa diatur tingkat kehalusannya." },
    { id: 8, name: "Kertas Filter V60 (100 pcs)", category: "alat-seduh", price: 45000, stock: 60, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400", desc: "Paper filter berkualitas tinggi tanpa pemutih, menjaga rasa asli seduhan kopi Anda." }
];

const DEFAULT_SETTINGS = {
    storeName: 'KopiKita Roastery',
    tagline: 'Premium Specialty Coffee',
    email: 'halo@kopikita.id',
    phone: '0812-3456-7890',
    address: 'Jl. Kopi Nikmat No. 1, Bandung, Jawa Barat',
    lowStockThreshold: 10
};

// ---------- PRODUK ----------
function loadProducts() {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
        saveProducts(DEFAULT_PRODUCTS);
        return JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
    }
    try { return JSON.parse(raw); } catch (e) { return JSON.parse(JSON.stringify(DEFAULT_PRODUCTS)); }
}

function saveProducts(products) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

function nextProductId(products) {
    return products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
}

// ---------- PESANAN ----------
function loadOrders() {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
        const seeded = generateSeedOrders();
        saveOrders(seeded);
        localStorage.setItem(STORAGE_KEYS.ORDER_COUNTER, '1012');
        return seeded;
    }
    try { return JSON.parse(raw); } catch (e) { return []; }
}

function saveOrders(orders) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

function nextOrderId() {
    let counter = parseInt(localStorage.getItem(STORAGE_KEYS.ORDER_COUNTER) || '1012', 10);
    counter += 1;
    localStorage.setItem(STORAGE_KEYS.ORDER_COUNTER, String(counter));
    return 'KK-' + counter;
}

// Data pesanan contoh, supaya dashboard admin langsung terisi grafik & tabel
// yang realistis sebelum ada transaksi asli dari toko.
function generateSeedOrders() {
    return [
        { id: 'KK-1001', customerName: 'Dian Puspitasari', customerAddress: 'Jl. Merdeka No. 12, Bandung', paymentMethod: 'bca', date: '2026-02-14T10:30:00', status: 'Selesai',
          items: [ { productId: 1, name: 'Gayo Aceh Arabica', price: 95000, quantity: 2 }, { productId: 5, name: 'V60 Dripper Kaca 02', price: 145000, quantity: 1 } ], total: 335000 },
        { id: 'KK-1002', customerName: 'Rizky Ramadhan', customerAddress: 'Jl. Diponegoro No. 45, Semarang', paymentMethod: 'gopay', date: '2026-02-27T14:05:00', status: 'Selesai',
          items: [ { productId: 2, name: 'Toraja Sapan Premium', price: 110000, quantity: 1 } ], total: 110000 },
        { id: 'KK-1003', customerName: 'Siti Nur Aini', customerAddress: 'Jl. Malioboro No. 8, Yogyakarta', paymentMethod: 'ovo', date: '2026-03-10T09:15:00', status: 'Selesai',
          items: [ { productId: 3, name: 'Kintamani Bali Fruity', price: 85000, quantity: 3 } ], total: 255000 },
        { id: 'KK-1004', customerName: 'Bagus Setiawan', customerAddress: 'Jl. Sudirman No. 21, Surabaya', paymentMethod: 'bca', date: '2026-03-22T16:40:00', status: 'Selesai',
          items: [ { productId: 6, name: 'Gooseneck Kettle 600ml', price: 210000, quantity: 1 }, { productId: 8, name: 'Kertas Filter V60 (100 pcs)', price: 45000, quantity: 2 } ], total: 300000 },
        { id: 'KK-1005', customerName: 'Made Wirawan', customerAddress: 'Jl. Gatot Subroto No. 3, Denpasar', paymentMethod: 'gopay', date: '2026-04-05T11:20:00', status: 'Selesai',
          items: [ { productId: 4, name: 'Java Preanger Exotic', price: 90000, quantity: 2 } ], total: 180000 },
        { id: 'KK-1006', customerName: 'Anita Lestari', customerAddress: 'Jl. Ahmad Yani No. 17, Medan', paymentMethod: 'ovo', date: '2026-04-19T13:50:00', status: 'Selesai',
          items: [ { productId: 7, name: 'Hand Grinder Stainless', price: 185000, quantity: 1 }, { productId: 8, name: 'Kertas Filter V60 (100 pcs)', price: 45000, quantity: 1 } ], total: 230000 },
        { id: 'KK-1007', customerName: 'Fajar Nugroho', customerAddress: 'Jl. Veteran No. 9, Malang', paymentMethod: 'bca', date: '2026-05-08T10:00:00', status: 'Dikirim',
          items: [ { productId: 1, name: 'Gayo Aceh Arabica', price: 95000, quantity: 1 }, { productId: 2, name: 'Toraja Sapan Premium', price: 110000, quantity: 1 } ], total: 205000 },
        { id: 'KK-1008', customerName: 'Putri Ayu Ningsih', customerAddress: 'Jl. Cihampelas No. 55, Bandung', paymentMethod: 'gopay', date: '2026-05-25T15:30:00', status: 'Dikirim',
          items: [ { productId: 5, name: 'V60 Dripper Kaca 02', price: 145000, quantity: 2 } ], total: 290000 },
        { id: 'KK-1009', customerName: 'Yoga Pratama', customerAddress: 'Jl. Pandanaran No. 30, Semarang', paymentMethod: 'ovo', date: '2026-06-12T09:45:00', status: 'Diproses',
          items: [ { productId: 3, name: 'Kintamani Bali Fruity', price: 85000, quantity: 2 }, { productId: 6, name: 'Gooseneck Kettle 600ml', price: 210000, quantity: 1 } ], total: 380000 },
        { id: 'KK-1010', customerName: 'Melani Kusuma', customerAddress: 'Jl. Kaliurang No. 14, Yogyakarta', paymentMethod: 'bca', date: '2026-06-30T17:10:00', status: 'Diproses',
          items: [ { productId: 4, name: 'Java Preanger Exotic', price: 90000, quantity: 1 }, { productId: 8, name: 'Kertas Filter V60 (100 pcs)', price: 45000, quantity: 3 } ], total: 225000 },
        { id: 'KK-1011', customerName: 'Doni Firmansyah', customerAddress: 'Jl. Panglima Sudirman No. 6, Surabaya', paymentMethod: 'gopay', date: '2026-07-03T12:25:00', status: 'Pending',
          items: [ { productId: 1, name: 'Gayo Aceh Arabica', price: 95000, quantity: 3 } ], total: 285000 },
        { id: 'KK-1012', customerName: 'Ratna Sari', customerAddress: 'Jl. Riau No. 22, Bandung', paymentMethod: 'ovo', date: '2026-07-08T18:05:00', status: 'Pending',
          items: [ { productId: 7, name: 'Hand Grinder Stainless', price: 185000, quantity: 1 }, { productId: 5, name: 'V60 Dripper Kaca 02', price: 145000, quantity: 1 } ], total: 330000 }
    ];
}

// ---------- PENGATURAN TOKO ----------
function loadSettings() {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
        saveSettings(DEFAULT_SETTINGS);
        return { ...DEFAULT_SETTINGS };
    }
    try { return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }; } catch (e) { return { ...DEFAULT_SETTINGS }; }
}

function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

// ---------- HELPER ----------
function formatRupiah(angka) {
    return 'Rp ' + Math.round(angka).toLocaleString('id-ID');
}

function formatTanggal(isoString) {
    const d = new Date(isoString);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Menurunkan daftar pelanggan unik dari riwayat pesanan (nama + alamat sebagai kunci)
function getCustomersFromOrders(orders) {
    const map = {};
    orders.forEach(o => {
        const key = (o.customerName || '').trim().toLowerCase() + '|' + (o.customerAddress || '').trim().toLowerCase();
        if (!map[key]) {
            map[key] = {
                name: o.customerName,
                address: o.customerAddress,
                totalOrders: 0,
                totalSpent: 0,
                firstOrderDate: o.date
            };
        }
        map[key].totalOrders += 1;
        map[key].totalSpent += o.total;
        if (new Date(o.date) < new Date(map[key].firstOrderDate)) {
            map[key].firstOrderDate = o.date;
        }
    });
    return Object.values(map).sort((a, b) => new Date(b.firstOrderDate) - new Date(a.firstOrderDate));
}

// Agregasi total penjualan per bulan untuk N bulan terakhir (dihitung dari hari ini)
function getMonthlySales(orders, monthsBack) {
    const now = new Date();
    const buckets = [];
    for (let i = monthsBack - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        buckets.push({ year: d.getFullYear(), month: d.getMonth(), label: d.toLocaleDateString('id-ID', { month: 'short' }), total: 0 });
    }
    orders.forEach(o => {
        const d = new Date(o.date);
        const bucket = buckets.find(b => b.year === d.getFullYear() && b.month === d.getMonth());
        if (bucket) bucket.total += o.total;
    });
    return buckets;
                                          }
                                          
       
