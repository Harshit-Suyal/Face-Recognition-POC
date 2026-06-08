# Face Recognition POC

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Harshit-Suyal/Face-Recognition-POC.git
cd Face-Recognition-POC
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install AI Service Dependencies

```bash
cd ../ai
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the backend directory and add:

```env
MONGO_URI=your_mongodb_connection_string
```

### 5. Start MongoDB

Make sure your MongoDB server is running.

---

## Running the Project

### Start the AI Service

```bash
cd ai
uvicorn main:app --reload
```

The AI service will run on:

```text
http://localhost:8000
```

### Start the Backend Server

Open a new terminal:

```bash
cd backend
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### Open the Frontend

Open the frontend HTML files in your browser and allow camera access when prompted.

---

## Usage

### Register a Face

1. Enter a name.
2. Allow camera access.
3. Capture your face.
4. Click **Register Face**.

### Search a Face

1. Allow camera access.
2. Capture a face.
3. Click **Search Face**.
4. View the matched user and confidence score.
