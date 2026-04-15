# ClassicDrive Tech Stack Documentation

This project is a full-stack web application designed for a premium vintage car marketplace. Below are the languages, frameworks, and tools used for both the frontend and backend.

## 🎨 Frontend (Client-Side)
The frontend is a modern, responsive single-page application (SPA).

- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strictly typed React components)
- **Framework**: [React](https://reactjs.org/) (Version 19)
- **Routing**: [React Router](https://reactrouter.com/) (HashRouter for seamless client-side navigation)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first styling for premium design)
- **Build Tool**: [Vite](https://vitejs.dev/) (Fast development server and bundling)
- **Data Handling**: [MockData](file:///c:/Users/Admin/Downloads/classicdrive---vintage-cars-marketplace-2%202%20(1)/classicdrive---vintage-cars-marketplace-2/frontend/mockData.ts) (Initial development) and [API Service](file:///c:/Users/Admin/Downloads/classicdrive---vintage-cars-marketplace-2%202%20(1)/classicdrive---vintage-cars-marketplace-2/frontend/services/api.ts) (Database communication)
- **Icons**: Custom SVG icons for high fidelity and zero weight.

## ⚙️ Backend (Server-Side)
The backend is a RESTful API that handles data persistence and business logic.

- **Platform**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/) (Minimalist web framework)
- **Language**: JavaScript (ES6+)
- **Database**: [MongoDB](https://www.mongodb.com/) (NoSQL database for flexible car and user datasets)
- **ODM**: [Mongoose](https://mongoosejs.com/) (Object Data Modeling for schema validation)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) and [bcryptjs](https://www.npmjs.com/package/bcryptjs) (Secure password hashing and token-based sessions)
- **Cross-Origin Resource Sharing**: [CORS](https://www.npmjs.com/package/cors) (Enabled for frontend-backend communication)
- **Environment Config**: [Dotenv](https://www.npmjs.com/package/dotenv) (Secure management of database URIs and secrets)

## 🛠️ Tools & DevOps
- **Version Control**: [Git](https://git-scm.com/) (Project pushed to GitHub)
- **Package Manager**: [NPM](https://www.npmjs.com/) (Dependency management)
- **Database Management**: [MongoDB Compass](https://www.mongodb.com/products/compass) (Local database visualization)
