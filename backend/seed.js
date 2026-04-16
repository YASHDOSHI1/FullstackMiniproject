const mongoose = require('mongoose');
require('dotenv').config();
const Car = require('./models/Car');

const INITIAL_CARS = [
  {
    name: '1965 Aston Martin DB5',
    brand: 'Aston Martin',
    production: '1963-1965 (1,059 units)',
    carClass: 'Grand tourer',
    bodyStyle: '2 door 2+2 coupe',
    fuelFeed: '3 SU Carburettors',
    weight: '1,502kg (3,311 lb)',
    topSpeed: '145 mph (233km/h)',
    price: 635500,
    year: 1965,
    images: ['/image1.png'],
    sections: [
      { title: 'Historical Significance', content: 'The DB5 is the ultimate symbol of British sophistication, forever linked with the 007 film franchise.' },
      { title: 'Performance Engineering', content: 'Features a 4.0L straight-six engine that delivered a smooth but powerful grand touring experience.' },
      { title: 'Collector Status', content: 'Among the most desirable vintage cars in the world, often fetching record prices at international auctions.' }
    ]
  },
  {
    name: '1967 Mustang GT',
    brand: 'Ford',
    production: '1967-1968 (Limited Series)',
    carClass: 'Muscle car',
    bodyStyle: '2 door fastback',
    fuelFeed: 'Four-barrel Carburettor',
    weight: '1,250kg (2,755 lb)',
    topSpeed: '120 mph (193km/h)',
    price: 9000000,
    year: 1967,
    images: ['https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&q=80&w=800'],
    sections: [
      { title: 'Muscle Heritage', content: 'A defining moment in American automotive history, the 1967 fastback is widely considered the peak Mustang design.' },
      { title: 'Engine Configuration', content: 'Equipped with the high-performance 289 V8, providing the signature roar that defines the pony car era.' }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');
    
    await Car.deleteMany({});
    console.log('Cleared existing cars.');
    
    await Car.insertMany(INITIAL_CARS);
    console.log('Mock data seeded successfully!');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
