
export interface CarSection {
  title: string;
  content: string;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  production: string;
  carClass: string;
  bodyStyle: string;
  fuelFeed: string;
  weight: string;
  topSpeed: string;
  price: number;
  images: string[]; // Changed from image to images array
  year: number;
  sections: CarSection[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  token?: string;
}

export interface CartItem extends Car {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Success' | 'Failed';
  paymentMethod: 'GPay' | 'Paytm';
  date: string;
}
