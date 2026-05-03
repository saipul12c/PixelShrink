# Dokumentasi Proyek: PixelShrink

**PixelShrink** adalah aplikasi web modern berbasis client-side untuk optimasi gambar dan penghapusan latar belakang menggunakan kecerdasan buatan (AI). Proyek ini dirancang dengan fokus pada privasi pengguna, kecepatan, dan desain antarmuka yang premium.

---

## 1. Fitur Utama

### A. Image Converter & Compressor
- **Konversi Format**: Mengubah gambar PNG menjadi WebP (format gambar web modern yang lebih ringan).
- **Kompresi Variabel**: Pengguna dapat mengatur tingkat kualitas (1-100) untuk menyeimbangkan antara ukuran file dan kejernihan gambar.
- **Real-time Preview**: Menampilkan perbandingan gambar asli dan hasil optimasi secara instan.
- **Stats Comparison**: Menampilkan ukuran file asli, ukuran baru, dan persentase penghematan ruang.

### B. AI Background Remover
- **Segmentasi Otomatis**: Menghapus latar belakang subjek (manusia, objek, dll.) secara otomatis.
- **Kualitas Tinggi**: Menghasilkan file PNG transparan dengan tepian yang halus.
- **Bertenaga AI Lokal**: Menggunakan model Machine Learning yang berjalan langsung di browser melalui WASM (WebAssembly).

---

## 2. Arsitektur Teknis

### Teknologi yang Digunakan
- **HTML5 & CSS3**: Digunakan untuk struktur semantik dan desain responsif dengan teknik *Glassmorphism*.
- **Vanilla JavaScript (ES6+)**: Logika aplikasi tanpa framework berat.
- **Canvas API**: Digunakan untuk rendering gambar dan konversi format.
- **Blob API**: Digunakan untuk menangani data gambar dan proses unduhan.
- **@imgly/background-removal**: Library AI untuk pemrosesan latar belakang berbasis browser.

### Struktur File
```text
/Conferter
├── index.html          # Halaman utama (Converter & Compressor)
├── remove-bg.html      # Halaman penghapus background
├── style.css           # Styling global untuk seluruh aplikasi
├── script.js           # Logika untuk fitur konversi gambar
├── bg-remove.js        # Logika untuk fitur penghapusan background
└── DOCUMENTATION.md    # Dokumentasi lengkap proyek
```

---

## 3. Detail Implementasi

### Fitur Konversi (script.js)
Proses konversi menggunakan `HTMLCanvasElement.toBlob()`.
```javascript
canvas.toBlob((blob) => {
    // Menghasilkan URL untuk preview dan download
}, 'image/webp', quality);
```
Metode ini memungkinkan browser melakukan kompresi WebP secara native, yang sangat cepat dan efisien.

### Fitur Hapus Background (bg-remove.js)
Menggunakan library pihak ketiga yang memuat model AI ke dalam browser.
```javascript
const resultBlob = await imglyRemoveBackground(file);
```
Proses ini berjalan secara asinkron. Model AI diunduh sekali saat pertama kali digunakan dan disimpan di cache browser.

---

## 4. Instalasi & Penggunaan

### Prasyarat
- Browser modern (Chrome, Edge, Firefox, atau Safari versi terbaru).
- Koneksi internet (hanya untuk pemuatan font Google dan library AI pada penggunaan pertama).

### Cara Menjalankan
1. Clone atau unduh folder proyek ini.
2. Buka file `index.html` langsung di browser Anda.
3. Untuk fitur Hapus Background, pastikan Anda memberikan waktu beberapa detik bagi browser untuk memuat model AI saat pertama kali halaman dibuka.

---

## 5. Keamanan & Privasi
Proyek ini mengusung prinsip **"Private by Design"**:
- Tidak ada gambar yang diunggah ke server mana pun.
- Seluruh proses pemrosesan gambar terjadi di memori komputer pengguna.
- Data gambar akan segera dihapus dari memori setelah tab browser ditutup.

---

## 6. Pengembangan Masa Depan
- Penambahan fitur konversi batch (banyak file sekaligus).
- Fitur editing dasar (crop, rotate, resize).
- Integrasi format tambahan seperti AVIF.

---
**PixelShrink** - *Optimalkan gambar Anda dengan kecerdasan dan gaya.*
