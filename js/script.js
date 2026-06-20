const WA_NUMBER = "6282275996118";

console.log("SCRIPT BERJALAN");;

const products = [
  {nama:"Manisan Mangga", harga:10000, img:"images/Manisan-Mangga.jpg"},
  {nama:"Manisan Lico", harga:10000, img:"images/Manisan-Lico.jpg"},
  {nama:"Manisan Salak", harga:10000, img:"images/Manisan-Salak.jpg"},
  {nama:"Manisan Buah Pala", harga:15000, img:"images/Manisan-Buah-Pala.jpg"},

  {nama:"Keripik Bawang", harga:15000, img:"images/Keripik-Bawang.jpg"},
  {nama:"Keripik Jagung", harga:5000, img:"images/Keripik-Jagung.jpg"},
  {nama:"Keripik Pedas", harga:10000, img:"images/Keripik-Pedas.jpg"},
  {nama:"Bowsen", harga:15000, img:"images/Bowsen.jpg"},

  {nama:"Keripik Kulit", harga:15000, img:"images/Keripik-Kulit.jpg"},
  {nama:"Keripik Peyek", harga:15000, img:"images/Keripik-Peyek.jpg"},

  {nama:"Emping 500g", harga:75000, img:"images/Emping-500g.jpg"},
  {nama:"Emping 1kg", harga:160000, img:"images/Emping-1kg.jpg"},

  {nama:"Rangginang", harga:23000, img:"images/Rangginang.jpg"},

  {nama:"Bugring", harga:15000, img:"images/Bugring.jpg"},

  {nama:"Manisan Kelapa", harga:15000, img:"images/Manisan-Kelapa.jpg"},
  {nama:"Manisan Kelapa Premium", harga:20000, img:"images/Manisan-Kelapa-Premium.jpg"},

  {nama:"Bolu Ikan", harga:15000, img:"images/Bolu-Ikan.jpg"},

  {nama:"Dodol Ketan", harga:10000, img:"images/Dodol-Ketan.jpg"},
  {nama:"Dodol Spesial", harga:25000, img:"images/Dodol-Spesial.jpg"},

  {nama:"Kue Kacang Atik", harga:25000, img:"images/Kue-Kacang-Atik.jpg"},
  {nama:"Kue Sabang", harga:25000, img:"images/Kue-Sabang.jpg"},
  {nama:"Cakar Ayam", harga:15000, img:"images/Cakar-Ayam.jpg"},

  {nama:"Asam Jawa", harga:20000, img:"images/Asam-Jawa.jpg"},

  {nama:"Keripik Ubi Sambal", harga:15000, img:"images/Keripik-Ubi-Sambal.jpg"},
  {nama:"Keripik Ubi", harga:10000, img:"images/Keripik-Ubi.jpg"},

  {nama:"Roti Sapit", harga:13000, img:"images/Roti-Sapit.jpg"},

  {nama:"Keripik Tempe", harga:15000, img:"images/Keripik-Tempe.jpg"},

  {nama:"Kacang Intip", harga:15000, img:"images/Kacang-Intip.jpg"},

  {nama:"Keripik Pisang", harga:15000, img:"images/Keripik-Pisang.jpg"},

  {nama:"Kerupuk Ikan 10K", harga:10000, img:"images/Kerupuk-Ikan-10K.jpg"},
  {nama:"Kerupuk Ikan 15K", harga:15000, img:"images/Kerupuk-Ikan-15K.jpg"},

  {nama:"Kopi Ule Kareng", harga:35000, img:"images/Kopi-Ule-Kareng.jpg"},

  {nama:"Keripik Sukon", harga:15000, img:"images/Keripik-Sukon.jpg"}
];


// ========================
// LOCALSTORAGE CART
// ========================
function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}



function tambahKeranjang(nama, harga){
  let cart = getCart();

  let index = cart.findIndex(item => item.nama === nama);

  if(index !== -1){
    cart[index].qty++;
  } else {
    cart.push({nama, harga, qty:1});
  }

  saveCart(cart);
  alert(nama + " masuk ke keranjang");
}


function tampilProduk(){
  let container = document.getElementById("produkContainer");
  if(!container) return;

  let html = "";

  products.forEach(p=>{
    html += `
      <div class="col-md-3 mb-3">
        <div class="card h-100">
          <img src="${p.img}" class="card-img-top">
          <div class="card-body">
            <h6>${p.nama}</h6>
            <p>Rp ${p.harga}</p>
            <button class="btn btn-success w-100"
              onclick="tambahKeranjang('${p.nama}',${p.harga})">
              Tambah Keranjang
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}



function tampilKeranjang(){
  let cart = getCart();
  let container = document.getElementById("isiKeranjang");
  let totalEl = document.getElementById("total");

  if(!container) return;

  let html = "";
  let total = 0;

  cart.forEach((item,i)=>{
    let subtotal = item.harga * item.qty;
    total += subtotal;

    html += `
      <div class="card mb-2 p-2">
        <div class="d-flex justify-content-between align-items-center">

          <div>
            <h6>${item.nama}</h6>
            <p>Rp ${item.harga}</p>
          </div>

          <div>
            <button onclick="kurang(${i})">-</button>
            <span class="mx-2">${item.qty}</span>
            <button onclick="tambah(${i})">+</button>
            <button onclick="hapus(${i})">Hapus</button>
          </div>

          <div><b>Rp ${subtotal}</b></div>

        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if(totalEl) totalEl.innerHTML = "Rp " + total;
}



function tambah(i){
  let cart = getCart();
  cart[i].qty++;
  saveCart(cart);
  tampilKeranjang();
}

function kurang(i){
  let cart = getCart();
  cart[i].qty--;

  if(cart[i].qty <= 0){
    cart.splice(i,1);
  }

  saveCart(cart);
  tampilKeranjang();
}                       

function hapus(i){
  let cart = getCart();
  cart.splice(i,1);
  saveCart(cart);
  tampilKeranjang();
}


function checkout(){

  let cart = getCart();

  if(cart.length === 0){
    alert("Keranjang kosong!");
    return;
  }

  //  ambil data customer
  let nama = document.getElementById("nama")?.value || "Tidak diisi";
  let alamat = document.getElementById("alamat")?.value || "Tidak diisi";
  let payment = document.getElementById("payment")?.value || "COD";

  //  order ID otomatis
  let orderId = "INV-" + Date.now();

  let total = 0;
  let pesan = "🛒 *PESANAN TOKO JUNET ACEH*\n\n";

  //  list barang
  cart.forEach((item, i)=>{
    let subtotal = item.harga * item.qty;
    total += subtotal;

    pesan += `${i+1}. ${item.nama} x${item.qty} = Rp ${subtotal}\n`;
  });

  //  tambahan info
  pesan += `\n🧾 *ID Order: ${orderId}*`;
  pesan += `\n💰 *Total: Rp ${total}*`;
  pesan += `\n💳 *Metode: ${payment}*`;
  pesan += `\n👤 Nama: ${nama}`;
  pesan += `\n📍 Alamat: ${alamat}`;
  pesan += `\n\nTerima kasih sudah belanja 🙏`;

  //  kosongkan cart
  localStorage.removeItem("cart");

  //  buka WhatsApp
  let url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");

  // refresh tampilan
  tampilKeranjang();
}