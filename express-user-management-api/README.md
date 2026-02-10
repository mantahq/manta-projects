# Express User Management API

A starter template for building a **User Management API** using **Express.js** and **Postgres** with the **MantaHA JS SDK**.

Built with **MantaHQ**, this project demonstrates how to integrate the **MantaHQ SDK** with your application to perform backend operations such as database access, workflows, and API-driven logic.

## Features
- Full CRUD operations: Create, Read, (Update and Delete users to be added soon)
- Built-in logging of database operations
- Minimal setup to get started quickly
- Ready for future integration with notifications

## Tech Stack
- Node.js + Express.js
- PostgreSQL
- Manta JS SDK for backend infrastructure

## Usage
```js
import { MantaClient } from "mantahq-sdk";

// Use environment variables to protect your key
const manta = new MantaClient({
  sdkKey: "manta_sk_live_xxxx", // Replace with your actual API key
});

// sample query
await manta.createRecords({
  table: "users",
  data: [{ email: "real@example.com" }],
});

---

## 📋 Features

| Feature            | Status | Description                    |
| ------------------ | ------ | ------------------------------ |
| CRUD Operations    | ✅      | Create, Read, (Update, Delete coming soon)   |
| MantaHQ SDK        | ✅      | Backend operations via MantaHQ |
| Environment Config | ✅      | `.env`-based configuration     |
| Validation         | ✅      | Input validation middleware    |
| Logging            | ✅      | Request and error logging      |
| Health Checks      | ✅      | Service health monitoring      |
| CORS               | ✅      | Cross-origin request support   |
| Fallback Mode      | ✅      | Optional in-memory fallback    |

---

## 🏗️ Project Structure

```
{{REPO_NAME}}/
├── .env.example            # Example environment variables
├── .gitignore
├── package.json
├── server.js
├── controllers/
│   └── {{resource}}.controller.js
├── routes/
│   └── {{resource}}.routes.js
├── middleware/
│   └── validate.js
├── utils/
│   └── logger.js
└── constants/
    └── httpStatus.js
```

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/mantahq/manta-projects
cd express-user-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Server
PORT=3000
NODE_ENV=development

# MantaHQ
MANTAHQ_SDK_KEY=your_mantahq_sdk_key
```

---

### 4. Run the Server

**Development**

```bash
npm run dev
```

**Production**

```bash
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint                | Description  |
| ------ | ----------------------- | ------------ |
| GET    | `/`                     | API info     |
| GET    | `/health`               | Health check |
| POST   | `/api/{{resource}}`     | Create       |
| GET    | `/api/{{resource}}`     | Get all      |
| GET    | `/api/{{resource}}/:id` | Get one      |
| PUT    | `/api/{{resource}}/:id` | Update       |
| DELETE | `/api/{{resource}}/:id` | Delete       |

---

## 🔧 MantaHQ SDK Integration

This project uses the **MantaHQ SDK** to connect your app to a datasource and interact with backend data securely.

---

### 1. Get Your MantaHQ API Key

* Sign up at [https://www.mantahq.com](https://www.mantahq.com)
* Generate an API key

```env
MANTAHQ_SDK_KEY=manta_sk_live_xxxx
```

📖 Documentation:
[https://docs.mantahq.com/quickstart](https://docs.mantahq.com/quickstart)

---

### 2. SDK Initialization

```javascript
import { MantaClient } from "mantahq-sdk";

export const manta = new MantaClient({
  sdkKey: process.env.MANTAHQ_SDK_KEY,
});
```

---

### 3. Datasource Options

#### PostgreSQL
Best for production workloads and relational data.

Docs:
[https://docs.mantahq.com/databases/connections/connecting-to-external-databases](https://docs.mantahq.com/databases/connections/connecting-to-external-databases)

#### Manta Lightweight Tables

Built-in tables for quick setup and prototyping.

Docs:
[https://docs.mantahq.com/databases/connections/connecting-to-manta-tables](https://docs.mantahq.com/databases/connections/connecting-to-manta-tables)

---

## 📝 Example Usage

### Create a Record

```bash
curl -X POST http://localhost:3000/api/{{resource}} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Example",
    "value": "Sample data"
  }'
```

---

## 📚 Resources

* MantaHQ Website: [https://www.mantahq.com](https://www.mantahq.com)
* SDK Docs: [https://docs.mantahq.com/quickstart](https://docs.mantahq.com/quickstart)
* PostgreSQL Integration: [https://docs.mantahq.com/databases/connections/connecting-to-external-databases](https://docs.mantahq.com/databases/connections/connecting-to-external-databases)
* Manta Tables: [https://docs.mantahq.com/databases/connections/connecting-to-manta-tables](https://docs.mantahq.com/databases/connections/connecting-to-manta-tables)

---

## 🧠 License

MIT License

---

## 🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first to discuss what you’d like to change.

---

## ⭐️ Community

Built with ❤️ by the **MantaHQ community**.
Share what you build and explore more projects at **MantaHQ Projects**.


