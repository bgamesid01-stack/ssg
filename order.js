const METHODS = {
  username: { name: "Via Username", hint: "Kirim username Roblox kamu. Tidak perlu password.", needGp: false },
  login:    { name: "Via Login", hint: "Isi username dan password akun Roblox kamu. Data hanya dikirim ke admin lewat WhatsApp.", needGp: false },
  gamepass: { name: "Via Gamepass", hint: "Buat gamepass dengan harga yang kami hitung, lalu tempel linknya di sini.", needGp: true }
};

let method = "username", robux = 1000;

const list = m => CONFIG.prices[m];
const price = (m, r) => (list(m).find(p => p[0] === r) || [r, 0])[1];
const gpPrice = r => Math.ceil(r / 0.7);

function renderChips(){
  const l = list(method), tier = i => i < l.length / 3 ? 1 : i < l.length * 2 / 3 ? 2 : 3;
  $("chips").innerHTML = l.map(([r, p], i) =>
    `<button type="button" class="pk" data-r="${r}" aria-pressed="${r === robux}"><span class="stk">${'<img src="robux.png" alt="" width="50" height="45">'.repeat(tier(i))}</span><b>${num(r)}</b><small>Robux</small><span class="pr">${rp(p)}</span></button>`
  ).join("");
}

function update(){
  const m = METHODS[method];
  $("hint").textContent = m.hint;
  $("gpBox").hidden = !m.needGp;
  $("pwBox").hidden = method !== "login";
  const info = $("info");
  if (m.needGp){
    info.hidden = false;
    info.innerHTML = `Buat gamepass dengan harga <b>${num(gpPrice(robux))} Robux</b> agar kamu menerima <b>${num(robux)} Robux</b> setelah potongan Roblox 30%.`;
  } else info.hidden = true;
  $("mname").textContent = m.name;
  renderChips();
  $("total").textContent = rp(price(method, robux));
}

$("chips").addEventListener("click", e => {
  const b = e.target.closest(".pk"); if (!b) return;
  robux = +b.dataset.r; update();
});

function clearErr(){
  ["user","gp","pw"].forEach(k => { $(k).classList.remove("bad"); });
  $("errUser").textContent = $("errGp").textContent = $("errPw").textContent = "";
}
function fail(inputId, errId, msg){
  $(inputId).classList.add("bad"); $(errId).textContent = msg; $(inputId).focus();
}

$("send").addEventListener("click", () => {
  clearErr();
  const user = $("user").value.trim();
  const gp = $("gp").value.trim();
  const pw = $("pw").value;
  if (!/^[A-Za-z0-9_]{3,20}$/.test(user)) return fail("user","errUser","Isi username Roblox yang benar (3–20 huruf, angka, atau garis bawah).");
  if (method === "login" && !pw) return fail("pw","errPw","Isi password akun Roblox.");
  if (METHODS[method].needGp && !/^https?:\/\/(www\.)?roblox\.com\/.+/i.test(gp)) return fail("gp","errGp","Tempel link gamepass dari roblox.com.");

  let msg = `Halo admin ${CONFIG.brand}, saya mau top up Robux.\n\n` +
    `Metode: ${METHODS[method].name}\n` +
    `Username Roblox: ${user}\n` + (method === "login" ? `Password: ${pw}\n` : "") +
    `Jumlah: ${num(robux)} Robux\n`;
  if (METHODS[method].needGp) msg += `Harga gamepass: ${num(gpPrice(robux))} Robux\nLink gamepass: ${gp}\n`;
  msg += `Total: ${rp(price(method, robux))}\n\nMohon info cara pembayarannya. Terima kasih.`;
  window.open(waBase + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
});

const qp = new URLSearchParams(location.search);
if (METHODS[qp.get("m")]) {
  method = qp.get("m");
  if (list(method).some(p => p[0] === +qp.get("r"))) robux = +qp.get("r");
  $("ttl").textContent = "Buat pesanan";
  $("form").hidden = false;
  update();
} else {
  $("chooser").hidden = false;
}

$("eye").addEventListener("click", () => {
  const p = $("pw"), show = p.type === "password";
  p.type = show ? "text" : "password";
  $("eye").textContent = show ? "Sembunyikan" : "Lihat";
});
