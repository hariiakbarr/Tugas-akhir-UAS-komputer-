# 🛍️ KopiKita — E-Commerce Website

> **Value Proposition:** Belanja produk lokal berkualitas dengan harga transparan dan pengalaman checkout tercepat.

Sebuah platform e-commerce berbasis web (HTML, CSS, JavaScript) yang dirancang untuk memberikan pengalaman belanja online yang cepat, aman, dan menyenangkan.

---

## 📑 Daftar Isi
1. [Tentang Bisnis](#1-tentang-bisnis)
2. [Target Pasar & Segmentasi](#2-target-pasar--segmentasi-pelanggan)
3. [Analisis Pasar & Pesaing](#3-analisis-pasar--pesaing)
4. [Manajemen Produk & Katalog](#4-strategi-manajemen-produk--katalog)
5. [Model Bisnis & Aliran Pendapatan](#5-model-bisnis--aliran-pendapatan)
6. [Strategi Harga, Promosi & Diskon](#6-strategi-harga-promosi--diskon)
7. [Proses Checkout & Payment Gateway](#7-proses-checkout--simulasi-payment-gateway)
8. [SEO, Keamanan & Pemeliharaan](#8-rencana-seo-keamanan--pemeliharaan)
9. [Data Analitik untuk Pengambilan Keputusan](#9-rencana-penggunaan-data-analitik)
10. [Struktur Proyek](#-struktur-proyek)
11. [Cara Menjalankan](#-cara-menjalankan)

---

## 1. Tentang Bisnis

**Nama Bisnis:** [Nama Bisnis]

**Deskripsi:**
kopiKita adalah toko online yang menjual produk kopi lokal Nusantara dan alat kopi. Kami hadir untuk menyelesaikan masalah, sulitnya menemukan produk kopi yang terjangkau dan terpercaya.

**Proposisi Nilai (Value Proposition):**
- ✅ **[Keunggulan 1]** —  Harga transparan tanpa biaya tersembunyi.
- ✅ **[Keunggulan 2]** —  Pengiriman cepat & garansi produk.
- ✅ **[Keunggulan 3]** —  Checkout Mudah.

**Visi:** kopi nusantara mendunia
**Misi:** kopi kita semua 

---

## 2. Target Pasar & Segmentasi Pelanggan

**Target Pasar Utama:** Konsumen Indonesia usia 18–35 tahun yang aktif berbelanja online

**Segmentasi Pelanggan:**

| Segmen | Karakteristik | Kebutuhan Utama |
|--------|---------------|-----------------|
| **Demografis** | Usia [18–35], gender semua, pendapatan menengah | Produk berkualitas, harga wajar |
| **Geografis** | Bandung / seluruh Indonesia | Ongkir terjangkau, pengiriman cepat |
| **Psikografis** | Melek teknologi, value-seeker, trend-follower | Pengalaman belanja mulus, produk kekinian |
| **Perilaku** | Sering belanja online, sensitif promo | Diskon, cashback, kemudahan pembayaran |

---

## 3. Analisis Pasar & Pesaing

**Ukuran Pasar (Market Insight):**
Industri e-commerce di Indonesia terus bertumbuh pesat seiring meningkatnya penetrasi internet dan pembayaran digital. Segmen Kopi memiliki potensi tinggi karena langkanya kopi  di pembelanjaan digital.

**Analisis Pesaing:**

| Pesaing | Kelebihan | Kekurangan | Peluang Kami |
|---------|-----------|------------|--------------|
| [Tokopedia/Shopee] | Jangkauan luas, promo besar | Fokus niche & pelayanan personal |
| [Pesaing lokal] | Harga murah | Kurang branding | Branding & UX lebih baik |
| [Pesaing lain] | [—] | [—] | [—] |

**Keunggulan Kompetitif (Competitive Advantage):** Kurasi produk, layanan pelanggan responsif, UX website yang lebih cepat.

---

## 4. Strategi Manajemen Produk & Katalog

**Standar Deskripsi Produk (menarik & informatif):**
Setiap produk wajib memuat:
1. **Judul jelas** + kata kunci (untuk pecinta kopi).
2. **Deskripsi persuasif** yang menonjolkan manfaat, bukan hanya fitur. 

**Standar Visual:**
- Foto resolusi tinggi (min. 800×800px), latar bersih.
- foto per produk (tampak depan, detail, ).
- Rasio & ukuran konsisten agar katalog rapi.

---

## 5. Model Bisnis & Aliran Pendapatan

**Model Bisnis:** B2C

**Aliran Pendapatan (Revenue Streams):**
1. 💰 **Penjualan produk langsung** — sumber pendapatan utama.
2. 💰 **Biaya pengiriman / handling** (opsional).
3. 💰 **Produk premium / bundling** — margin lebih tinggi.
4. 💰 **Membership / langganan** (opsional) —  member dapat diskon khusus.
5. 💰 **Kerja sama afiliasi / iklan** (opsional).

---

## 6. Strategi Harga, Promosi & Diskon

**Strategi Harga (Pricing):**
- Metode: [Cost-plus / Competitive / Value-based pricing].
- Harga psikologis (mis. Rp99.000 alih-alih Rp100.000).

**Strategi Promosi:**
- 📣 Media sosial (Instagram, TikTok).
- 📣 Email marketing untuk pelanggan lama.
- 📣 Konten SEO & influencer marketing.

---

## 7. Proses Checkout & Simulasi Payment Gateway

**Alur Checkout:**
```
Keranjang → Isi Data Pengiriman → Pilih Metode Pembayaran → Konfirmasi → Pembayaran → Pesanan Selesai
```

**Payment Gateway (Simulasi/Dummy):** **Midtrans (Sandbox Mode)** ✅
> *Alternatif: Xendit atau PayPal — pilih salah satu. README ini menggunakan Midtrans sebagai contoh.*

**Cara Kerja Simulasi:**
- Menggunakan **Midtrans Snap Sandbox** (mode uji, tanpa uang sungguhan).
- Test card dummy: `4811 1111 1111 1114` (Visa), CVV `123`, exp date bebas di masa depan.
- Alur: JavaScript mengirim data pesanan → membuka popup pembayaran Midtrans → status `success/pending/failure` dikembalikan → halaman konfirmasi ditampilkan.

> ⚠️ **Catatan:** Ini adalah simulasi untuk keperluan pengembangan/demo. Tidak ada transaksi uang nyata.

---

## 8. Rencana SEO, Keamanan & Pemeliharaan

**SEO:**
- Meta title & description unik di setiap halaman.
- URL ramah SEO (mis. `/produk/nama-produk`).
- `alt` text pada semua gambar.
- Struktur heading (H1–H3) yang benar & sitemap.xml.
- Website responsif (mobile-friendly) & loading cepat.

**Keamanan:**
- 🔒 HTTPS/SSL untuk semua halaman.
- 🔒 Validasi & sanitasi input form (cegah XSS/injection).
- 🔒 Tidak menyimpan data kartu — ditangani oleh payment gateway.
- 🔒 Perlindungan data pelanggan sesuai prinsip privasi.

**Pemeliharaan:**
- Backup rutin data & kode.
- Update stok & katalog berkala.
- Pemantauan bug & perbaikan cepat.
- Uji kompatibilitas browser secara periodik.

---

## 9. Rencana Penggunaan Data Analitik

**Tools:** [Google Analytics / Google Search Console / Meta Pixel].

**Data yang Dipantau:**
- 📊 Jumlah pengunjung & sumber trafik.
- 📊 Produk paling banyak dilihat & dibeli.
- 📊 Tingkat konversi & *cart abandonment rate*.
- 📊 Perilaku pengguna (halaman keluar, durasi kunjungan).

**Pemanfaatan untuk Pengambilan Keputusan:**
- Menentukan produk yang perlu di-*restock* atau dipromosikan.
- Mengoptimalkan halaman dengan konversi rendah.
- Menyesuaikan strategi diskon berdasarkan pola pembelian.
- Menargetkan iklan ke segmen paling potensial.

---

## 📁 Struktur Proyek

```
project/
├── index.html      # Halaman utama & katalog produk
├── style.css       # Styling & tampilan website
└── script.js       # Logika keranjang, checkout & interaksi
```

---

## ▶️ Cara Menjalankan

1. Clone atau download repository ini.
2. Buka file `index.html` di browser, **atau** jalankan dengan Live Server (VS Code).
3. Untuk simulasi pembayaran, pastikan **Client Key Midtrans Sandbox** sudah diisi di `script.js`.

```bash
# Opsi menjalankan dengan server lokal sederhana:
npx serve .
# atau
python -m http.server 8000
```

---

## 👤 Pembuat
- **Nama:** Hari Akbar 
- **email:** hariiakbarrr@gmail.com

---

© 2026 KopiKita. All rights reserved.
