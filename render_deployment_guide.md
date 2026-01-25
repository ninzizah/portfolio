# Deploying to Render.com (Best Free Option)

Since cPanel has limits, **Render.com** is the best modern alternative. It gives you a free database and free hosting for your Node.js app.

## Phase 1: Upload Code to GitHub
Render pulls your code from GitHub.

1.  **Create a GitHub Account** at [github.com](https://github.com).
2.  **Create a New Repository**:
    - Name: `portfolio`
    - Visibility: **Public** or **Private** (Render supports both).
    - Click **Create**.
3.  **Push your Code**:
    Run these commands in your portfolio folder terminal:
    ```bash
    git init
    git add .
    git commit -m "Ready for deployment"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
    git push -u origin main
    ```

## Phase 2: Create Free Database
1.  Log in to [Render.com](https://render.com).
2.  Click **New +** -> **PostgreSQL**.
3.  **Name**: `portfolio-db`.
4.  **Region**: Frankfurt or Ohio (Choose closest).
5.  **Plan**: **Free**.
6.  Click **Create Database**.
7.  **Wait** for it to start (Status: Available).
8.  **Copy the "Internal Connection URL"**.

## Phase 3: Deploy the App
1.  On Render, click **New +** -> **Web Service**.
2.  **Connect GitHub**: Select your `portfolio` repo.
3.  **Settings**:
    - **Name**: `ninziza-portfolio` (Your site will be `ninziza-portfolio.onrender.com`).
    - **Runtime**: `Node`.
    - **Build Command**: `npm install && npm run build`
    - **Start Command**: `node server/index.js`
    - **Plan**: **Free**.
4.  **Environment Variables** (Scroll down):
    - Click **Add Environment Variable**.
    - **Key**: `DATABASE_URL`
    - **Value**: Paste the **Internal Connection URL** you copied from the database.
5.  Click **Create Web Service**.

## Phase 4: Import Your Data
Your live database is empty. We need to fill it.
1.  Go to your Render Database page.
2.  Copy the **"External Connection URL"**.
3.  Run this command in your **local terminal** (replace the URL with yours):
    ```bash
    DATABASE_URL="postgres://user:pass@host/db" node server/seed.js
    ```
    *(This connects to the cloud implementation and fills it with your projects/skills).*

Done! Your site will be live at `https://ninziza-portfolio.onrender.com`.
