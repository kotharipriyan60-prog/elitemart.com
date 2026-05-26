
/* PRODUCTS */
let products = [
  {id:1,name:"Milk",price:80},
  {id:2,name:"Apple",price:120},
  {id:3,name:"Bread",price:60}
];

let cart = {};
let orders = [];

/* INIT */
renderProducts();

/* RENDER PRODUCTS */
function renderProducts(){
  let html = "";

  products.forEach(p=>{
    html += `
      <div class="card">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="add(${p.id})">Add</button>
      </div>
    `;
  });

  document.getElementById("products").innerHTML = html;
}

/* ADD TO CART */
function add(id){
  cart[id] = (cart[id] || 0) + 1;
  updateCart();
}

/* UPDATE CART */
function updateCart(){
  let html = "";
  let total = 0;

  for(let id in cart){
    let p = products.find(x=>x.id==id);
    let qty = cart[id];

    total += p.price * qty;

    html += `<p>${p.name} x${qty} = ₹${p.price*qty}</p>`;
  }

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("total").innerText = total;

  updateFinal();
}

/* FINAL TOTAL */
function updateFinal(){
  let subtotal = Number(document.getElementById("total").innerText || 0);
  let tip = Number(document.getElementById("tip").value || 0);

  document.getElementById("finalTotal").innerText =
    "Final Amount: ₹" + (subtotal + tip);
}

/* NAVIGATION */
function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function showCart(){ showScreen("cart"); }
function openCaptain(){ showScreen("captain"); loadOrders(); }
function openAdmin(){ alert("Admin panel (backend needed for full system)"); }

/* PLACE ORDER (COD ONLY) */
function placeOrder(){

  if(!phone.value || !address.value){
    alert("Fill details");
    return;
  }

  let order = {
    id: Date.now(),
    items: cart,
    phone: phone.value,
    address: address.value,
    status: "Waiting for captain",
    driver: null
  };

  orders.push(order);
  cart = {};
  updateCart();

  showPopup("🎉 Order Placed (COD)");
  loadOrders();
}

/* POPUP */
function showPopup(msg){
  let p = document.getElementById("popup");
  p.style.display="block";
  p.innerHTML = `<p>${msg}</p><button onclick="closePopup()">OK</button>`;
}

function closePopup(){
  document.getElementById("popup").style.display="none";
  showScreen("home");
}

/* CAPTAIN PANEL */
function loadOrders(){
  let html = "";

  orders.forEach(o=>{
    html += `
      <div class="card">
        <p>Order: ${o.id}</p>
        <p>Status: ${o.status}</p>
        <p>Driver: ${o.driver || "None"}</p>

        ${!o.driver ? `<button onclick="accept(${o.id})">Accept</button>` : ""}
      </div>
    `;
  });

  document.getElementById("orders").innerHTML = html;
}

/* ACCEPT ORDER */
function accept(id){

  let name = prompt("Enter captain name");

  let order = orders.find(o=>o.id===id);

  if(order.driver){
    alert("Already taken");
    return;
  }

  order.driver = name;
  order.status = "Out for delivery";

  loadOrders();
}

/* SEARCH */
function search(q){

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase())
  );

  let html = "";

  filtered.forEach(p=>{
    html += `
      <div class="card">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="add(${p.id})">Add</button>
      </div>
    `;
  });

  document.getElementById("products").innerHTML = html;
}