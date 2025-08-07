# 🍽️ Restaurant Management Website

A full-stack restaurant management platform built with the MERN stack. The platform allows customers to explore, search, and purchase foods, while restaurant staff can manage food listings, orders, and more.

## 🌐 Live Website  
🔗 [Live Site](https://ma-restaurant.netlify.app)

---

## 🚀 Project Purpose

This project aims to provide an efficient and visually appealing restaurant platform where:
- ✅ Users can browse, view, and purchase food items.
- ✅ Admins/owners can add, update, and manage food listings.
- ✅ All data is securely handled with authentication and protected routes.

---

## 🛠️ Technologies Used

### 🖥️ Client (Frontend)
- **React.js**
- **React Router DOM**
- **Tailwind CSS + DaisyUI**
- **Firebase Authentication**
- **Framer Motion**
- **SweetAlert2**
- **React Toastify**
- **yet-another-react-lightbox**
- **Moment.js**
- **JWT (JSON Web Token)**

### 🗄️ Server (Backend)
- **Node.js**
- **Express.js**
- **MongoDB (with Mongoose)**
- **CORS**
- **Dotenv**
- **JWT for route protection**
- **Firebase Admin SDK**

---

## 🔐 Authentication & Authorization

- 🔐 Email/password login and registration
- 🔑 Google login (Firebase Social Auth)
- 🔏 JWT token generation, storage, and validation
- 🧑‍💼 Role-based route protection (User vs Owner/Admin)

---

## 🧭 Website Structure

### 🌍 Public Routes:
- `/` – Home  
- `/all-foods` – All Foods Page  
- `/gallery` – Image Gallery  
- `/login` – Login Page  
- `/register` – Register Page  
- `/food/:id` – Single Food Page  

### 🔒 Private Routes:
- `/purchase/:id` – Purchase Food  
- `/add-food` – Add Food (Only owners)  
- `/my-foods` – My Foods (Only food creator)  
- `/my-orders` – My Orders  

---

## ✨ Key Features

- 🔍 **Search & filter foods**
- 🛒 **Purchase tracking with quantity validation**
- ❌ **Prevent purchasing own food**
- 🔐 **JWT-protected private routes**
- 🌗 **Theme toggle (Dark/Light)**
- 🧾 **Profile dropdown with quick access**
- 🖼️ **Gallery with lightbox image view**
- ✏️ **Update & delete functionalities for user-added foods**
- 📅 **Order history with formatted timestamps**
- 📦 **Fully responsive on all devices**
- ⚠️ **Restrict purchase if food is out-of-stock**
- 📊 **Visual and interactive UI with animations**

---

## ✅ Challenge Features Implemented

- 🔒 Food quantity restriction (out-of-stock, purchase limit)
- 🔍 Search by food name
- ❌ Prevent buying own food
- ✅ JWT-based protected routes
- 🌐 Firebase + Netlify config for secure deployment
- ⏳ Loading spinners
- ✨ Page animations with Framer Motion
- 🧠 Role-based behavior
- 📸 Interactive gallery
- 🛠️ Backend validation with Firebase Admin SDK

---
## 📝 How to Run the Project Locally

### ⚙️ Prerequisites

- Node.js (v18+)
- npm or yarn
- Git
- MongoDB Atlas Account
- Firebase Project


### 📁 Step 1: Clone the Repositories

```bash
# Clone Client Side
git clone https://github.com/azijulhakimbd/MA-Restaurant-Client.git

# Clone Server Side
git clone https://github.com/azijulhakimbd/MA-Restaurant-Server.git
```

### 🖥️ Step 2: Setup Client Side

```bash
cd MA-Restaurant-Client
npm install
```
### ▶️ Start Client

```bash
npm run dev
```

### 🌐 Step 3: Setup Server Side

```bash
cd MA-Restaurant-Server
npm install
```
### ▶️ Start Server

```bash
npm run dev
```


