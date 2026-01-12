# Game Project

A real-time multiplayer game built with Next.js and MySQL.

## Features

- Real-time game updates with polling
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

- This app uses Next.js API routes for serverless functionality
- Real-time updates are achieved through polling (client polls every 2 seconds)
- The app is deployed as a standard Next.js application on Vercel
- Game state and user selections are managed through RESTful API endpoints

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes (game-state, user-selection)
│   ├── history/           # History page
│   └── login/             # Login page
├── components/            # React components
├── lib/                   # Database and utility functions
├── vercel.json            # Vercel deployment configuration
└── package.json           # Dependencies and scripts
```

## Technologies Used

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MySQL
- **Authentication**: JWT
- **Real-time Updates**: Polling-based (API calls every 2 seconds)
- **Deployment**: Vercel

## Important Notes

- **Real-time Functionality**: Due to Vercel's serverless limitations, this app uses polling instead of WebSockets for real-time updates. The client polls the server every 2 seconds for game state and wheel value updates.
- **Database**: Requires a MySQL database (PlanetScale, AWS RDS, or similar cloud service).
- **Game Timing**: The game runs from 9:00 AM to 9:00 PM IST (3:30 AM to 3:30 PM UTC) with 15-minute rounds.

## Troubleshooting

### Common Deployment Issues

1. **Database Connection Errors**
   - Ensure all environment variables are set correctly in Vercel
   - Verify your database allows connections from Vercel's IP ranges
   - Check database credentials and host URL

2. **Real-time Update Issues**
   - Check browser network tab to ensure API calls are working (should poll every 2 seconds)
   - Verify API routes are responding correctly
   - Check browser console for fetch errors

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
