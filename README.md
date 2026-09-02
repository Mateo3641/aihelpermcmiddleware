# Distributed AI Middleware for Java Clients

A robust, distributed RESTful API built with **Node.js, TypeScript, and Express.js** that serves as a secure middleware between a Java client application (Minecraft Server Plugin) and external Artificial Intelligence models (Groq/LLaMA).

## Key Features

- **RESTful Architecture:** Built with Express.js and fully typed with TypeScript for maximum maintainability.
- **AI Integration:** Seamlessly connects to the Groq API to provide ultra-low-latency AI completions.
- **Relational Database:** Integrates PostgreSQL (via Supabase) to log, track, and manage transactional data and user queries.
- **Security (Middleware):** Implements token-based Bearer Authentication to protect endpoints from unauthorized access and API abuse.
- **Optimized for High Concurrency:** Designed to handle non-blocking HTTP requests, ensuring zero latency impact on the main Java client thread.

## Technologies Used

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL (Supabase), SQL
- **AI / LLM:** Groq API (LLaMA)
- **Architecture:** Microservices/Gateway Pattern, REST APIs, SOLID Principles

## How it Works

1. The **Java Client** makes an asynchronous HTTP POST request containing the user's query and a secret Bearer Token.
2. The **TypeScript API** validates the token. If unauthorized, it returns a `401 Unauthorized` status.
3. If authorized, the query is saved into the **PostgreSQL** database for analytics and tracking.
4. The API formats the system context and forwards the prompt to the **Groq AI model**.
5. The AI response is received, processed (Markdown is stripped for client compatibility), and returned to the Java client.

## Environment Variables (`.env`)

To run this project locally, create a `.env` file with the following keys:

```env
GROQ_API_KEY=your_groq_api_key
DATABASE_URL=your_postgresql_connection_string
MC_SERVER_SECRET=your_custom_security_token
```

## Installation & Deployment

```bash
# Install dependencies
npm install

# Compile TypeScript to JavaScript
npm run build

# Start the production server
npm start
```

---

_Developed by Mateo Cevallos - Backend Developer._
