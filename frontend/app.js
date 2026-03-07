// Auth Modal Functions
function showAuthModal() {
  document.getElementById('authModal').classList.add('active');
}

function closeAuthModal() {
  document.getElementById('authModal').classList.remove('active');
}

function switchAuth(type) {
  document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  if (type === 'login') {
    document.getElementById('loginForm').classList.add('active');
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
  } else {
    document.getElementById('signupForm').classList.add('active');
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const response = await API.login(email, password);

  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    alert('Login successful!');
    closeAuthModal();
    updateAuthUI();
  } else {
    alert(response.message || 'Login failed');
  }
}

async function handleSignup(event) {
  event.preventDefault();
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  const response = await API.signup(name, email, password);

  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    alert('Account created successfully!');
    closeAuthModal();
    updateAuthUI();
  } else {
    alert(response.message || 'Signup failed');
  }
}

function updateAuthUI() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const loginBtn = document.getElementById('loginBtn');

  if (token && user) {
    loginBtn.textContent = `Logout (${user.name})`;
    loginBtn.onclick = logout;
  } else {
    loginBtn.textContent = 'Login';
    loginBtn.onclick = showAuthModal;
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  updateAuthUI();
  alert('Logged out successfully');
  location.reload();
}

function goToCart() {
  location.href = 'cart.html';
}

// Load Featured Products
async function loadFeaturedProducts() {
  const products = await API.getProducts();
  const container = document.getElementById('featuredProducts');

  if (!products || products.length === 0) {
    // Load mock products if API returns empty
    loadMockProducts();
    return;
  }

  container.innerHTML = products.slice(0, 4).map(product => createProductCard(product)).join('');

  // Add click handlers
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = card.dataset.productId;
      location.href = `product.html?id=${productId}`;
    });
  });
}

function createProductCard(product) {
  const ratingValue = product.rating?.rate || product.rating || 4;
  const rating = '★'.repeat(Math.floor(ratingValue));

  return `
    <div class="product-card" data-product-id="${product._id || product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.title || product.name}">
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <div class="product-name">${product.title || product.name}</div>
        <div class="product-description">${product.description}</div>
        <div class="product-rating">
          <span class="stars">${rating}</span>
          <span>${ratingValue}</span>
        </div>
        <div class="product-footer">
          <div class="product-price">$${product.price}</div>
          <button class="btn-primary product-btn" onclick="addToCart('${product._id || product.id}', event)">Add Cart</button>
        </div>
      </div>
    </div>
  `;
}
function loadMockProducts() {
  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 129.99,
      category: "Electronics",
      description: "High-quality sound with noise cancellation",
      rating: 4.5,
      image: "https://m.media-amazon.com/images/I/61fJZu8p1FL._AC_.jpg"
    },
    {
      id: 2,
      name: "Smartphone Stand",
      price: 19.99,
      category: "Accessories",
      description: "Adjustable stand for all devices",
      rating: 4,
      image: "https://m.media-amazon.com/images/I/61EpoJQ8-CL._AC_SL1500_.jpg"
    },
    {
      id: 3,
      name: "USB-C Cable Pack",
      price: 24.99,
      category: "Cables",
      description: "3-pack durable USB-C cables",
      rating: 4.8,
      image: "https://m.media-amazon.com/images/I/81r0l+K12oL._AC_SL1500_.jpg"
    },
    {
      id: 4,
      name: "Portable Power Bank",
      price: 39.99,
      category: "Electronics",
      description: "20000mAh fast charging power bank",
      rating: 4.6,
      image: "https://th.bing.com/th/id/OIP.0T_eAVZxBUvWJssTMILxKgHaGm?w=220&h=196&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    }
  ];

  const container = document.getElementById("featuredProducts");
  container.innerHTML = products.map(createProductCard).join("");
}
async function addToCart(productId, event) {
  event.stopPropagation();

  // Get product from API or mock
  const products = await API.getProducts();
  let product = products.find(p => p._id === productId);

  if (!product) {
    // Use mock product if not found
    const mockProducts = [
      { _id: '1', name: 'Premium Wireless Headphones', price: 129.99 },
      { _id: '2', name: 'Smartphone Stand', price: 19.99 },
      { _id: '3', name: 'USB-C Cable Pack', price: 24.99 },
      { _id: '4', name: 'Portable Power Bank', price: 39.99 },
    ];
    product = mockProducts.find(p => p._id === productId);
  }

  if (product) {
    cart.addItem(product);
  }
}

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedProducts();
  updateAuthUI();

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        location.href = `products.html?search=${encodeURIComponent(searchInput.value)}`;
      }
    });
  }

  // Close modal when clicking outside
  window.onclick = (event) => {
    const modal = document.getElementById('authModal');
    if (event.target === modal) {
      closeAuthModal();
    }
  };
});
