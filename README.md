# PC-Store 🖥️💻

[![Next.js](https://img.shields.io/badge/Next.js-13.5-blue?logo=next.js)](https://nextjs.org/) [![MUI](https://img.shields.io/badge/MUI-5.15-blue?logo=mui)](https://mui.com/) [![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)](https://www.mongodb.com/) [![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## Project Description

**PC-Store** is a modern e-commerce web application built with the **MERN stack** and **Next.js**. It allows users to browse, search, and view products, while admins can manage products and users.

**Features:**

* User authentication (Sign In/Sign Up) with **NextAuth.js**
* Responsive design with **dark/light mode**
* Latest products displayed dynamically
* Product details page with full information
* REST API endpoints for all CRUD operations

---

## Demo

> Replace with your live demo link
> [Live Demo](https://e-shop-liard-seven.vercel.app/)

---

## Tech Stack

* **Frontend:** Next.js, React, Material-UI (MUI), TailwindCSS, Framer Motion
* **Database:** MongoDB
* **Authentication:** NextAuth.js
* **Image Upload:** ImgBB

---

## Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/Nakib64/e-shop.git
cd pc-store
```

2. **Install dependencies**

```bash
npm install
```

3. **Set environment variables** in `.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in the browser.

---

## Route Summary

### Public Pages

| Route           | Method   | Description       |
| --------------- | -------- | ----------------- |
| `/`             | GET      | Homepage          |
| `/products`     | GET      | List all products |
| `/products/:id` | GET      | Product details   |
| `/login`        | GET/POST | Sign in page      |


### API Routes

| Route               | Method | Description                  |
| ------------------- | ------ | ---------------------------- |
| `/api/products`     | GET    | Fetch all products           |
| `/api/products`     | POST   | Add new product (admin only) |


