class Cart {
  constructor() {
    this.items = this.loadCart();
    this.updateCartCount();
  }

  loadCart() {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.updateCartCount();
  }

  addItem(product) {
    const existingItem = this.items.find(item => item.productId === product._id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    this.saveCart();
    this.showNotification('Added to cart!');
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.productId !== productId);
    this.saveCart();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.productId === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart();
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  updateCartCount() {
    const countEl = document.getElementById('cartCount');
    if (countEl) {
      countEl.textContent = this.getItemCount();
    }
  }

  showNotification(message) {
    // Simple notification (can be enhanced with a toast library)
    alert(message);
  }
}

const cart = new Cart();
