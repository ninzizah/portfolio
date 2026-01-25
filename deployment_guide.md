# Portfolio Deployment Guide (cPanel)

This guide walks you through deploying your full-stack portfolio (React + Node.js + PostgreSQL) to a cPanel hosting environment.

## 1. Domain Setup (Creating a New Domain)

If you haven't bought a domain yet (e.g., `honoreninziza.com`), you need to do that first via your hosting provider (like Bluehost, Namecheap, or GoDaddy).

Once you have the domain, add it to cPanel:

1.  **Log in to cPanel**.
2.  Look for the **"Domains"** section (sometimes called "Addon Domains").
3.  Click **"Create A New Domain"** button.
4.  **Domain**: Enter your name (e.g., `ninziza.com`).
5.  **Document Root**: Ensure `Share document root` is **UNCHECKED**. It should create its own folder (e.g., `/home/username/ninziza.com`).
6.  Click **Submit**.

---

## 2. Prepare Your Files

We need to bundle your website for production.

1.  **Build the Frontend**:
    Run this command in your local terminal:
    ```bash
    npm run build
    ```
    This creates a `dist` folder with your optimized website.

2.  **Locate Database Backup**:
    I have already created a backup file for you named:
    `full_db_dump.sql`
    (Located in your project folder).

---

## 3. Database Setup (cPanel)

Your local database doesn't exist on the server yet. We must create it.

1.  **Create Database**:
    - Go to **"PostgreSQL Databases"** in cPanel.
    - Create a New Database (e.g., `username_portfolio`).
    - Create a New User (e.g., `username_admin`) with a password.
    - **Add User to Database**: Select the user and DB you just created and click "Add". **Grant All Privileges**.

2.  **Import Data**:
    - Go to **"phpPgAdmin"** (if available) or use the "Import Dump" feature in PostgreSQL Databases (some cPanels differ here).
    - If your host uses **MySQL** only (common in cheaper plans), you might need to convert your DB or ask support. *Assuming you have Postgres access based on our project.*
    - Import the `full_db_dump.sql` file.

---

## 4. Deploying the Node.js App

1.  **File Manager**:
    - Go to **File Manager** in cPanel.
    - Navigate to your domain's folder (e.g., `ninziza.com`).
    - Upload your entire project code **EXCEPT** `node_modules`. (Upload `server` folder, `dist` folder, `package.json`).

2.  **Setup Node.js App** (Icon in cPanel):
    - Click **"Setup Node.js App"**.
    - Click **"Create Application"**.
    - **Node.js Version**: Select 20.x or latest stable.
    - **App Mode**: Production.
    - **App Root**: Path to your uploaded files (e.g., `ninziza.com`).
    - **Application URL**: Select your domain.
    - **Application Startup File**: `server/index.js`.
    - Click **Create**.

3.  **Install Dependencies**:
    - While still in the Node.js App screen, click **"Run NPM Install"**. This downloads all libraries.

4.  **Environment Variables**:
    - In the Node.js App screen, look for "Environment Variables".
    - Add the variables from your local `.env`:
        - `DB_USER`: (your cPanel db user)
        - `DB_PASSWORD`: (your cPanel db pass)
        - `DB_NAME`: (your cPanel db name)
        - `DB_HOST`: `127.0.0.1`

---

## 5. Serving the Frontend

Since we have a combined app, ensure your `server/index.js` is set to serve the `dist` static files (if you want the backend to serve the frontend).

*Currently, your server focuses on API. For a unified deployment:*
You might need to upload the contents of your local `dist` folder into a `public` or `public_html` folder if you aren't serving them via Express.

**Easiest cPanel Path**:
- Upload `dist` contents to `public_html`.
- Run Node.js only for API at `api.ninziza.com` (Subdomain).
