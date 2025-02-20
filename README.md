# MERN_Project-WatchShop

🚀 **WatchShop - A Full-Stack E-commerce Platform for Watches**

## 📌 Live Demo
🔗 [Deployed Link](#) (Add your live demo link if available)

## 📂 Table of Contents
- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Run the Project](#-run-the-project)
- [API Endpoints](#-api-endpoints)
- [Folder Structure](#-folder-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## 📖 About the Project
WatchShop is an e-commerce platform built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to browse, search, and purchase watches with secure authentication and an intuitive user interface.

## 🛠 Tech Stack
- **Frontend:** React.js, Redux Toolkit, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Deployment:** Vercel (Frontend), Render/Heroku (Backend)

## ✨ Features
✔ User authentication (JWT-based login & registration)
✔ Admin panel for product & order management
✔ Product listing, search, and filtering
✔ Secure payment integration (Stripe/PayPal)
✔ Shopping cart & order history
✔ Responsive design with TailwindCSS

## 💻 Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/lqttdz611/MERN_Project-WatchShop.git
cd MERN_Project-WatchShop
```

### 2️⃣ Install Dependencies
#### Backend (Server)
```sh
cd server
npm install
```

#### Frontend (Client)
```sh
cd client
npm install
```

## 🔑 Environment Variables
Create a `.env` file in the **server** folder and add:
```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PORT=5000
```
For the **client** folder, create a `.env` file with:
```
REACT_APP_API_URL=http://localhost:5000
```

## 🚀 Run the Project
#### Start the Backend
```sh
cd server
npm start
```
#### Start the Frontend
```sh
cd client
npm start
```

## 📡 API Endpoints
| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| POST   | `/api/auth/login`     | Login User            |
| POST   | `/api/auth/register`  | Register User         |
| GET    | `/api/products`       | Get All Products      |
| POST   | `/api/orders`         | Create an Order       |

## 📁 Folder Structure
```
/MERN_Project-WatchShop
 ├── /client (React Frontend)
 ├── /server (Node.js Backend)
 ├── package.json
 ├── README.md
 ├── .gitignore
 ├── .env
```

## 📸 Screenshots
![WatchShop Screenshot](https://via.placeholder.com/800x400?text=WatchShop+Screenshot)

## 📜 License
This project is licensed under the MIT License.

## 🤝 Contributing
1. Fork the project
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

---
📌 *Feel free to update this README with additional details specific to your project!* 🚀
