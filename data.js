let cars = JSON.parse(localStorage.getItem('autoventas_cars')) || [
  { id: 1, brand: "Toyota", model: "Corolla Cross", year: 2023, price: 29500, mileage: 18000, image: "https://picsum.photos/id/1015/600/400", description: "Híbrido, full equipo" },
  { id: 2, brand: "Honda", model: "CR-V Touring", year: 2022, price: 33800, mileage: 32000, image: "https://picsum.photos/id/180/600/400", description: "Un solo dueño" },
  { id: 3, brand: "Kia", model: "Seltos SX", year: 2024, price: 27800, mileage: 8500, image: "https://picsum.photos/id/1025/600/400", description: "Garantía hasta 2029" },
  { id: 4, brand: "Hyundai", model: "Tucson Limited", year: 2023, price: 31200, mileage: 14500, image: "https://picsum.photos/id/1060/600/400", description: "Techo panorámico" }
];

if (!localStorage.getItem('autoventas_cars')) {
  localStorage.setItem('autoventas_cars', JSON.stringify(cars));
}