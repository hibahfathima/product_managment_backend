# Prodify - Product Management Backend

A robust Node.js and Express-based backend for the Prodify product management application. This API handles user authentication, product categorization, and product management with advanced security and validation features.

## 🚀 Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [Cookie-Parser](https://www.npmjs.com/package/cookie-parser)
- **Security**: [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) (Hashing), [Helmet](https://helmetjs.github.io/) (Security Headers), [CORS](https://www.npmjs.com/package/cors)
- **Validation**: [Express-Validator](https://express-validator.github.io/docs/)
- **File Uploads**: [Multer](https://github.com/expressjs/multer)
- **Email**: [Nodemailer](https://nodemailer.com/)

---

## ✨ Features

### 1. Secure Authentication
- User Registration & Login with hashed passwords (bcrypt).
- JWT-based authorization stored in HTTP-only cookies for protection against XSS.
- Backend request validation for auth routes.

### 2. Multi-User Categorization
- **Categories**: Users can create their own private product categories.
- **Sub-Categories**: Products can be sub-divided within categories.
- **Uniqueness**: Per-user case-insensitive uniqueness for category and subcategory names.

### 3. Product Management
- Full CRUD operations for products.
- Support for multiple product variants (Name, Price, Discount, Size, Stock, Type).
- Image uploads support (up to 5 images per product).

### 4. Wishlist & Search
- Integrated wishlist management for each user.
- Global product search using case-insensitive regex on product names.

---

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment setup**:
   Create a `.env` file in the root and add:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

### 🛡️ Authentication
- `POST /api/user/signup` - Register a new user
- `POST /api/user/login` - Login user
- `POST /api/user/logout` - Logout user (Clear cookies)
- `GET /api/user/verify` - Verify current user session

### 📦 Categories & Sub-Categories
- `POST /api/product/category/add` - Create a new category
- `GET /api/product/category/all` - Get all user categories
- `POST /api/product/subcategory/add` - Create a sub-category
- `GET /api/product/subcategory/:categoryId` - Get sub-categories by category

### 🏷️ Products
- `POST /api/product/add` - Add new product (with images)
- `GET /api/product/all` - Get products (supports search, category filter, pagination)
- `GET /api/product/details/:id` - Get single product details
- `PUT /api/product/update/:id` - Update existing product

### ❤️ Wishlist
- `POST /api/wishlist/add` - Add product to wishlist
- `GET /api/wishlist/all` - Get user wishlist
- `DELETE /api/wishlist/remove/:id` - Remove from wishlist

---

## 🧹 Code Quality

- **Linting**: `npm run lint`
- **Formatting**: `npm run format`
- **Spell Check**: `npm run spell`

---

## 🛡️ Security Implementation Note

This backend ensures that user data is isolated. Each request is verified via middleware that extracts the `userId` from the JWT token. Database indexes are configured as **composite unique indexes** (`name` + `userId`) to allow different users to have categories with the same name without collision.
