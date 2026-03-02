function renderCars(filtered = cars) {
  const grid = document.getElementById('car-grid');
  grid.innerHTML = '';
  filtered.forEach(car => {
    const card = document.createElement('div');
    card.className = 'car-card bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden cursor-pointer';
    card.innerHTML = `
      <img src="${car.image}" class="w-full h-56 object-cover">
      <div class="p-6">
        <h3 class="font-bold text-xl">${car.brand} ${car.model}</h3>
        <p class="text-zinc-400">${car.year} • ${car.mileage.toLocaleString()} km</p>
        <p class="text-red-500 font-bold text-3xl mt-3">$${car.price.toLocaleString()}</p>
      </div>
    `;
    card.onclick = () => showDetail(car);
    grid.appendChild(card);
  });
}

function filterCars() {
  const term = document.getElementById('search').value.toLowerCase();
  const filtered = cars.filter(c => 
    `${c.brand} ${c.model}`.toLowerCase().includes(term)
  );
  renderCars(filtered);
}

let currentCar = null;

function showDetail(car) {
  currentCar = car;
  document.getElementById('detail-img').src = car.image;
  document.getElementById('detail-title').textContent = `${car.brand} ${car.model}`;
  document.getElementById('detail-year').textContent = car.year;
  document.getElementById('detail-km').textContent = car.mileage.toLocaleString();
  document.getElementById('detail-price').textContent = '$' + car.price.toLocaleString();
  document.getElementById('detail-desc').textContent = car.description;
  document.getElementById('detail-modal').classList.remove('hidden');
}

function closeDetail() {
  document.getElementById('detail-modal').classList.add('hidden');
}

function showPaymentForm() {
  if (!currentCar) return;
  document.getElementById('pay-car-id').value = currentCar.id;
  document.getElementById('pay-car-name').value = `${currentCar.brand} ${currentCar.model} ${currentCar.year}`;
  updateTotalPrice();
  document.getElementById('quantity').addEventListener('change', updateTotalPrice);
  document.getElementById('payment-modal').classList.remove('hidden');
  closeDetail();
}

function updateTotalPrice() {
  if (!currentCar) return;
  const qty = parseInt(document.getElementById('quantity').value) || 1;
  const total = currentCar.price * qty;
  document.getElementById('total-price').textContent = '$' + total.toLocaleString() + ' (x' + qty + ')';
}

function closePaymentModal() {
  document.getElementById('payment-modal').classList.add('hidden');
}

function submitPayment(e) {
  e.preventDefault();
  const qty = parseInt(document.getElementById('quantity').value) || 1;
  const pedido = {
    id: Date.now(),
    fecha: new Date().toLocaleString('es-DO'),
    carName: document.getElementById('pay-car-name').value,
    cantidad: qty,
    total: currentCar.price * qty,
    tipoPago: "Tarjeta (simulada)",
    nombre: document.getElementById('buyer-name').value.trim() || 'Anónimo',
    telefono: document.getElementById('buyer-phone').value.trim() || 'No proporcionado'
  };

  let pedidos = JSON.parse(localStorage.getItem('autoventas_pedidos')) || [];
  pedidos.push(pedido);
  localStorage.setItem('autoventas_pedidos', JSON.stringify(pedidos));

  alert(`¡Pago simulado exitoso!\n\n${pedido.nombre}, has comprado ${qty} unidad(es) del ${pedido.carName}\nTotal: $${pedido.total.toLocaleString()}`);
  closePaymentModal();
  document.getElementById('payment-form').reset();
}

document.addEventListener('DOMContentLoaded', () => {
  renderCars();
});