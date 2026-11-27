
/* ====== PENGATURAN: ubah bagian ini saja ====== */
const CONFIG = {
  brand: "Saputra Store Game",
  whatsapp: "6281234567890",        // nomor WA admin, format 62..., tanpa + dan tanpa spasi
  packages: [100, 200, 400, 800, 1000, 2000], // pilihan jumlah Robux
  pricePerRobux: {                  // harga rupiah per 1 Robux (ubah sesuai harga kamu)
    username: 140,
    login: 125,
    gamepass: 120
  }
};
/* ============================================== */

const $ = id => document.getElementById(id);
const rp = n => "Rp " + n.toLocaleString("id-ID");
const num = n => n.toLocaleString("id-ID");
const waBase = "https://wa.me/" + CONFIG.whatsapp;
document.querySelectorAll(".fbrand,#brandName").forEach(e => e.textContent = CONFIG.brand);
const yr = $("yr"); if (yr) yr.textContent = new Date().getFullYear();
const fab = $("waFab");
if (fab) fab.href = waBase + "?text=" + encodeURIComponent("Halo admin " + CONFIG.brand + ", saya mau tanya top up Robux.");
