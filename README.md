# Face Recognition POC

## Clone the Repository

```bash
git clone https://github.com/Harshit-Suyal/Face-Recognition-POC.git

cd Face-Recognition-POC
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

AI_SERVICE_URL=http://localhost:8000
```

---

## AI Service Setup

```bash
cd ai

pip install -r requirements.txt
```

---

## Run the AI Service

Open a terminal:

```bash
cd ai/src

uvicorn main:app --reload
```

AI Service:

```text
http://localhost:8000
```

Swagger Docs:

```text
http://localhost:8000/docs
```

---

## Run the Backend

Open a new terminal:

```bash
cd backend

npm start
```

Application:

```text
http://localhost:5000
```

---

## Usage

### Register Face

1. Open `http://localhost:5000/register`
2. Enter a name.
3. Allow camera access.
4. Click **Register Face**.

### Search Face

1. Open `http://localhost:5000/search`
2. Allow camera access.
3. Click **Search Face**.
4. View the matched user and confidence score.
