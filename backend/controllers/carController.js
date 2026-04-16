const Car = require('../models/Car');

// Get all cars
const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ available: true }).sort({ createdAt: -1 });
    const formattedCars = cars.map(car => {
      const obj = car.toObject();
      obj.id = obj._id;
      return obj;
    });
    res.json(formattedCars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get car by ID
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    const formattedCar = car.toObject();
    formattedCar.id = formattedCar._id;
    res.json(formattedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new car
const createCar = async (req, res) => {
  const car = new Car(req.body);
  try {
    const newCar = await car.save();
    const formattedCar = newCar.toObject();
    formattedCar.id = formattedCar._id;
    res.status(201).json(formattedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a car
const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCar) return res.status(404).json({ message: 'Car not found' });
    const formattedCar = updatedCar.toObject();
    formattedCar.id = formattedCar._id;
    res.json(formattedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a car
const deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
};
