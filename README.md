# Saputra Store Game – Website Top Up Robux

## Sebelum upload
Buka `site.js`, ubah bagian CONFIG:
- whatsapp: nomor admin, format 62xxxxxxxxxx (tanpa + dan spasi)
- prices: daftar paket dan harga tiap metode, format [jumlah Robux, harga rupiah]

## Upload ke GitHub Pages
1. Buat repository baru di GitHub.
2. Upload SEMUA isi folder ini (bukan file zip-nya) ke repository.
3. Settings > Pages > Source: branch main, folder / (root) > Save.
4. Situs aktif di https://username.github.io/nama-repo

## Kalau perubahan tidak muncul
Upload ulang SEMUA file (index.html, order.html, style.css, site.js, order.js, gambar), lalu buka website dengan refresh paksa
(Ctrl+Shift+R di komputer, atau buka lewat tab incognito di HP). Browser kadang masih menyimpan file lama.

## Domain dan Google
- File CNAME berisi domain www.ssg.my.id (jangan dihapus). Di GitHub: Settings > Pages > Custom domain, lalu centang Enforce HTTPS.
- sitemap.xml dan robots.txt sudah ada. Daftarkan website di search.google.com/search-console,
  tempel tag verifikasi di index.html (cari komentar "Tempel tag verifikasi"), lalu kirim sitemap: sitemap.xml
