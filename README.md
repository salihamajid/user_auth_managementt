User Authentication Management

A serverless web application for user registration, login, and session management using Cloudflare Workers, Workers KV, and Cloudflare Pages.

## Prerequisites
- Node.js (v14 or later)
- npm (comes with Node.js)
- Cloudflare account with Workers and Workers KV enabled

## Deployment Steps

### Frontend (Cloudflare Pages)
1. Clone the repository:
   git clone https://github.com/salihamajid/user_auth_management.git
   cd user_auth_management/frontend
Install dependencies:

npm install
Build the frontend:
npm run build
Deploy to Cloudflare Pages:

Log in to your Cloudflare account.
Go to "Pages" and create a new project, connecting your GitHub repository.
Backend (Cloudflare Workers)
Clone the repository (if not done already):

git clone https://github.com/salihamajid/user_auth_management.git
cd user_auth_management/backend
Create a Cloudflare Worker:

Log in to your Cloudflare account.
Go to "Workers" and create a new worker.
Deploy the worker:

Configure your wrangler.toml file with your account details.
Run:
npx wrangler publish
Usage Instructions
Register: Access the registration form, fill in the details, and submit.
Log In: Access the login form, enter credentials, and submit.
Dashboard: After logging in, view the welcome message and log out option.
API Endpoints
POST /api/register: Register a new user.
POST /api/login: Authenticate a user.
GET /api/dashboard: Access the dashboard (requires session).
POST /api/logout: Invalidate the session.
