const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
    // Car operations
    async getCars() {
        const response = await fetch(`${API_BASE_URL}/cars`);
        if (!response.ok) throw new Error('Failed to fetch cars');
        return response.json();
    },

    async getCar(id: string) {
        const response = await fetch(`${API_BASE_URL}/cars/${id}`);
        if (!response.ok) throw new Error('Failed to fetch car details');
        return response.json();
    },

    async createCar(carData: any) {
        const response = await fetch(`${API_BASE_URL}/cars`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(carData)
        });
        if (!response.ok) throw new Error('Failed to register car');
        return response.json();
    },

    async updateCar(id: string, carData: any) {
        const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(carData)
        });
        if (!response.ok) throw new Error('Failed to update car');
        return response.json();
    },

    async deleteCar(id: string) {
        const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete car');
        return response.json();
    },

    // Auth operations
    async login(credentials: any) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!response.ok) throw new Error('Invalid credentials');
        return response.json();
    },

    async register(userData: any) {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Registration failed');
        }
        return response.json();
    }
};
