# Manta-projects

Welcome to the **MantaHQ Projects** — a showcase of community-built projects powered by MantaHQ.  
Each project includes full source code, setup guides, and integration notes to help you understand how the MantaHQ SDK or Platform fits in.

Explore, fork, and remix real examples to jumpstart your own builds — and share what you create with the community!


## MantaHQ SDK Integration

The **MantaHQ SDK** allows you to connect your app to your datasource and leverage MantaHQ features such as backend database access, notifications, and tables.

### Steps to Integrate

#### 1. Set up your MantaHQ API key

- Create an account on [MantaHQ](https://www.mantahq.com)
- Generate an API key in your account dashboard
- Authenticate using the SDK: [MantaHQ SDK Docs](https://docs.mantahq.com/quickstart)

#### 2. Connect to your datasource

You can use either:

- **PostgreSQL**: For structured data  
  Documentation: [Connecting PostgreSQL](https://docs.mantahq.com/databases/connections/connecting-to-external-databases)

- **Manta Lightweight Tables**: For quick setup or testing  
  Documentation: [Using Manta Tables](https://docs.mantahq.com/databases/connections/connecting-to-manta-tables)

#### 3. Configure the SDK

```javascript
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
