# ShopHub - Full-Stack E-Commerce Store

A complete full-stack e-commerce application built with Express.js, MongoDB, and pure HTML/CSS frontend.

Demo Video:-
https://drive.google.com/file/d/1RY-JikriePz11wDfOX5MoUQ0uVBblW6O/view?usp=sharing

## Project Structure

```
project/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── orders.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── products.html
│   ├── product.html
│   ├── cart.html
│   ├── checkout.html
│   ├── order-confirmation.html
│   ├── about.html
│   ├── help.html
│   ├── styles.css
│   ├── api.js
│   ├── cart.js
│   └── app.js
├── .env
└── package.json
```

## Features

### Authentication
- User signup with email and password
- Secure login with JWT tokens
- Password hashing with bcryptjs
- Token-based session management

### Products
- Browse all products with pagination
- Search products by name
- Filter by category
- Filter by price range
- Product details page
- Product ratings and reviews

### Shopping Cart
- Add items to cart
- Remove items from cart
- Update item quantities
- Persistent cart storage (localStorage)
- Real-time cart total calculation

### Checkout
- Shipping address form
- Payment information collection
- Order summary with total calculation
- Order confirmation with order ID
- Delivery timeline information

### Orders
- Create orders from cart
- View order history
- Track order status
- Store orders in MongoDB

## Tech Stack

### Backend
- **Node.js + Express**: Server and API endpoints
- **MongoDB**: Database for users, products, and orders
- **JWT (jwt-simple)**: Authentication tokens
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin requests

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Responsive design with flexbox
- **Vanilla JavaScript**: DOM manipulation and API calls
- **LocalStorage**: Client-side cart persistence

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas account (or local MongoDB)
- Git

### Step 1: Clone or Setup Project

```bash
cd /path/to/project
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
```

**Important**: Replace with your actual MongoDB connection string and a secure JWT secret.

### Step 3: Setup MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new account or log in
3. Create a new cluster
4. Get your connection string
5. Replace `MONGODB_URI` in `.env`

### Step 4: Start the Backend Server

```bash
npm start
# or for development with auto-reload
npm run dev
```

The server will run on `http://localhost:5000`

### Step 5: Access the Frontend

Open your browser and navigate to:
```
http://localhost:5000
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login and get JWT token

### Products
- `GET /api/products` - Get all products with optional filters
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories/list` - Get all categories

### Cart
- `POST /api/cart/validate` - Validate cart items and get current prices

### Orders
- `POST /api/orders` - Create new order (requires auth)
- `GET /api/orders` - Get user's orders (requires auth)
- `GET /api/orders/:orderId` - Get single order (requires auth)

## Authentication Flow

1. **Sign Up**: User creates account with name, email, password
2. **Login**: User logs in with email and password
3. **Token Generation**: JWT token is generated and stored in localStorage
4. **Protected Routes**: Token is sent with authenticated API requests

## Cart Persistence

Cart is stored in browser's localStorage:
- Persists across page refreshes
- Cleared after successful checkout
- Stored as JSON array of items

## Testing the Application

### Create a Test Account
1. Click "Login" button
2. Switch to "Sign Up" tab
3. Enter test credentials (e.g., test@example.com)
4. Submit

### Add Products to Cart
1. Browse products on homepage or products page
2. Click "Add Cart" button on any product
3. View cart in the cart button (number updates)

### Checkout Process
1. Click "Cart" button to view cart
2. Click "Proceed to Checkout"
3. Fill in shipping address
4. Enter test card: 4242 4242 4242 4242 (any future date, any CVV)
5. Submit order
6. See order confirmation page

## Demo Test Credentials

```
Email: test@example.com
Password: test123
```

## Deployment

### Deploy Backend (Render.com)

1. Push code to GitHub
2. Connect GitHub repository to Render
3. Create new Web Service
4. Set environment variables in Render dashboard
5. Deploy

### Deploy Frontend (Netlify)

1. Build frontend files (they're already production-ready)
2. Connect GitHub to Netlify
3. Deploy frontend folder
4. Update API_BASE_URL in api.js to point to deployed backend

## Troubleshooting

### MongoDB Connection Error
- Verify connection string in .env
- Check MongoDB Atlas IP whitelist includes your IP
- Ensure network is not blocking connection

### CORS Errors
- Backend CORS is configured to accept requests
- Verify API_BASE_URL in frontend api.js matches backend URL

### Cart Not Persisting
- Check browser localStorage is enabled
- Clear browser cache and try again

### Authentication Issues
- Ensure token is being stored in localStorage
- Check browser console for error messages
- Verify JWT_SECRET matches between signup/login

## Future Enhancements

- Payment gateway integration (Stripe)
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard
- Email notifications
- Advanced search and filtering
- User profiles and order history page
- Social login (Google, Facebook)

## Security Notes

- Change JWT_SECRET in production
- Use HTTPS in production
- Implement rate limiting
- Add input validation
- Use environment variables for sensitive data
- Consider adding 2FA for authentication

## License

MIT License - Feel free to use this project for learning and personal use.

## Support

For issues or questions, contact: support@shophub.com or call 1-800-SHOPHUB

---

**Happy Shopping!** 🛍️
