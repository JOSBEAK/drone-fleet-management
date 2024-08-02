# Enhanced Drone Fleet Management Interface

This project provides a web interface for managing a drone fleet, including user authentication, drone status overview, and detailed drone information.


## Setup

1. Clone the repository
2. Install Docker and Docker Compose

## Running the Application

1. Build and run the Docker containers:
   ```
   docker-compose up --build
   ```
2. Access the backend at `http://localhost:5001`
3. Access the frontend at `http://localhost:3000`

## User Login

Use the following credentials to log in:
- Username: admin
- Password: password123

## Development

### Backend
The backend is built with Flask. To run it separately:
1. cd backend
2. pip install -r requirements.txt
3. python app.py

### Frontend
The frontend is built with React. To run it separately:
1. cd frontend
2. npm install
3. npm start

## Project Structure

```
project_root/
├── backend/
│   ├── __pycache__/
│   ├── venv/
│   ├── app.py
│   ├── data.json
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── shared/
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   ├── tailwind.config.js
│   └── .dockerignore
├── docker-compose.yml
└── README.md
```

### Backend
- `app.py`: Main Flask application file
- `data.json`: JSON file containing drone and user data
- `Dockerfile`: Docker configuration for the backend
- `requirements.txt`: Python dependencies

### Frontend
- `src/`: Source files for the React application
  - `components/`: React components
  - `shared/`: Shared components
  - `App.js`: Main React component
  - `index.js`: Entry point for the React application
- `public/`: Public assets containing index.html
- `Dockerfile`: Docker configuration for the frontend
- `package.json` & `package-lock.json`: Node.js dependencies
- `tailwind.config.js`: Tailwind CSS configuration

### Docker
- `docker-compose.yml`: Docker Compose configuration for running both frontend and backend services
