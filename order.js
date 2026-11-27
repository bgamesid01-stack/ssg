const METHODS = {
  username: { name: "Via Username", hint: "Kirim username Roblox kamu. Tidak perlu password.", needGp: false },
  login:    { name: "Via Login", hint: "Admin akan meminta data login lewat chat WhatsApp pribadi, bukan di website ini.", needGp: false },
  gamepass: { name: "Via Gamepass", hint: "Buat gamepass dengan harga yang kami hitung, lalu tempel linknya di sini.", needGp: true }
};

let method = "username", robux = 1000;

const price = (m, r) => Math.round(r * CONFIG.pricePerRobux[m]);
const gpPrice = r => Math.ceil(r / 0.7);

function renderChips(){
  $("chips").innerHTML = CONFIG.packages.map(r =>
    `<button type="button" class="chip" data-r="${r}" aria-pressed="${r===robux}"><b>${num(r)}</b><small>${rp(price(method,r))}</small></button>`
  ).join("");
}

function update(){
  const m = METHODS[method];
  $("hint").textContent = m.hint;
  $("gpBox").hidden = !m.needGp;
  const info = $("info");
  if (m.needGp){
    info.hidden = false;
    info.innerHTML = `Buat gamepass dengan harga <b>${num(gpPrice(robux))} Robux</b> agar kamu menerima <b>${num(robux)} Robux</b> setelah potongan Roblox 30%.`;
  } else info.hidden = true;
  document.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", t.dataset.m === method));
  renderChips();
  $("total").textContent = rp(price(method, robux));
}

document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => { method = t.dataset.m; clearErr(); update(); }));
$("chips").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  robux = +b.dataset.r; update();
});

function clearErr(){
  ["user","gp"].forEach(k => { $(k).classList.remove("bad"); });
  $("errUser").textContent = $("errGp").textContent = "";
}
function fail(inputId, errId, msg){
  $(inputId).classList.add("bad"); $(errId).textContent = msg; $(inputId).focus();
}

$("send").addEventListener("click", () => {
  clearErr();
  const user = $("user").value.trim();
  const gp = $("gp").value.trim();
  if (!/^[A-Za-z0-9_]{3,20}$/.test(user)) return fail("user","errUser","Isi username Roblox yang benar (3–20 huruf, angka, atau garis bawah).");
  if (METHODS[method].needGp && !/^https?:\/\/(www\.)?roblox\.com\/.+/i.test(gp)) return fail("gp","errGp","Tempel link gamepass dari roblox.com.");

  let msg = `Halo admin ${CONFIG.brand}, saya mau top up Robux.\n\n` +
    `Metode: ${METHODS[method].name}\n` +
    `Username Roblox: ${user}\n` +
    `Jumlah: ${num(robux)} Robux\n`;
  if (METHODS[method].needGp) msg += `Harga gamepass: ${num(gpPrice(robux))} Robux\nLink gamepass: ${gp}\n`;
  msg += `Total: ${rp(price(method, robux))}\n\nMohon info cara pembayarannya. Terima kasih.`;
  window.open(waBase + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
});

const qp = new URLSearchParams(location.search);
if (METHODS[qp.get("m")]) method = qp.get("m");
if (CONFIG.packages.includes(+qp.get("r"))) robux = +qp.get("r");
update();
