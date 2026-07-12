# ☕ KopiKita Roastery — Platform E-Commerce Kopi Specialty Nusantara

> **Nama Pengembang:** Hari Akbar
> **NIM:** 209250076
> **Kelas:** ABI-2
> **Institusi:** International Women University (IWU)

---

## 📌 Daftar Isi

- [Ringkasan Proyek](#-ringkasan-proyek)
- [Tumpukan Teknologi (Tech Stack)](#️-tumpukan-teknologi-tech-stack)
- [Struktur Folder](#-struktur-folder)
- [Cara Menjalankan](#️-cara-menjalankan)
- [Catatan Teknis & Batasan Saat Ini](#️-catatan-teknis--batasan-saat-ini)
- [1. Profil Bisnis](#1--profil-bisnis)
- [2. Target Pasar & Segmentasi Pelanggan](#2--target-pasar--segmentasi-pelanggan)
- [3. Analisis Pasar Singkat & Pesaing](#3--analisis-pasar-singkat--pesaing)
- [4. Strategi Manajemen Produk & Katalog](#4--strategi-manajemen-produk--katalog)
- [5. Model Bisnis & Aliran Pendapatan](#5--model-bisnis--aliran-pendapatan)
- [6. Strategi Harga, Promosi, dan Diskon](#6--strategi-harga-promosi-dan-diskon)
- [7. Proses Checkout & Simulasi Payment Gateway](#7--proses-checkout--simulasi-payment-gateway)
- [8. Rencana SEO, Keamanan, dan Pemeliharaan](#8--rencana-seo-keamanan-dan-pemeliharaan)
- [9. Rencana Penggunaan Data Analitik](#9--rencana-penggunaan-data-analitik)
- [Roadmap Pengembangan](#-roadmap-pengembangan-selanjutnya)

---

## 🧾 Ringkasan Proyek

**KopiKita Roastery** adalah proyek *single-page e-commerce* yang menjual biji kopi specialty asli Nusantara beserta alat seduh manual (manual brew). Proyek ini dibangun sebagai demonstrasi alur belanja online end-to-end — mulai dari katalog produk, pencarian dan filter, detail produk, keranjang belanja, hingga simulasi proses checkout dan pembayaran.

### 🧩 Fitur Utama yang Sudah Berjalan

| Fitur | Status | Keterangan |
|---|:---:|---|
| Katalog produk (grid responsif) | ✅ | 8 produk, 2 kategori (Biji Kopi & Alat Seduh) |
| Pencarian & filter kategori | ✅ | Real-time, kombinasi keyword + kategori |
| Modal detail produk | ✅ | Menampilkan gambar, harga, deskripsi lengkap |
| Keranjang belanja (cart sidebar) | ✅ | Tambah, kurang, hapus item, tersimpan di `localStorage` |
| Checkout & form pengiriman | ✅ | Validasi field wajib sebelum submit |
| Simulasi pembayaran | ✅ | Simulasi via `alert()`, belum terhubung gateway asli |
| Desain responsif (mobile) | ✅ | Media query untuk layar ≤ 768px |

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

| Layer | Teknologi | Catatan |
|---|---|---|
| Struktur | HTML5 | Tag semantik (`header`, `nav`, `main`, `section`, `footer`) |
| Styling | CSS3 | CSS Variables, Flexbox, CSS Grid, animasi, media query |
| Logika & Interaktivitas | JavaScript (Vanilla ES6) | Tanpa framework, tanpa build tool |
| Ikon | Font Awesome 6.4.0 | Dimuat via CDN |
| Analitik | Google Analytics (Universal Analytics snippet) | ID masih placeholder `UA-XXXXX-Y` |
| Penyimpanan Sisi Klien | Web Storage API (`localStorage`) | Menyimpan data keranjang per-browser |
| Backend / Database | **Belum ada** | Data produk saat ini hardcode di `script.js` |

### 📁 Struktur Folder

```
kopikita-roastery/
├── index.html      # Struktur halaman: navbar, hero, katalog, modal, cart, checkout
├── style.css       # Tema visual (palet warna kopi), layout grid & flexbox, responsive
├── script.js       # Data produk, logika cart, filter/search, validasi checkout
├── assets/         # (belum ada di proyek — lihat Catatan Teknis di bawah)
└── README.md       # Dokumentasi proyek ini
```

### ▶️ Cara Menjalankan

Karena proyek ini murni front-end tanpa dependency eksternal, tidak diperlukan proses instalasi package:

1. Unduh/clone ketiga file (`index.html`, `style.css`, `script.js`) ke dalam satu folder.
2. Buka `index.html` langsung di browser, **atau**
3. Gunakan ekstensi seperti *Live Server* (VS Code) agar path relatif lebih stabil.

```bash
# Opsional jika ingin serve via Python (untuk menghindari isu CORS pada beberapa browser)
python -m http.server 5500
```

---

## ⚠️ Catatan Teknis & Batasan Saat Ini

Bagian ini penting agar dokumentasi tidak melebih-lebihkan kondisi kode yang sebenarnya:

- **3 gambar produk belum tersedia.** Produk *Java Preanger Exotic*, *Hand Grinder Stainless*, dan *Kertas Filter V60* mereferensikan file lokal (`java.jpg`, `hand.jpg`, `kertas.jpg`) yang belum ada di dalam folder proyek. Perlu dibuatkan folder `assets/images/` berisi file tersebut agar gambar tidak *broken*.
- **Google Analytics masih placeholder.** Snippet menggunakan ID `UA-XXXXX-Y` (format Universal Analytics yang sudah *deprecated*). Untuk produksi, sebaiknya diganti ke Measurement ID GA4.
- **Cart bersifat lokal per-perangkat.** Karena disimpan di `localStorage`, keranjang tidak akan sinkron jika pelanggan berpindah perangkat atau membersihkan cache browser.
- **Checkout adalah simulasi front-end murni.** Saat form disubmit, "keberhasilan pembayaran" ditampilkan lewat `alert()` di `script.js` — belum ada koneksi ke payment gateway sungguhan (Midtrans/Xendit), karena hal itu membutuhkan komponen backend (server key, endpoint webhook) yang belum dibangun di proyek ini.
- **Belum ada backend/database.** Seluruh data produk berada langsung di array `PROD_DATA` pada `script.js`. Konsekuensinya, poin-poin terkait keamanan server (autentikasi, enkripsi, proteksi serangan) dan analitik admin pada dokumen ini disusun sebagai **rencana pengembangan**, bukan fitur yang sudah berjalan.

---

## 1. 🏪 Profil Bisnis

**Nama Bisnis:** KopiKita Roastery

**Deskripsi Platform:**
KopiKita Roastery adalah platform *direct-to-consumer* (D2C) yang mengkurasi biji kopi specialty dari berbagai daerah penghasil kopi di Indonesia — Gayo, Toraja, Kintamani, hingga Java Preanger — dan memasarkannya langsung ke konsumen akhir, dilengkapi dengan alat seduh manual brew (V60, gooseneck kettle, hand grinder, filter paper) sebagai satu ekosistem belanja.

**Proposisi Nilai (Value Proposition):**

| Pilar | Penjelasan |
|---|---|
| 🌾 Kurasi Origin Nusantara | Fokus pada biji kopi asal Indonesia dengan karakter rasa yang dijelaskan secara spesifik per origin (bukan sekadar "kopi arabika" generik) |
| 💵 Transparansi Harga | Rentang harga jelas per produk, tanpa skema tersembunyi seperti ongkir berjenjang yang membingungkan |
| 🎓 Edukasi Manual Brew | Menyediakan alat seduh sekaligus deskripsi teknis (mis. burr keramik yang bisa diatur, termometer analog di kettle) agar pelanggan pemula juga teredukasi |

---

## 2. 🎯 Target Pasar & Segmentasi Pelanggan

| Dimensi Segmentasi | Deskripsi |
|---|---|
| **Demografis** | Usia 20–35 tahun (akhir Gen Z & Milenial), status mahasiswa hingga pekerja muda, pengeluaran gaya hidup menengah ke menengah-atas |
| **Geografis** | Terpusat di kota besar (Jakarta, Bandung, Surabaya, Yogyakarta) sebagai pasar inti, dengan jangkauan nasional melalui pengiriman logistik pihak ketiga |
| **Perilaku Konsumen** | *Tech-savvy*, terbiasa belanja online dan riset produk lewat media sosial/marketplace sebelum membeli, mengutamakan pengalaman (*experience-driven*) dan cerita di balik produk, cenderung loyal pada brand dengan identitas yang jelas |

**Kaitan dengan implementasi:** fitur pencarian dan filter kategori (`biji-kopi` vs `alat-seduh`) pada katalog dirancang untuk melayani dua kebutuhan berbeda dalam satu segmen yang sama — pembeli kopi rutin dan pembeli alat seduh (biasanya penikmat kopi yang baru mulai *brewing* di rumah).

---

## 3. 📊 Analisis Pasar Singkat & Pesaing

| Aspek | KopiKita Roastery | Marketplace Besar (Tokopedia/Shopee) | Niche Specialty Store (mis. Otten Coffee) |
|---|---|---|---|
| Fokus produk | Kopi origin Nusantara + alat seduh, terkurasi | Semua kategori, sangat luas | Kopi & alat seduh, lebih beragam origin/brand |
| Kurasi produk | Tinggi (katalog terbatas, 8 produk pilihan) | Rendah (bergantung penjual pihak ketiga) | Tinggi |
| Kepercayaan brand/cerita origin | Kuat, naratif per produk jelas | Lemah, tergantung deskripsi tiap penjual | Kuat |
| Kecepatan menemukan produk | Cepat (search + filter 2 kategori) | Perlu effort lebih (ribuan listing serupa) | Cepat |
| Harga | Kompetitif untuk segmen premium-terjangkau | Sangat bervariasi, rentan perang harga | Cenderung lebih premium |
| Skala & jangkauan logistik | Terbatas (single-brand) | Sangat luas | Terbatas |

**Insight:** KopiKita tidak bersaing di skala/jangkauan seperti marketplace besar, melainkan di **kedalaman kurasi dan kepercayaan brand** — posisi yang mirip dengan niche specialty store, namun dengan model direct-to-consumer (bukan multi-merchant).

---

## 4. 🗂️ Strategi Manajemen Produk & Katalog

### Struktur Kategori

Sesuai dengan implementasi filter di `script.js`, katalog dibagi menjadi 2 kategori utama:

```
KopiKita Roastery
├── Biji Kopi (Beans)
│   ├── Gayo Aceh Arabica         — Rp 95.000
│   ├── Toraja Sapan Premium      — Rp 110.000
│   ├── Kintamani Bali Fruity     — Rp 85.000
│   └── Java Preanger Exotic      — Rp 90.000
└── Alat Seduh (Tools)
    ├── V60 Dripper Kaca 02       — Rp 145.000
    ├── Gooseneck Kettle 600ml    — Rp 210.000
    ├── Hand Grinder Stainless    — Rp 185.000
    └── Kertas Filter V60 (100pcs)— Rp 45.000
```

### Formula Deskripsi Produk (Problem–Solution)

Deskripsi setiap produk disusun agar langsung menjawab kebutuhan/masalah pelanggan, contoh dari produk yang sudah ada:

> **Problem:** Pelanggan ingin kopi dengan rasa khas tapi tidak terlalu asam.
> **Solution — Gayo Aceh Arabica:** "Biji kopi Arabika Gayo pilihan dengan tingkat keasaman sedang dan aroma rempah yang khas."

> **Problem:** Pelanggan pemula bingung memilih alat penggiling yang presisi.
> **Solution — Hand Grinder Stainless:** "Penggiling kopi manual dengan burr keramik, bisa diatur tingkat kehalusannya."

### Ketentuan Visual Produk

| Ketentuan | Standar yang Disarankan | Kondisi Saat Ini |
|---|---|---|
| Rasio gambar | 1:1 (persegi) | Sebagian gambar bersumber dari Unsplash dengan rasio landscape, belum konsisten 1:1 |
| Resolusi minimum | 1080×1080 px | Perlu standarisasi ulang untuk seluruh 8 produk |
| Gaya foto | Studio, latar bersih, pencahayaan konsisten | Saat ini campuran stok foto eksternal + placeholder file lokal yang belum tersedia |

**Rekomendasi:** untuk versi produksi, seluruh foto sebaiknya diambil ulang dengan studio setup yang konsisten agar katalog terlihat seragam dan profesional.

---

## 5. 💰 Model Bisnis & Aliran Pendapatan

Perlu ditekankan bahwa KopiKita Roastery beroperasi sebagai **single-brand D2C**, bukan marketplace multi-merchant — sehingga skema komisi transaksi (MDR) atau langganan merchant **tidak relevan** untuk model ini. Aliran pendapatan yang sesuai:

| Sumber Pendapatan | Penjelasan |
|---|---|
| **Margin Penjualan Produk (utama)** | Selisih antara harga jual dan harga pokok penyangraian/pembelian alat seduh |
| **Bundling Produk** | Paket biji kopi + alat seduh dengan margin gabungan yang lebih tinggi per transaksi |
| **Langganan Kopi (Coffee Subscription)** *— rencana* | Model berlangganan kiriman biji kopi rutin bulanan bagi pelanggan setia |
| **Workshop/Kelas Manual Brew Berbayar** *— rencana* | Monetisasi dari sisi edukasi, memperkuat value proposition di poin 1 |

---

## 6. 🏷️ Strategi Harga, Promosi, dan Diskon

**Metode Penetapan Harga:** kombinasi *cost-plus pricing* (memastikan margin di atas biaya sangrai/produksi) dan *value-based pricing* (harga mencerminkan positioning "premium tapi terjangkau", terlihat dari rentang harga Rp 45.000–Rp 210.000 pada katalog saat ini).

**Flash Sale / Slash Price:** strategi musiman, misalnya diskon terbatas waktu untuk produk *slow-moving* seperti Kintamani Bali Fruity guna mempercepat perputaran stok.

**Bundling Produk**, contoh konkret dari katalog yang ada:
- Paket "Pemula Manual Brew": V60 Dripper + Kertas Filter V60 + 1 Biji Kopi pilihan, harga bundel lebih murah dibanding beli terpisah.
- Paket "Presisi Seduh": Gooseneck Kettle + Hand Grinder, menyasar pelanggan yang serius mendalami manual brew.

**Smart Cashback** *(🚧 rencana pengembangan, belum ada di kode saat ini)*: skema di mana persentase nilai transaksi dikembalikan sebagai saldo/poin yang bisa dipakai pada pembelian berikutnya — bertujuan meningkatkan repeat purchase rate.

---

## 7. 🛒 Proses Checkout & Simulasi Payment Gateway

Alur berikut merepresentasikan **logika yang benar-benar berjalan** di `script.js`:

```
[Klik "Tambah Keranjang" pada produk]
              │
              ▼
[Item masuk ke array cart + tersimpan ke localStorage]
              │
              ▼
[Klik ikon keranjang di navbar] → Cart Sidebar terbuka
              │
              ▼
[Klik "Lanjut ke Pembayaran"]
              │
      ┌───────┴────────┐
      │  Cart kosong?  │──Ya──▶ alert("Keranjang belanja Anda masih kosong!") — STOP
      └───────┬────────┘
              │ Tidak
              ▼
[Checkout Section tampil: ringkasan pesanan + form pengiriman]
              │
              ▼
[Isi Nama Lengkap, Alamat, pilih Metode Pembayaran]
              │
              ▼
[Submit Form Checkout]
              │
      ┌───────┴────────┐
      │ Data lengkap?  │──Tidak──▶ alert("Mohon lengkapi semua data...") — STOP
      └───────┬────────┘
              │ Ya
              ▼
[Simulasi callback payment gateway]
   alert("🎉 Pembayaran BERHASIL via [METODE]!")
              │
              ▼
[Cart & form direset, Checkout Section disembunyikan]
```

**Metode pembayaran yang tersedia** (seluruhnya berlabel simulasi pada dropdown):
- BCA Virtual Account (Simulasi)
- GoPay / QRIS (Simulasi)
- OVO (Simulasi)

**Catatan penting:** proses "sukses" saat ini dipicu langsung oleh `alert()` di sisi klien — **bukan** webhook nyata dari Midtrans/Xendit. Integrasi payment gateway sungguhan membutuhkan komponen yang belum ada di proyek ini, yaitu:
1. Backend untuk generate Snap Token / invoice ID secara aman (server key tidak boleh berada di kode front-end).
2. Endpoint webhook untuk menerima notifikasi status pembayaran dari gateway.
3. Validasi signature notifikasi agar tidak bisa dipalsukan pihak luar.

---

## 8. 🔐 Rencana SEO, Keamanan, dan Pemeliharaan

### SEO

| Item | Status |
|---|:---:|
| Tag semantik HTML5 (`header`, `nav`, `main`, `section`, `footer`) | ✅ Sudah diterapkan |
| Meta viewport (mobile-friendly) | ✅ Sudah ada |
| Title tag deskriptif | ✅ Sudah ada ("KopiKita Roastery \| Premium Specialty Coffee") |
| Meta description | 🚧 Belum ada, perlu ditambahkan |
| Open Graph tags (untuk share ke sosial media) | 🚧 Belum ada |
| Metadata JSON-LD (schema.org Product) | 🚧 Belum ada, disarankan untuk rich snippet di hasil pencarian |

### Keamanan

Karena proyek ini **belum memiliki backend/database**, item keamanan berikut disusun sebagai rencana ke depan, bukan kondisi saat ini:

| Aspek Keamanan | Rencana Penerapan |
|---|---|
| Enkripsi password | Bcrypt hashing saat autentikasi dibangun |
| Manajemen sesi | JWT disimpan sebagai HttpOnly cookie (mencegah akses via JavaScript/XSS) |
| Koneksi data | SSL/HTTPS wajib di seluruh endpoint saat backend aktif |
| Proteksi SQL Injection | Parameterized query / ORM saat database diimplementasikan |
| Proteksi XSS | Sanitasi input pengguna + Content Security Policy header |
| Proteksi CSRF | CSRF token pada form yang melakukan perubahan data (checkout, login) |

### Pemeliharaan & Backup

Saat ini seluruh data produk berada di `PROD_DATA` (hardcode) dan data keranjang di `localStorage` browser — keduanya rentan hilang (perubahan kode, cache dibersihkan). Rencana pemeliharaan:
1. Migrasi data produk ke database terkelola dengan backup otomatis berkala (harian/mingguan).
2. Versioning kode melalui Git agar perubahan katalog/produk terlacak.
3. Monitoring uptime bila sudah ada backend/hosting produksi.

---

## 9. 📈 Rencana Penggunaan Data Analitik

**Kondisi saat ini:** hanya terpasang snippet Google Analytics dasar (page view tracking, ID masih placeholder). Belum ada halaman admin maupun database transaksi, sehingga metrik bisnis di bawah ini adalah **rencana** yang baru bisa dihitung setelah backend dan basis data transaksi tersedia.

| Metrik | Cara Perhitungan | Kegunaan bagi Pengambilan Keputusan |
|---|---|---|
| **Cart Abandonment Rate** | (Jumlah *add-to-cart* − Jumlah checkout sukses) ÷ Jumlah *add-to-cart* | Jika tinggi, evaluasi apakah form checkout terlalu panjang atau opsi pembayaran kurang lengkap |
| **Stock Turnover Rate** | Harga Pokok Penjualan (HPP) terjual ÷ Rata-rata nilai persediaan | Mengidentifikasi produk yang perlu restock cepat vs produk *slow-moving* yang perlu didiskon |
| **Customer Lifetime Value (LTV)** | Rata-rata nilai transaksi × Frekuensi pembelian × Rata-rata masa jadi pelanggan | Menentukan pelanggan mana yang paling bernilai untuk program retensi/loyalitas |

Ketiga metrik ini idealnya ditampilkan pada halaman admin (dashboard) begitu backend dan database transaksi dibangun, sehingga pengambilan keputusan bisnis (restock, promosi, retensi pelanggan) bisa berbasis data, bukan asumsi.

---

## 🚀 Roadmap Pengembangan Selanjutnya

Ringkasan seluruh rencana pengembangan (🚧) yang disebutkan di atas, diurutkan berdasarkan prioritas:

1. Melengkapi aset gambar produk yang hilang (`java.jpg`, `hand.jpg`, `kertas.jpg`) dan menstandarkan rasio 1:1.
2. Migrasi Google Analytics ke GA4 dengan Measurement ID yang valid.
3. Membangun backend (autentikasi, database produk & transaksi) sebagai fondasi seluruh fitur lanjutan.
4. Integrasi payment gateway nyata (Midtrans/Xendit) dengan webhook dan validasi signature.
5. Implementasi keamanan backend (Bcrypt, JWT HttpOnly, proteksi SQLi/XSS/CSRF).
6. Menambahkan metadata JSON-LD dan meta tag SEO lanjutan.
7. Membangun dashboard admin untuk Cart Abandonment Rate, Stock Turnover Rate, dan Customer LTV.
8. Mengembangkan fitur Smart Cashback dan program langganan (subscription).

---

*Dokumen ini merupakan bagian dari Tugas Proyek E-Commerce — International Women University (IWU).*

