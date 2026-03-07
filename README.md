# Kenneth Altes — Personal Portfolio

A full-stack personal portfolio website with a public-facing site and a protected admin panel for managing content and viewing visitor analytics.

**Live site:** [kenneth-altes.vercel.app](https://kenneth-altes.vercel.app)

---

## Overview

| Layer      | Technology                     | Hosting         |
| ---------- | ------------------------------ | --------------- |
| Frontend   | React + Vite + Tailwind CSS    | Vercel          |
| Backend    | ASP.NET Core (.NET 10) Web API | Render (Docker) |
| Database   | PostgreSQL                     | Render          |
| AI Chatbot | Groq API (LLM)                 | —               |

---

## Features

### Public Portfolio

- Hero, About, Experience, Tech Stack, Recent Projects, Recent Certifications sections
- AI-powered chatbot that answers questions about Kenneth using live portfolio data
- Paginated project and certification listing pages

### Admin Panel (`/admin`)

- Secure login protected by an API key header
- Full CRUD for **Projects**, **Skills**, **Experiences**, and **Certifications**
- **Analytics dashboard** — visitor stats, top chat questions, charts
- Visitor tracking with IP geolocation (country-level)

---

## Tech Stack

### Frontend

- **React 19** + **React Router 7**
- **Vite 7**
- **Tailwind CSS 4**
- **Framer Motion** — animations
- **Axios** — API communication
- **Recharts** — analytics charts
- **React Icons**

### Backend

- **ASP.NET Core (.NET 10)** Web API
- **Entity Framework Core 10** + **Npgsql** (PostgreSQL)
- **Groq API** — LLM chat completions
- **ip-api.com** — IP geolocation for visitor tracking
- **FuzzySharp** — fuzzy matching to deduplicate chat questions
- **Markdig** — Markdown stripping for analytics storage
- Built-in **Rate Limiting** on the chat endpoint
- Custom `ApiKey` attribute for admin endpoint authorization

---

## Project Structure

```
code/
├── Dockerfile                        # Multi-stage Docker build for the backend
├── MyPortfolioAdmin.API/
│   └── MyPortfolioAdmin/
│       ├── Program.cs                # Entry point, middleware pipeline
│       ├── appsettings.json          # Configuration keys
│       ├── Ai/
│       │   └── portfolio-prompt.md   # AI system prompt for the chatbot
│       ├── Controllers/              # Projects, Skills, Experiences, Certifications,
│       │                             #   Chat, Visitors, Analytics
│       ├── Data/
│       │   └── PortfolioDbContext.cs # EF Core DbContext
│       ├── Extensions/
│       │   └── ServiceExtensions.cs  # DI setup (DB, CORS, rate limiting)
│       ├── Filters/
│       │   └── ApiKeyAttribute.cs    # Custom auth filter for admin routes
│       ├── Migrations/               # EF Core migration files
│       ├── Models/                   # Entities, DTOs, common pagination models
│       └── Services/
│           ├── GroqService.cs        # Groq LLM integration
│           └── IpGeolocationService.cs
└── web-porfolio/my-portfolio/
    ├── src/
    │   ├── App.jsx                   # Route definitions
    │   ├── pages/                    # Home, RecentProjectPage, RecentCertificatePage
    │   ├── components/               # Public UI components + chatbot
    │   ├── api/                      # Public API clients (Axios wrappers)
    │   ├── hooks/
    │   ├── utils/
    │   └── admin/
    │       ├── pages/                # Login, Dashboard, Projects, Skills,
    │       │                         #   Experience, Certifications, Analytics
    │       ├── components/           # Sidebar, DataTable, FormModal, RequireAuth, etc.
    │       ├── layout/               # DashboardLayout
    │       └── api/                  # Admin API clients (with X-Api-Key header)
    ├── vite.config.js
    └── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**
- **.NET 10 SDK**
- **PostgreSQL** instance (local or cloud)
- **Groq API key** — [console.groq.com](https://console.groq.com)

---

### Backend Setup

1. Navigate to the API project:

   ```bash
   cd MyPortfolioAdmin.API/MyPortfolioAdmin
   ```

2. Set secrets using .NET User Secrets (recommended for local dev):

   ```bash
   dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Database=portfolio;Username=postgres;Password=yourpassword"
   dotnet user-secrets set "Groq:ApiKey" "your-groq-api-key"
   dotnet user-secrets set "AdminApiKey" "your-secret-admin-key"
   ```

3. Run the API (migrations are applied automatically on startup):
   ```bash
   dotnet run
   ```
   The API will be available at `http://localhost:5053`.

---

### Frontend Setup

1. Navigate to the frontend:

   ```bash
   cd web-porfolio/my-portfolio
   ```

2. Create a `.env` file:

   ```env
   VITE_API_URL=http://localhost:5053
   VITE_ADMIN_API_KEY=your-secret-admin-key
   ```

3. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

---

## Configuration Reference

### Backend (`appsettings.json` / environment variables)

| Key                                   | Description                                                         |
| ------------------------------------- | ------------------------------------------------------------------- |
| `ConnectionStrings:DefaultConnection` | PostgreSQL connection string                                        |
| `Groq:ApiKey`                         | Groq API key for the AI chatbot                                     |
| `AdminApiKey`                         | Secret key required in the `X-Api-Key` header for admin routes      |
| `Cors:AllowedOrigins`                 | Array of allowed frontend origins                                   |
| `PORT`                                | Port the server listens on (injected by Render, defaults to `8080`) |

---

## Docker (Backend)

Build and run the backend with Docker:

```bash
docker build -t myportfolio-api .

docker run -p 8080:8080 \
  -e ConnectionStrings__DefaultConnection="Host=...;Database=portfolio;Username=...;Password=..." \
  -e Groq__ApiKey="your-groq-api-key" \
  -e AdminApiKey="your-secret-admin-key" \
  myportfolio-api
```

> **Note:** SSL termination is handled by Render's reverse proxy. HTTPS redirect is disabled inside the container.

A `/health` endpoint is available for uptime monitoring (no auth required).

---

## Deployment

### Frontend → Vercel

1. Import the `web-porfolio/my-portfolio` directory into Vercel.
2. Set environment variables (`VITE_API_URL`, `VITE_ADMIN_API_KEY`) in the Vercel dashboard.
3. Deploy.

### Backend → Render

1. Connect the repository to Render as a **Docker** service.
2. Point the Dockerfile path to the root `Dockerfile`.
3. Set the required environment variables (`ConnectionStrings__DefaultConnection`, `Groq__ApiKey`, `AdminApiKey`, `Cors__AllowedOrigins__0`).
4. Attach a **PostgreSQL** database and copy the connection string.
5. Deploy.

---

## API Endpoints

| Method            | Route                 | Auth         | Description                      |
| ----------------- | --------------------- | ------------ | -------------------------------- |
| `GET`             | `/api/projects`       | —            | List projects (paginated)        |
| `POST/PUT/DELETE` | `/api/projects`       | `X-Api-Key`  | Manage projects                  |
| `GET`             | `/api/skills`         | —            | List skills                      |
| `POST/PUT/DELETE` | `/api/skills`         | `X-Api-Key`  | Manage skills                    |
| `GET`             | `/api/experiences`    | —            | List experiences                 |
| `POST/PUT/DELETE` | `/api/experiences`    | `X-Api-Key`  | Manage experiences               |
| `GET`             | `/api/certifications` | —            | List certifications              |
| `POST/PUT/DELETE` | `/api/certifications` | `X-Api-Key`  | Manage certifications            |
| `POST`            | `/api/chat`           | Rate limited | AI chatbot                       |
| `POST`            | `/api/visitors`       | —            | Record a visitor                 |
| `GET`             | `/api/visitors`       | `X-Api-Key`  | Get visitor data                 |
| `GET`             | `/api/analytics`      | `X-Api-Key`  | Get analytics (questions, stats) |
| `GET`             | `/health`             | —            | Health check                     |

---

## License

This project is for personal use. Feel free to use it as inspiration for your own portfolio.
