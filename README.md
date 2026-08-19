# 🏛️🌿 Civics Please

> **Report. Track. Resolve. Build Better Communities.**

**Civics Please** is a modern, high-performance civic issue reporting platform designed to bridge the gap between everyday citizens and municipal authorities.

The platform allows residents to report neighborhood infrastructure problems such as **potholes, broken streetlights, sanitation issues, damaged roads, and other civic problems** in seconds — complete with **smart geolocation and photographic evidence**.

Municipal authorities get a secure command center where they can review, route, track, and resolve incoming reports efficiently.

---

## ✨ Features

### 📍 Smart Geolocation Mapping
Automatically captures the user's location coordinates and associates them with a street address, helping municipal teams identify exactly where an issue has been reported.

### 📸 Instant Photo Proof
Citizens can attach photographic evidence directly from their device camera or existing storage.

### 🔄 Live Status Tracking
Users can follow their reports through the complete resolution lifecycle:

**Submitted → Under Review → In Progress → Resolved**

### 🏢 Direct Department Routing
Administrators can review reports and route them to the appropriate municipal department for action.

### 🔐 Secure Admin Command Center
A protected administrative dashboard allows authorized municipal staff to manage reports and civic data using role-based access.

### 📊 Community Impact Scoreboards
Dynamic statistics showcase community participation and municipal progress, including:

- Total reports submitted
- Reports under review
- Reports in progress
- Successfully resolved cases

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js** | Full-stack web framework |
| **TypeScript** | Type-safe development |
| **Prisma v7** | Database ORM |
| **PostgreSQL** | Relational database |
| **Supabase** | Database hosting |
| **@prisma/adapter-pg** | PostgreSQL adapter |
| **pg** | PostgreSQL connection pooling |
| **Tailwind CSS** | UI styling |
| **Server Actions** | Server-side operations |
| **App Router** | Application routing |
| **Turbopack** | Development bundler |

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      Citizens       │
                    │                     │
                    │  Submit Civic Issue │
                    │  + Photo + Location │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Civics Please   │
                    │     Next.js App      │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
        ┌─────────────────┐        ┌─────────────────┐
        │    PostgreSQL   │        │     Supabase    │
        │     Database    │        │    Services     │
        └────────┬────────┘        └─────────────────┘
                 │
                 ▼
        ┌─────────────────────┐
        │   Admin Command     │
        │       Center        │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Municipal Department│
        │      Resolution     │
        └─────────────────────┘
```

---

## 📂 Project Structure

```text
civics-please/
│
├── app/
│   ├── actions/
│   │   ├── auth/
│   │   ├── contact/
│   │   └── reports/
│   │
│   ├── admin/
│   │   └── # Municipal command center
│   │
│   ├── api/
│   │   └── # API endpoints
│   │
│   ├── components/
│   │   └── # Reusable UI components
│   │
│   ├── contact/
│   │   └── # Support & inquiry page
│   │
│   ├── features/
│   │   └── # Platform features
│   │
│   ├── login/
│   │   └── # Authentication portal
│   │
│   ├── privacy/
│   │   └── # Privacy policy
│   │
│   ├── report/
│   │   └── # Civic issue reporting
│   │
│   ├── globals.css
│   └── layout.tsx
│
├── prisma/
│   └── schema.prisma
│
├── prisma.config.ts
├── package.json
├── .env
└── README.md
```

---

# 🚀 Getting Started

Follow these steps to run **Civics Please** locally.

## 1. Clone the Repository

```bash
git clone https://github.com/JustAditya69/Civics-please.git
cd Civics-please
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL="postgres://[user]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"

DIRECT_URL="postgres://[user]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

> ⚠️ **Never commit your `.env` file or database credentials to GitHub.**

## 4. Push the Database Schema

```bash
npx prisma db push
```

## 5. Generate the Prisma Client

```bash
npx prisma generate
```

## 6. Start the Development Server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

# 🗄️ Database

Civics Please uses **PostgreSQL** as its primary database, hosted through **Supabase**.

**Prisma v7** handles database modeling and queries, while `@prisma/adapter-pg` and `pg` provide PostgreSQL connectivity and connection pooling.

The database stores information required for:

- 👤 Users
- 📋 Civic reports
- 📍 Report locations
- 📸 Evidence
- 🏢 Departments
- 🔄 Report statuses
- 🔐 Administrative roles
- 📊 Community statistics

---

# 🔄 Report Lifecycle

A typical civic report follows this workflow:

```text
Citizen submits report
        │
        ▼
   📥 Submitted
        │
        ▼
   🔍 Under Review
        │
        ▼
   🏢 Department Assigned
        │
        ▼
   🔧 In Progress
        │
        ▼
   ✅ Resolved
```

This provides transparency between citizens and municipal authorities.

---

# 🎯 Project Goals

Civics Please is built around four core principles:

### 🧑‍🤝‍🧑 Citizen Participation
Make reporting civic problems simple and accessible.

### 📍 Accountability
Every report contains relevant information about what happened and where it happened.

### ⚡ Faster Resolution
Route problems directly to the appropriate department.

### 👁️ Transparency
Allow citizens to track the progress of their reports.

---

# 🔮 Future Improvements

Potential future additions include:

- 🗺️ Interactive city-wide issue heatmaps
- 🤖 AI-powered issue categorization
- 🧠 Automatic department assignment
- 🔔 Email and push notifications
- 📱 Progressive Web App (PWA)
- 📈 Advanced municipal analytics
- 🏆 Citizen contribution/reputation system
- 🧾 Resolution proof and before/after images
- 🌐 Multi-language support
- 🚨 Duplicate issue detection
- 📊 Department performance analytics

---

# 🔐 Security

Security is an important part of Civics Please.

The project is designed around:

- Role-based administrative access
- Server-side validation
- Protected administrative routes
- Environment-based secrets
- Secure database connections
- Controlled report management

> **Never expose database credentials, API keys, or other secrets in source control.**

---

# 🤝 Contributing

Contributions are welcome!

If you would like to improve Civics Please:

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature/your-feature

# Make your changes

# Commit
git commit -m "Add your feature"

# Push
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 📜 License

Civics Please is built for **better, cleaner, and more connected communities**.

Free to use and open-source.

---

## 🌿 Civics Please

**Technology for citizens.  
Transparency for communities.  
Action for better cities.**

🏛️ **Report it. Track it. Fix it.**