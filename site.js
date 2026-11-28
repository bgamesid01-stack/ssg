
/* ====== PENGATURAN: ubah bagian ini saja ====== */
const CONFIG = {
  brand: "Saputra Store Game",
  whatsapp: "6281234567890",        // nomor WA admin, format 62..., tanpa + dan tanpa spasi
  // daftar harga tiap metode, format: [jumlah Robux, harga rupiah]
  // tambah, ubah, atau hapus baris sesuka kamu
  prices: {
    username: [
      [100, 16000], [200, 31000], [300, 46000], [400, 61000],
      [500, 74000], [600, 91000], [700, 107000], [800, 122000],
      [900, 135000], [1000, 152000], [1500, 227000], [2000, 302000],
      [5000, 751000]
    ],
    login: [
      [80, 15500], [500, 79000], [1000, 156000], [1500, 236000],
      [2000, 303000]
    ],
    gamepass: [
      [100, 14500], [200, 27500], [300, 41000], [400, 54500],
      [500, 68000], [600, 81500], [700, 95000], [800, 108500],
      [900, 122000], [1000, 135500], [1500, 203000], [2000, 270500]
    ]
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

const bg = $("burger"), mn = $("menu");
if (bg && mn) {
  const set = o => { mn.hidden = !o; bg.setAttribute("aria-expanded", o); };
  bg.addEventListener("click", e => { e.stopPropagation(); set(mn.hidden); });
  mn.addEventListener("click", e => { if (e.target.closest("a")) set(false); });
  document.addEventListener("click", e => { if (!mn.contains(e.target)) set(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") set(false); });
  const wm = $("waMenu"); if (wm && fab) wm.href = fab.href;
}
