function renderInventory() {
  const tbody = document.getElementById('admin-table');
  tbody.innerHTML = '';
  cars.forEach(car => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-zinc-800';
    tr.innerHTML = `
      <td class="px-8 py-6"><div class="flex items-center gap-4"><img src="${car.image}" class="w-16 h-16 object-cover rounded-xl"><div><div class="font-bold">${car.brand} ${car.model}</div><div class="text-xs text-zinc-400">ID ${car.id}</div></div></div></td>
      <td class="px-8 py-6">${car.year}</td>
      <td class="px-8 py-6 font-bold text-red-500">$${car.price.toLocaleString()}</td>
      <td class="px-8 py-6">${car.mileage.toLocaleString()} km</td>
      <td class="px-8 py-6 text-right"><button onclick="editCar(${car.id})" class="text-blue-400 mr-4">Editar</button><button onclick="deleteCar(${car.id})" class="text-red-400">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderPedidos() {
  const tbody = document.getElementById('pedidos-table');
  const pedidos = JSON.parse(localStorage.getItem('autoventas_pedidos')) || [];
  tbody.innerHTML = '';
  if (pedidos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-12 text-zinc-500">No hay compras registradas</td></tr>';
    return;
  }
  pedidos.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-8 py-6 text-sm">${p.fecha}</td>
      <td class="px-8 py-6 font-medium">${p.nombre || 'Sin nombre'}</td>
      <td class="px-8 py-6 text-green-400">${p.telefono || 'Sin teléfono'}</td>
      <td class="px-8 py-6">${p.carName}</td>
      <td class="px-8 py-6 text-center">${p.cantidad || 1}</td>
      <td class="px-8 py-6 font-bold text-green-400">$${ (p.total || 0).toLocaleString() }</td>
    `;
    tbody.appendChild(tr);
  });
}

function showAddModal() {
  document.getElementById('modal-title').textContent = 'Añadir Vehículo';
  document.getElementById('car-form').reset();
  document.getElementById('modal-form').classList.remove('hidden');
}

function editCar(id) {
  const car = cars.find(c => c.id === id);
  if (!car) return;
  document.getElementById('modal-title').textContent = 'Editar Vehículo';
  document.getElementById('brand').value = car.brand;
  document.getElementById('model').value = car.model;
  document.getElementById('year').value = car.year;
  document.getElementById('price').value = car.price;
  document.getElementById('mileage').value = car.mileage;
  document.getElementById('image').value = car.image;
  document.getElementById('desc').value = car.description || '';
  document.getElementById('modal-form').classList.remove('hidden');
}

function saveCar(e) {
  e.preventDefault();
  const newCar = {
    id: Date.now(),
    brand: document.getElementById('brand').value,
    model: document.getElementById('model').value,
    year: parseInt(document.getElementById('year').value),
    price: parseInt(document.getElementById('price').value),
    mileage: parseInt(document.getElementById('mileage').value),
    image: document.getElementById('image').value,
    description: document.getElementById('desc').value
  };
  cars.push(newCar);
  localStorage.setItem('autoventas_cars', JSON.stringify(cars));
  renderInventory();
  closeModal();
}

function deleteCar(id) {
  if (confirm('¿Eliminar?')) {
    cars = cars.filter(c => c.id !== id);
    localStorage.setItem('autoventas_cars', JSON.stringify(cars));
    renderInventory();
  }
}

function closeModal() {
  document.getElementById('modal-form').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  renderInventory();
  renderPedidos();
});