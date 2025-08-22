PC-Store – MERN Stack E-Commerce Platform
Project Description

PC-Store is a full-featured e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js) and Next.js.
The platform allows users to browse and search for products, view product details, and for admins to manage products and users.
It includes authentication with NextAuth.js, image upload via ImgBB, and a responsive, modern UI using Material-UI (MUI) and TailwindCSS.

Key Features:

User authentication (Sign In/Sign Up) with email/password and session management.

Add, edit, and delete products (admin only).

View products in a visually appealing grid with product details page.

Display latest products dynamically.

Responsive design with light/dark theme toggle.

Full CRUD operations via REST API routes.

Secure admin dashboard with role-based access.

Setup & Installation
1. Clone the repository
git clone https://github.com/yourusername/pc-store.git
cd pc-store

2. Install dependencies
npm install

3. Configure environment variables

Create a .env.local file in the root:

MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

4. Run the development server
npm run dev


Open http://localhost:3000
 in your browser.

Route Summary
Public Routes
Route	Method	Description
/	GET	Homepage
/products	GET	List all products
/products/:id	GET	Product details
/login	GET/POST	Sign in page
/signup	GET/POST	Sign up page
API Routes
Route	Method	Description
/api/products	GET	Fetch all products
/api/products	POST	Add a new product (admin only)
/api/products/:id	GET	Get product by ID
/api/products/:id	PUT	Update product (admin only)
/api/products/:id	DELETE	Delete product (admin only)
