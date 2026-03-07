// ✅ FIX: Updated to port 5000 (backend), since Next.js runs on 3000
const API_BASE_URL = 'https://shophub-backend-qoma.onrender.com';

class API {
  // Auth Methods
  static async signup(name, email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      return await response.json();
    } catch (error) {
      return { message: 'Network error', error: error.message };
    }
  }

  static async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return await response.json();
    } catch (error) {
      return { message: 'Network error', error: error.message };
    }
  }

  // Product Methods
  static async getProducts(search = '', category = '', minPrice = '', maxPrice = '') {
    try {
      let url = `${API_BASE_URL}/products?`;
      if (search) url += `search=${encodeURIComponent(search)}&`;
      if (category) url += `category=${encodeURIComponent(category)}&`;
      if (minPrice) url += `minPrice=${minPrice}&`;
      if (maxPrice) url += `maxPrice=${maxPrice}&`;

      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      return { message: 'Network error', error: error.message };
    }
  }

  static async getProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      return await response.json();
    } catch (error) {
      return { message: 'Network error', error: error.message };
    }
  }

  static async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/products/categories/list`);
      return await response.json();
    } catch (error) {
      return { message: 'Network error', error: error.message };
    }
  }

  // Cart Methods
  static async validateCart(items) {
    const token = localStorage.getItem('token');
    if (!token) return { items: [], total: 0 };

    try {
      const response = await fetch(`${API_BASE_URL}/cart/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      });
      return await response.json();
    } catch (error) {
      return { items: [], total: 0 };
    }
  }

  // Order Methods
  static async createOrder(items, total, shippingAddress) {
    const token = localStorage.getItem('token');
    if (!token) return { message: 'Please login first' };

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ items, total, shippingAddress }),
      });
      return await response.json();
    } catch (error) {
      return { message: 'Network error', error: error.message };
    }
  }

  static async getOrders() {
    const token = localStorage.getItem('token');
    if (!token) return [];

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return await response.json();
    } catch (error) {
      return [];
    }
  }

  static async getOrderById(orderId) {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return await response.json();
    } catch (error) {
      return null;
    }
  }
}
