# Flask React Template

Boilerplate project for Flask, React & MongoDB based projects. This README documents the steps necessary to get the application up and running, and various components of the application.

| Build Status                                                                                                                                                                                                                                     | Code Coverage                                                                                                                                                                                                                                                                                                   |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [![Production Deploy](https://github.com/jalantechnologies/rflask-boilerplate/actions/workflows/production_on_push.yml/badge.svg?branch=main)](https://github.com/jalantechnologies/rflask-boilerplate/actions/workflows/production_on_push.yml) | [![Code Coverage](https://sonarqube.platform.jalantechnologies.com/api/project_badges/measure?project=jalantechnologies_rflask-boilerplate&metric=coverage&token=a4dd71c68afbb8da4b7ed1026329bf0933298f79)](https://sonarqube.platform.jalantechnologies.com/dashboard?id=jalantechnologies_rflask-boilerplate) |

## Documentation Directory

- [Getting Started](docs/getting-started.md)
- [Backend Architecture](docs/backend-architecture.md)
- [Logging](docs/logging.md)
- [Configuration](docs/configuration.md)
- [Secrets](docs/secrets.md)
- [Bootstrapping](docs/bootstrapping.md)
- [Scripts](docs/scripts.md)
- [Code Formatting](docs/code-formatting.md)
- [Workers](docs/workers.md)
- [Deployment](docs/deployment.md)

## Best Practices

Once you have familiarized yourself with the documentation, head over to the [Engineering Handbook](https://github.com/jalantechnologies/handbook/blob/main/engineering/index.md) to learn about the best practices we follow at Better Software.

PS: Before you start working on the application, these [three git settings](https://spin.atomicobject.com/git-configurations-default/) are a must-have!



# Full Stack Comment Manager – Internship Task

A complete full-stack implementation of a **Comment Management** system using Flask (Backend) and React (Frontend) as part of the internship assignment.

---

##  Features

### 🔧 Backend (Flask + SQLAlchemy)
- RESTful CRUD APIs for managing comments
- Comments are linked to tasks via `task_id`
- Input validations and error handling
- Tested using **Postman**

📁 Code Directory:
src/apps/backend/modules/comment/
 Download all the dependences for a smooth working 
yaml
Copy
Edit

---

### Frontend (React + TypeScript + TailwindCSS)
- Simple UI for:
  - Adding new comments
  - Editing existing comments
  - Deleting comments
  - Listing all comments for a specific task
- Uses `Axios` for API calls
- Clean responsive design

Component File:
src/apps/frontend/components/CommentManager.tsx

yaml
Copy
Edit

---

## 💻 Local Setup Instructions

### Backend Setup

1. Open terminal and activate the virtual environment from root:
   ```bash
   .\venv\Scripts\activate
Navigate to backend directory:

bash
Copy
Edit
cd src\apps\backend
Run the Flask server:

bash
Copy
Edit
python server.p
Flask backend runs on: http://localhost:5000

Frontend Setup
Navigate to frontend directory:

bash
Copy
Edit
cd src\apps\frontend
Start the frontend dev server:

bash
Copy
Edit
npm run serve:frontend
React app runs on: http://localhost:3000

 Testing
Backend tested using Postman (Create, Get, Update, Delete APIs)

Frontend tested in browser (Live React integration)

Comments update live on action without refresh

UI Preview
Screenshots of the working frontend UI have been uploaded in the repository under /screenshots/ or /assets/ folder.

 Notes
The project uses a SQLite database: app.db

Ensure table migrations are applied if starting fresh

Designed with reusability and modularity in mind

 Acknowledgement
Submitted as part of the internship evaluation under Jalance Technologies
Forked from: jalantechnologies/flask-react-template

yaml
Copy
Edit

---

###  Next Step:

- Save this file as `README.md` in the root folder.
- Stage and commit it:
  ```bash
  git add README.md
  git commit -m "Added detailed README for final submission"
  git push origin main
