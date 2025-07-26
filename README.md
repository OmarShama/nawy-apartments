# Nawy Apartment Listing App

A full-stack apartment listing application built with:

- **Backend**: NestJS (port `3005`)
- **Frontend**: Next.js (port `3000`)
- **Database**: PostgreSQL

---

## 📦 Requirements

- [Node.js](https://nodejs.org/) (v node:23.11.0)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🚀 Getting Started

### Option 1: Run with Docker Compose (Required)

1. Clone the repository:

   ```bash
   git clone https://github.com/OmarShama/nawy-apartments.git
   cd nawy-apartments
   ```

2. Start the project:

   ```bash
   docker-compose up --build
   ```

3. Access the app:

   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:3005](http://localhost:3005)
   - PostgreSQL: exposed on port `5432` (default credentials set in `docker-compose.yml`)

---

### Option 2: Run Manually (Locally)

You can run the backend and frontend apps separately without Docker.

---

#### 1. Set up PostgreSQL

Ensure PostgreSQL is running on your machine or accessible remotely.

Create a new database (e.g., `nawy`) and use your own configuration details. Then update the backend `.env` file:

```env
DB_HOST=your_database_host       # e.g., localhost
DB_PORT=your_database_port       # e.g., 5432
DB_USERNAME=your_database_user   # e.g., postgres
DB_PASSWORD=your_database_pass   # e.g., postgres
DB_NAME=your_database_name       # e.g., nawy
DB_SCHEMA=nawy_apartment         # do not change
```

Do not modify the following values (they are required for correct backend functionality):

```env
# Environment
STORAGE_DRIVER=local
MAX_IMAGES=10 
PORT=3005
```
---

#### 2. Run Backend (NestJS)

1. Navigate to the backend folder:

   ```bash
   cd nawy-apartment-be
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Ensure your `.env` file is updated as described above.

4. Start the backend:

   ```bash
   npm run start:dev
   ```

The backend will run at [http://localhost:3005](http://localhost:3005)

---

#### 3. Run Frontend (Next.js)

1. Navigate to the frontend folder:

   ```bash
   cd ../nawy-apartment-fe-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update the `.env.local` file with the backend URL:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3005
   ```

4. Start the frontend:

   ```bash
   npm run dev
   ```

The frontend will run at [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing

You can verify the services are running:

- Backend health check: `GET http://localhost:3005/health` (if implemented)
- Frontend root page: `http://localhost:3000`

---

## 📂 Project Structure

```
nawy-apartments/
├── nawy-apartment-be/        # NestJS backend
├── nawy-apartment-fe-app/    # Next.js frontend
├── db/                       # Optional init scripts for PostgreSQL
└── docker-compose.yml        # Docker Compose file
```

---

## 🛠 Tech Stack

- **Backend**: NestJS, PostgreSQL, TypeORM
- **Frontend**: Next.js, Tailwind CSS
- **Containerization**: Docker, Docker Compose

---

## 📄 License

MIT