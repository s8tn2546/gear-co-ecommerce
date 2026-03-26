# Gear Co. E-Commerce Platform

A premium urban e-commerce platform built with React, Vite, Node.js, Express, Prisma, and MongoDB.

## Tech Stack
- **Frontend**: React, Vite, Context API, Lucide Icons, Vanilla CSS (Brutalist aesthetic).
- **Backend**: Node.js, Express, Prisma ORM, MongoDB Atlas, JWT Authentication.

## Running Locally

1. Create a `.env` file in the `backend/` directory with:
   ```env
   DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ecommerce?appName=Cluster0"
   JWT_SECRET="your_jwt_secret"
   PORT=5000
   ```

2. Open two terminals:
   - **Terminal 1 (Backend)**:
     ```bash
     cd backend
     npm install
     npx prisma generate
     npx prisma db push
     npm run dev
     ```
   - **Terminal 2 (Frontend)**:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```

## Deployment (Render / Heroku / DigitalOcean)

This repository is configured for monolithic deployment. The root `package.json` contains install scripts that build the frontend and install backend dependencies.

The Node.js backend serves the compiled `frontend/dist` React application when `NODE_ENV=production`.

1. Connect your repository to your hosting provider.
2. Set the Build Command: `npm install && npm run build`
3. Set the Start Command: `npm start`
4. Set Environment Variables:
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = your MongoDB connection string
   - `JWT_SECRET` = your secret key

The server will automatically start on the port assigned by the hosting environment.
