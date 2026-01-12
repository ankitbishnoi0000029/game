# Game Project

A real-time multiplayer game built with Next.js, Socket.IO, and MySQL.

## Features

- Real-time game updates with Socket.IO
- User authentication with JWT
- Game history and statistics
- Responsive design with Tailwind CSS
- Database-driven game rounds

## Local Development

### Prerequisites

- Node.js 18+
- MySQL database
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=game
   JWT_SECRET=your-secret-key
   ```

4. Set up the database:
   ```bash
   # Run the migration script
   mysql -u your_user -p game < db-migration.sql
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Deployment on Vercel

### Database Setup

This app requires a MySQL database. For production, use a cloud database service like:
- PlanetScale
- AWS RDS
- Google Cloud SQL
- Railway
- Or any MySQL-compatible cloud database

### Vercel Deployment Steps

1. **Connect your repository to Vercel**
   - Import your GitHub repository to Vercel
   - Vercel will automatically detect the `vercel.json` configuration

2. **Configure Environment Variables**
   In your Vercel dashboard, go to Project Settings > Environment Variables and add:
   ```
   DB_HOST=your-production-db-host
   DB_USER=your-production-db-user
   DB_PASSWORD=your-production-db-password
   DB_NAME=your-production-db-name
   JWT_SECRET=your-production-jwt-secret
   ```

3. **Database Migration**
   - Run the `db-migration.sql` script on your production database
   - Ensure all required tables are created

4. **Deploy**
   - Push your changes to the main branch
   - Vercel will automatically deploy your app
   - Your app will be available at `https://your-project.vercel.app`

### Important Notes

- This app uses a custom Express server with Socket.IO for real-time functionality
- The `vercel.json` configuration ensures Vercel treats this as a Node.js app rather than a Next.js app
- Socket.IO connections are handled at the `/api/socket` path
- The app is configured for serverless deployment with a 30-second function timeout

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── history/           # History page
│   └── login/             # Login page
├── components/            # React components
├── lib/                   # Database and utility functions
├── server.js              # Custom Express server with Socket.IO
├── vercel.json            # Vercel deployment configuration
└── package.json           # Dependencies and scripts
```

## Technologies Used

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, Socket.IO
- **Database**: MySQL
- **Authentication**: JWT
- **Deployment**: Vercel

## Troubleshooting

### Common Deployment Issues

1. **Database Connection Errors**
   - Ensure all environment variables are set correctly in Vercel
   - Verify your database allows connections from Vercel's IP ranges
   - Check database credentials and host URL

2. **Socket.IO Connection Issues**
   - Verify the Socket.IO path is configured correctly (`/api/socket`)
   - Check browser console for connection errors
   - Ensure CORS is properly configured

3. **Build Failures**
   - Check Vercel deployment logs for specific error messages
   - Ensure all dependencies are listed in `package.json`
   - Verify Node.js version compatibility

### Local Development Issues

1. **Database Setup**
   - Ensure MySQL is running locally
   - Create the database: `CREATE DATABASE game;`
   - Run the migration script

2. **Port Conflicts**
   - The app runs on port 3000 by default
   - Change the port in `server.js` if needed
