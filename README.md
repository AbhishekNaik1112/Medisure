# **CLAIMS MANAGEMENT SYSTEM**
A **full-stack claims management system** that allows patients to submit insurance claims and insurers to review and process them. Built using **React.js, NestJS, MongoDB**, and **JWT**-based authentication.

---

## 📜 **Table of Contents**
- [**CLAIMS MANAGEMENT SYSTEM**](#claims-management-system)
  - [📜 **Table of Contents**](#-table-of-contents)
  - [🚀 **Features**](#-features)
    - [✅ Patient Side](#-patient-side)
    - [✅ Insurer Side](#-insurer-side)
    - [✅ Shared Features](#-shared-features)
  - [🛠 **Tech Stack**](#-tech-stack)
  - [📂 **Folder Structure**](#-folder-structure)
  - [⚙️ **Installation**](#️-installation)
    - [Server Setup (NestJS)](#server-setup-nestjs)
    - [Client Setup (React)](#client-setup-react)
  - [🔒 **Authentication** -](#-authentication--)
  - [⛩️ **API Endpoints**](#️-api-endpoints)
  - [🧪 **Testing**](#-testing)
  - [🔗 **Deployed Links**](#-deployed-links)

---

## 🚀 **Features**

### ✅ Patient Side
- **Submit Claims:** Enter details such as **name, email, amount, and description**.
- **Upload Supporting Documents:** e.g., receipts, prescriptions.
- **Track Claim Status:** View submitted claims and their current status.
- **Notifications:** View latest updates on you claims.

### ✅ Insurer Side
- **Review & Manage Claims:** See all submitted claims.
- **Approve/Reject Claims:** Update claim status and add comments.
- **Filter Claims:** View claims by **status, date, or amount**.

### ✅ Shared Features
- **JWT Authentication:** Secure login for both **patients and insurers**.
- **MongoDB Database:** Store user and claim data.
- **REST API:** Endpoints for claims and authentication.
- **Responsive UI:** Built using **Tailwind CSS and shadcn**.

---

## 🛠 **Tech Stack**
| Technology              | Purpose           |
|-------------------------|-------------------|
| **React.js**            | Frontend UI       |
| **Tailwind CSS** | Styling           |
| **NestJS**              | Backend API       |
| **MongoDB**             | Database          |
| **JWT (JSON Web Tokens)** | Authentication    |
| **Axios**               | API requests      |
| **TypeScript**          | Type safety       |

---

## 📂 **Folder Structure**
```
claims-management/
│── client/              # Client (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/     # API calls
│   │   ├── App.tsx       # Main App component
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│── server/              # Server (NestJS)
│   ├── src/
│   │   ├── auth/         # Auth modules
│   │   ├── claims/       # Claims modules
│   │   ├── users/        # User modules
│   │   ├── main.ts       # Entry point
│   ├── .env             # Environment variables
│   ├── package.json
│   ├── test/            # E2E tests (e.g., app.e2e-spec.ts)
```

---

## ⚙️ **Installation**

### Server Setup (NestJS)
1. **Navigate to the backend folder:**
   ```bash
   cd server
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a `.env` file with the following:**
   ```plaintext
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```
4. **Start the backend:**
   ```bash
   npm run start:dev
   ```

### Client Setup (React)
1. **Navigate to the frontend folder:**
   ```bash
   cd client
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the frontend:**
   ```bash
   npm run dev
   ```
4. **Visit the app in your browser:**  
   Open **`http://localhost:5173`**

---

## 🔒 **Authentication** - 
| Role      | Credentials           |
|-----------|-----------------------|
| **Patient** | `patient1@gmail.com / patient1` |
| **Insurer** | `insurer1@gmail.com / insurer1` |

- Patients can **submit claims** and **view status**.
- Insurers can **review, approve/reject claims**.

---

## ⛩️ **API Endpoints**
| Method    | Endpoint             | Description                     |
|-----------|----------------------|---------------------------------|
| **POST**  | `/auth/login`        | Login and get JWT token         |
| **POST**  | `/users/register`    | Register a new user             |
| **POST**  | `/claims`            | Submit a claim                  |
| **GET**   | `/claims`            | Fetch all claims                |
| **PATCH** | `/claims/:id`        | Approve/Reject a claim          |

---

## 🧪 **Testing**
To run end-to-end tests for the backend:

1. Place your test files (e.g., `app.e2e-spec.ts`) in the `server/test` folder.
2. From the `server` folder, run:
   ```bash
   npm run test:e2e
   ```

   ---

   ## 🔗 **Deployed Links**

   1. Client Link - [Client](https://claims-management-system-client.vercel.app/landing)
   2. Server Link - [Server](https://claims-management-system-2d30.onrender.com)