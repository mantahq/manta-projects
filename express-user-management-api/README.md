# Express User Management API

A starter template for building a **User Management API** using **Express.js** and **Postgres** with the **MantaHA JS SDK**.

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
