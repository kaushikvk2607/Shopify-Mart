# 🛒 Shopify Mart – AI Powered E-Commerce Platform

Shopify Mart is a **full-stack AI-powered e-commerce platform** that integrates a **conversational product discovery chatbot** into the shopping experience.  
Instead of traditional keyword search, users can ask natural language queries and receive **AI-generated personalized product recommendations**.

Example query:

> "I am a student and need headphones under ₹1500 for 4 hours of daily study."

The system uses **semantic search with embeddings and FAISS vector similarity** to retrieve relevant products and generate context-aware responses using a **Large Language Model (LLaMA)**.

---

# 🚀 Live Demo

Frontend:  
👉 https://shopify-mart-five.vercel.app/

GitHub Repository:  
👉 https://github.com/kaushikvk2607/shopify-mart

---

# 📸 Project Architecture

```
User
 │
 ▼
Next.js Frontend (React UI)
 │
 ▼
Next.js API Routes
 │
 ▼
Node.js Backend (Authentication + Business Logic)
 │
 ▼
MongoDB Atlas Database
 │
 ▼
Flask AI Microservice
 │
 ▼
Embeddings → FAISS Vector Search → LLM Response
```

---

# ⚙️ Tech Stack

## Frontend
- Next.js
- React
- Tailwind CSS
- JavaScript

## Backend
- Node.js
- Express.js
- Flask (AI Microservice)
- REST APIs

## AI / NLP
- LangChain
- Sentence Transformers
- LLaMA (Quantized)
- Retrieval Augmented Generation (RAG)

## Vector Search
- FAISS (Facebook AI Similarity Search)

## Database
- MongoDB Atlas
- Mongoose ODM

## Authentication & Security
- JWT Authentication
- bcrypt password hashing
- HTTP-only cookies

## Analytics
- Mixpanel event tracking

## Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

# ✨ Key Features

## 🛍 E-Commerce Platform
- Product listing and browsing
- Product detail pages
- Cart functionality
- Checkout flow
- Responsive UI design

## 🤖 AI Chatbot for Product Discovery
- Conversational product search
- Natural language query understanding
- Semantic similarity search
- Personalized product recommendations

## 🧠 Retrieval-Augmented Generation (RAG)
- User query converted to embeddings
- FAISS performs similarity search
- Relevant product context retrieved
- LLM generates grounded responses

## 🔐 Authentication System
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes

## 📊 Product Analytics (Mixpanel)
Tracks user behavior including:
- Page views
- Product clicks
- Product views
- Add to cart
- Checkout initiated
- Purchase completed
- Chatbot interactions

## ⚡ Performance Optimizations
- Lazy loading AI models
- Vector index optimization
- Code splitting
- Reduced API latency

---

# 🧠 AI Chatbot Workflow

```
User Query
   │
   ▼
Sentence Transformer Embedding
   │
   ▼
FAISS Similarity Search
   │
   ▼
Retrieve Top-K Product Documents
   │
   ▼
Inject Context into Prompt
   │
   ▼
LLaMA Model Generates Response
   │
   ▼
Response Returned to UI
```

This pipeline ensures:

- Reduced hallucination
- Context-aware responses
- Domain-specific recommendations

---

# 🔐 Authentication Flow

### Registration
1. User submits email, username and password  
2. Password hashed using bcrypt  
3. Stored securely in MongoDB  

### Login
1. Email and password verified  
2. JWT access token generated  
3. Token stored in HTTP-only cookies  

### Protected Routes
Middleware verifies JWT token before granting access.

---

# 📂 Project Structure

```
shopify-mart
│
├── frontend
│   ├── components
│   ├── pages
│   ├── styles
│   └── api routes
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   └── authentication
│
├── ai-chatbot
│   ├── flask server
│   ├── embeddings
│   ├── FAISS index
│   └── LLM integration
│
└── README.md
```

---

# 🛠 Installation Guide

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/kaushikvk2607/shopify-mart.git
cd shopify-mart
```

---

## 2️⃣ Install Dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

### AI Chatbot

```bash
cd ai-chatbot
pip install -r requirements.txt
```

---

## 3️⃣ Environment Variables

Create a `.env` file.

Example:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
MIXPANEL_TOKEN=your_mixpanel_token
```

---

## 4️⃣ Run the Project

### Start Frontend

```bash
npm run dev
```

### Start Backend

```bash
npm start
```

### Start AI Chatbot

```bash
python app.py
```

---

# 📊 Performance Optimizations

Implemented several system-level optimizations:

- Lazy loading of LLM and FAISS index
- Reduced maximum token generation
- Vector indexing for faster retrieval
- Stateless JWT authentication
- Efficient React state management

---

# 🚧 Challenges & Solutions

### Problem: Slow chatbot startup
Cause: Large model and FAISS index loading.

Solution: Implemented **lazy loading** so models load only on first request.

---

### Problem: LLM hallucination
Cause: LLM generating responses without context.

Solution: Implemented **strict RAG pipeline with top-k retrieval**.

---

### Problem: Deployment limitations
Cause: Large LLaMA model required high memory.

Solution: Separated chatbot as **independent microservice**.

---

# 📈 Future Improvements

- Deploy chatbot on GPU instance
- Add product recommendation ranking
- Implement caching layer for embeddings
- Integrate payment gateway
- Add user review system

---

# 👨‍💻 Author

**Vikas Kaushik**  
Computer Science Undergraduate – IIIT Bhopal

GitHub:  
https://github.com/kaushikvk2607

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.
