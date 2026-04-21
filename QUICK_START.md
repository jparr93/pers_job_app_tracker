# Job Application Tracker - Quick Start Guide

## 🎯 Project Overview

Your Job Application Tracker application has been fully built! It's a complete full-stack application with:
- ✅ React frontend with modern UI
- ✅ Express.js backend with JWT authentication
- ✅ SQLite database for local development
- ✅ Kanban board for job tracking
- ✅ Templates page with downloadable resources
- ✅ Job hunting advice/tips page
- ✅ GitHub Actions CI/CD pipeline
- ✅ Azure App Service deployment ready

## 🚀 Getting Started (5 minutes)

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Create Environment File
```bash
cp .env.example .env
```

### 3. Start Development Server
```bash
npm run dev
```

The application will open:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📋 First Steps

1. **Sign up** with a username and password
2. **Add jobs** using the "Add Job" button
3. **Drag and drop** jobs between columns to update status
4. **Download templates** from the Templates page
5. **Read advice** from the Useful Advice page

## 📁 Project Structure

```
pers_job_app_tracker/
├── server/               # Node.js + Express backend
├── client/               # React frontend
├── .github/workflows/    # GitHub Actions CI/CD
├── .env.example          # Configuration template
└── README.md             # Full documentation
```

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (both frontend & backend) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run install-all` | Install all dependencies |

## 🔧 Features Built

### Job Tracker (Kanban Board)
- 6 columns: Saved, Started, Applied, Interview, Successful, Unsuccessful
- Drag & drop between columns
- Add new jobs with title, link, date, contacts, salary, notes
- Delete jobs
- View detailed job information

### Authentication
- Local username/password signup
- JWT token-based authentication
- Secure password hashing with bcrypt
- Token stored in local storage

### Templates Page
- 6 pre-configured templates (CV variations, cover letters, interview prep)
- Download functionality
- Tips for using templates

### Useful Advice Page
- 6 sections of job hunting tips:
  - Before Applying
  - During Application
  - Interview Preparation
  - During Interview
  - After Interview
  - General Tips

## 🐛 Common Issues & Solutions

**Port 3000 or 5000 already in use?**
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

**Database issues?**
```bash
# Delete the database file and restart
rm data/jobs.db
npm run dev
```

**Dependencies not installing?**
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run install-all
```

## 🚀 Deploying to Azure

### Prerequisites
1. Azure subscription
2. GitHub account
3. GitHub Actions enabled

### Step 1: Create Azure App Service
```bash
az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name job-app-tracker --runtime "node|24"
```

### Step 2: Get Publish Profile
1. Go to Azure Portal → App Service → Download publish profile
2. Copy the content

### Step 3: Add GitHub Secret
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `AZURE_WEBAPP_PUBLISH_PROFILE`
4. Value: Paste the publish profile content

### Step 4: Configure Azure Variables
1. Go to Azure App Service → Configuration
2. Add these Application Settings:
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: (create a strong secret)
   - `PORT`: `8080`

### Step 5: Deploy
```bash
git push origin main
```

GitHub Actions will automatically build and deploy!

## 📚 Next Steps

### To Add More Features:
1. Backend: Add routes in `server/src/routes/`
2. Frontend: Add components in `client/src/components/`
3. Database: Update schema in `server/src/database/init.js`

### Potential Enhancements:
- 📧 Email notifications for reminders
- 📊 Statistics dashboard
- 🔍 Company research integration
- 📱 Mobile app version
- ☁️ Cloud storage for documents
- 🎯 AI-powered job matching

## 📖 Documentation

- Full docs: See [README.md](README.md)
- API documentation: Check `server/src/routes/`
- Component docs: Check `client/src/components/`

## ✅ Verification Checklist

- [x] Frontend setup (React + Vite + Tailwind)
- [x] Backend setup (Express + SQLite)
- [x] Authentication system
- [x] Job Tracker Kanban board
- [x] Templates page
- [x] Advice page
- [x] GitHub Actions pipeline
- [x] Azure deployment ready
- [x] Environment configuration
- [x] Production build setup

## 🎉 You're All Set!

Your Job Application Tracker is ready to use. Start the development server with:

```bash
npm run dev
```

Then visit **http://localhost:3000** and create an account!

---

**Questions or issues?** Check [README.md](README.md) for detailed documentation or create a GitHub issue.

Good luck with your job applications! 🚀
