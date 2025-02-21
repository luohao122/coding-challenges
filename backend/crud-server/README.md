---

# Blog Application (SQLite)

A simple blog backend where users can perform CRUD operations on a **SQLite** database, built with **Node.js**, **Express**, and **TypeScript** (using **Sequelize** as the ORM).

## Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Environment Variables](#environment-variables)  
3. [Installation](#installation)  
4. [Database Setup](#database-setup)  
5. [Build & Run the Application](#build--run-the-application)  
   - [Using Node](#using-node)  
   - [Using PM2 (Optional)](#using-pm2-optional)  
   - [Using Docker (Optional)](#using-docker-optional)  
6. [Logging](#logging)  
7. [Precautions & Notes](#precautions--notes)

---

## Prerequisites

- **Node.js** v14 or later  
- **npm** or **yarn**  
- **SQLite** library installed on your machine (on most operating systems, `sqlite3` comes bundled or is easy to install via package managers)  

> **Note**: By default, the [**sqlite3**](https://www.npmjs.com/package/sqlite3) package will compile a small C library. On most systems, it “just works,” but if you encounter issues, ensure you have the appropriate build tools installed (e.g., Xcode on macOS, `build-essential` on Linux, etc.).

---

## Environment Variables

Create a `.env` file in your project root (or configure these in your deployment environment). The key variable:

```bash
# Path to your SQLite database file (if not set, defaults to "database.sqlite" or similar)
SQLITE_DB_PATH=./posts.sqlite
```

If you’re running the app in Docker, you can supply these via a `.env` file copied into the container, or use the `--env-file` / `-e` options with Docker commands.

---

## Installation

1. **Clone** this repository or download the source.
2. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

---

## Database Setup

Since this app uses **SQLite**:

1. Confirm that **SQLite** is installed on your machine.  
   - **Linux**: `sudo apt-get install sqlite3` or use your distro’s package manager.  
   - **macOS**: Usually pre-installed. If not, install via [Homebrew](https://brew.sh/) (`brew install sqlite`).  
   - **Windows**: [Download from sqlite.org](https://www.sqlite.org/download.html) or rely on the `sqlite3` node module.  

2. By default, when you run the app, **Sequelize** will create the `.sqlite` database file (if it doesn’t already exist) in the location specified by `SQLITE_DB_PATH`.  
3. On application startup, the app calls `sequelize.sync()`, which automatically creates the needed tables (like `Post`).  

---

## Build & Run the Application

Before running, ensure your `.env` (or environment variables) is set, especially `SQLITE_DB_PATH`.

### Using Node

1. **Compile** (TypeScript → JavaScript):
   ```bash
   npm run build
   ```
   or
   ```bash
   yarn build
   ```

2. **Start the compiled app**:
   ```bash
   node dist/src/app.js
   ```
   If you see an error that the file path is different, confirm your build output directory matches the script (e.g., `dist`, `build`, etc.).  

3. By default, the app listens on the port `4002`.

### Using PM2 (Optional)

> **Note**: Because **SQLite** is a file-based database, using **multiple clustered processes** (e.g., `-i <num>` in PM2) on the same SQLite file can cause concurrency issues or locks. For high concurrency, consider using a more robust SQL engine (PostgreSQL, MySQL, etc.). For local development, single-instance usage is typically fine with SQLite.

1. **Install** PM2 (if not already):
   ```bash
   npm install -g pm2
   ```
2. **Build** the app:
   ```bash
   npm run build
   ```
3. **Start** with PM2:
   ```bash
   npm start
   ```
   - This typically runs something like:
     ```
     pm2 start ./dist/src/app.js -i 1 --watch
     ```
   - The `-i 1` ensures only **one** instance is used, preventing SQLite locking issues. Adjust to your preference (or omit).

### Using Docker (Optional)

To containerize this app with SQLite:

1. **Build the Docker Image**:

   ```bash
   docker build -t blog-app .
   ```

   This uses the provided `Dockerfile`, which:
   - Installs dependencies,  
   - Compiles the TypeScript code,  
   - Copies the compiled files into a minimal final image.

2. **Run the Container**:

   ```bash
   docker run -p 4002:4002 \
     --name my-blog-container \
     blog-app
   ```

   - This exposes the container’s port **4002** on your host at **`localhost:4002`**.
   - By default, the SQLite file (`posts.sqlite` or whatever `SQLITE_DB_PATH` is set to) is created **inside** the container’s filesystem.

3. **Persisting Data** (Optional):
   - If you want data to persist across container restarts, you can **mount** a volume:
     ```bash
     docker run -p 4002:4002 \
       -v $(pwd)/data:/usr/app/data \
       -e SQLITE_DB_PATH="/usr/app/data/posts.sqlite" \
       blog-app
     ```
     - This way, your `posts.sqlite` file is stored on your host machine in the `./data` folder.
     - You also explicitly set `SQLITE_DB_PATH` so Sequelize writes the DB to `/usr/app/data/posts.sqlite` inside the container. 

> **Note**: Running multiple containers pointing to the same local SQLite file can cause concurrency issues. Use a single container or switch to a more robust DB for horizontal scaling.

---

## Logging

- The app may use a logger (like **Winston** or **pino**) to log output to console or files.  
- Configure log levels, formats, and file output in the corresponding logger setup file (e.g., `logger.ts`).

---

## Precautions & Notes

1. **Single Process**  
   - For production, you typically want a single process writing to the SQLite file at a time. Running multiple processes (or containers) can lead to locks or concurrency errors.
2. **Data Volume**  
   - SQLite is suitable for small to medium scale. For large-scale deployments or heavy write operations, consider a more robust DB (e.g., PostgreSQL).  
3. **Project Structure**  
   - The important files include:
     - `src/app.ts` - Entry point.
     - `src/sqlite-connection/database.ts` - Database config and `sequelize.sync()`.
     - `src/models/post.schema.ts` - The `Post` model definition.
     - `src/routes` and `src/services` - Business logic and routes.
4. **Development vs Production**  
   - In development, you can run `npm run dev` (with **nodemon**) for auto-restarts and your `.ts` source files directly.  
   - In production, always use the compiled `.js` files (in `dist/`) for better performance.

---
