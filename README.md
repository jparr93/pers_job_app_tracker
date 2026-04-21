# Job Application Tracker

A modern web application to help job seekers track their applications, access CV and cover letter templates, and get valuable job hunting advice.

## Features

- **Job Tracker**: Kanban board with 6 statuses (Saved, Started, Applied, Interview, Successful, Unsuccessful)
- **User Authentication**: Secure login/signup with local usernames
- **Templates**: Downloadable CV and cover letter templates
- **Job Hunting Tips**: Comprehensive advice for job applications and interviews
- **Modern UI**: Clean, responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js 24 + Express.js
- **Database**: SQLite
- **Authentication**: JWT tokens
- **Deployment**: Azure App Service with GitHub Actions CI/CD

## Project Structure

```
pers_job_app_tracker/
├── server/                 # Express.js backend
│   ├── src/
│   │   ├── index.js       # Main server entry point
│   │   ├── database/
│   │   │   └── init.js    # Database initialization
│   │   └── routes/
│   │       ├── auth.js    # Authentication endpoints
│   │       └── jobs.js    # Job tracker endpoints
│   └── package.json
├── client/                 # React frontend
│   ├── src/
│   │   ├── main.jsx       # React entry point
│   │   ├── App.jsx        # Main App component
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   └── utils/         # Helper functions and API calls
│   └── package.json
├── .github/
│   └── workflows/
│       └── build-deploy.yml  # CI/CD pipeline
├── .env.example           # Environment variables template
├── package.json           # Root package for monorepo
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 24.x installed
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pers_job_app_tracker
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and update configuration as needed
   ```

### Development

Run both server and client concurrently:

```bash
npm run dev
```

This will start:
- Backend on `http://localhost:5000`
- Frontend on `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This builds both the server and client for production deployment.

### Running in Production

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create a new account
- `POST /api/auth/login` - Login to account

### Jobs

All job endpoints require authentication (Bearer token in header)

- `GET /api/jobs` - Get all user's jobs
- `GET /api/jobs/:id` - Get specific job
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job details
- `DELETE /api/jobs/:id` - Delete job

## Deployment to Azure

### Prerequisites

- Azure account with an App Service plan
- GitHub with secrets configured

### Setup Instructions

1. **Create Azure App Service**
   ```bash
   az webapp create --resource-group <group-name> --plan <plan-name> --name job-app-tracker --runtime "node|24"
   ```

2. **Get publish profile**
   - In Azure Portal, go to App Service → Download publish profile
   - Add to GitHub Secrets as `AZURE_WEBAPP_PUBLISH_PROFILE`

3. **Push to main branch**
   ```bash
   git push origin main
   ```

GitHub Actions will automatically:
- Install dependencies
- Build the application
- Run tests
- Deploy to Azure App Service

4. **Configure environment on Azure**
   - Go to Configuration → Application Settings
   - Add variables: `NODE_ENV=production`, `JWT_SECRET`, `PORT=8080`

## Usage Guide

### Creating an Account
1. Click "Sign Up" on the login page
2. Enter username, email, and password
3. Click "Sign Up" to create account

### Adding a Job
1. Go to Job Tracker
2. Click "+ Add Job"
3. Fill in job details
4. Click "Add Job"

### Managing Applications
- **Drag and Drop**: Move cards between columns to update status
- **View Details**: Click on a job card to see all information
- **Delete**: Click delete button on card to remove

### Accessing Templates
1. Go to Templates page
2. Download the template you need
3. Customize with your information

### Viewing Tips
1. Go to Useful Advice page
2. Browse tips organized by stage
3. Read and apply the advice to your search

## Development Notes

### Adding New Features

1. Backend: Add route in `server/src/routes/`
2. Frontend: Add component in `client/src/components/` or `client/src/pages/`
3. Update API calls in `client/src/utils/api.js`

### Database Changes

- Modify schema in `server/src/database/init.js`
- Add migrations as needed
- SQLite database file: `data/jobs.db`

## Troubleshooting

**Port already in use**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**Database locked**
- Delete `data/jobs.db` and restart (data will be reset)

**CORS errors**
- Check `corsOptions` in `server/src/index.js`
- Ensure frontend and backend URLs match environment config

## Future Enhancements

- Email notifications for application reminders
- Resume/CV upload and parsing
- Salary tracking and comparison
- Company research integration
- Interview scheduling
- Statistics and analytics dashboard
- Export data functionality
- Mobile app

## License

MIT

## Support

For issues or suggestions, please create a GitHub issue.
