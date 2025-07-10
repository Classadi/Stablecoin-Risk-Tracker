💹 Stablecoin Depeg Risk Tracker

A full-stack application that predicts and visualizes depeg risks in stablecoins like USDT, USDC, DAI, FRAX, and more. The system consists of a high-performance C++ backend and a modern React + TypeScript frontend.

---

## 🧠 System Architecture

[React + TypeScript + Tailwind (Frontend)]
│
▼
[Node/Vite Dev Server]
│
▼
[REST API / WebSocket Interface]
│
▼
[C++ Backend]
├── Multi-threaded risk tracker
├── Real-time depeg risk analysis
└── Scoring engine (price, sentiment, liquidity, volatility)

yaml
Copy
Edit

---

## 🚀 Features

- Real-time depeg risk detection
- Risk scoring using financial and on-chain indicators
- Modular C++ backend with multi-threaded analysis
- Interactive frontend built with React + Tailwind
- Configurable thresholds and alert system

---

## 🛠 Technologies Used

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite
- shadcn/ui

### Backend
- C++17 / C++20
- `std::thread` for concurrency
- nlohmann/json for data parsing
- Mock data generation (easily replaceable with APIs)

---

## 🧪 Local Setup Instructions

### 🔧 Prerequisites

- Node.js & npm (recommended: install with [nvm](https://github.com/nvm-sh/nvm))
- Modern C++ compiler (e.g., g++ 9+)
- Git

---

### 📦 Clone the Repository

```bash
git clone <YOUR_GIT_REPO_URL>
cd <YOUR_PROJECT_NAME>
🖥 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
⚙️ Backend Setup
bash
Copy
Edit
cd backend
g++ -std=c++17 -pthread stablecoin_tracker.cpp -o tracker
./tracker
📊 Sample Output
yaml
Copy
Edit
[USDT] Price: 1.02, Risk: 3.5 (Medium)
[DAI]  Price: 0.97, Risk: 6.8 (High)
📁 Project Structure
pgsql
Copy
Edit
📦 stablecoin-tracker/
├── backend/
│   ├── stablecoin_tracker.cpp
│   └── include/
├── frontend/
│   ├── src/
│   ├── public/
├── README.md
├── package.json
└── CMakeLists.txt
📢 License
This project is licensed under the MIT License.

👨‍💻 Developed by
Aditya Chaudhari
Backend Developer (C++ Risk Prediction Engine)
Frontend: Modern UI built with React & Tailwind
