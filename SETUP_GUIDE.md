# 📋 Panduan Setup AI Learning Insight

Panduan lengkap untuk menjalankan project AI Learning Insight di laptop Anda.

## 📦 Requirements (Persyaratan)

### 1. Software yang Diperlukan

#### **Node.js** (v16 atau lebih tinggi)
- Download: https://nodejs.org/
- Verifikasi: `node --version` dan `npm --version`
- **Wajib untuk Backend dan Frontend**

#### **Python** (v3.11 atau lebih tinggi)
- Download: https://www.python.org/downloads/
- Verifikasi: `python --version`
- **Wajib untuk Machine Learning Model**

#### **MongoDB** (v6.0 atau lebih tinggi)
- Download: https://www.mongodb.com/try/download/community
- Atau gunakan MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
- **Wajib untuk Database**

#### **Git** (opsional, untuk clone repository)
- Download: https://git-scm.com/downloads

---

## 🚀 Langkah-langkah Setup

### **Step 1: Clone atau Download Project**

```bash
# Jika menggunakan Git
git clone <repository-url>
cd ai-Learning-Insight

# Atau download ZIP dan extract
```

### **Step 2: Setup Backend**

#### 2.1. Install Dependencies

```bash
cd backend
npm install
```

#### 2.2. Setup Environment Variables

Buat file `.env` di folder `backend/` dengan isi:

```env
# MongoDB Connection
# Untuk MongoDB lokal:
MONGODB_URI=mongodb://localhost:27017/ai-learning-insight

# Untuk MongoDB Atlas (cloud):
# Format: mongodb+srv://username:password@cluster.mongodb.net/database-name?appName=Cluster0
# Contoh dengan connection string Anda:
# MONGODB_URI=mongodb+srv://admin:mypassword123@cluster0.uxs6xws.mongodb.net/ai-learning-insight?appName=Cluster0
# 
# ⚠️ PENTING: 
# - Ganti <db_username> dan <db_password> dengan credentials yang sudah dibuat
# - Ganti database-name dengan nama database (atau biarkan kosong untuk default)
# - Lihat MONGODB_ATLAS_SETUP.md untuk panduan lengkap

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Server Port
PORT=5000
```

**⚠️ Penting:**
- Ganti `JWT_SECRET` dengan string random yang kuat (minimal 32 karakter)
- Jika menggunakan MongoDB Atlas, ganti connection string dengan credentials Anda
- Pastikan MongoDB sudah running sebelum menjalankan backend

#### 2.3. Setup Python Virtual Environment

```bash
# Dari root project (bukan dari folder backend)
cd ..
python -m venv .venv

# Aktifkan virtual environment
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

# Install Python dependencies
pip install -r backend/model_dev/requirements.txt
```

**Dependencies Python yang akan diinstall:**
- numpy==1.24.3
- pandas==2.0.3
- scikit-learn==1.3.0
- joblib==1.3.2

#### 2.4. Import User Data dari Dataset (Opsional)

Jika Anda ingin menggunakan data user dari dataset:

```bash
cd backend
npm run import:users
```

Script ini akan membaca file `DATA SPECIALIST/01_basic_user_summary_clean.csv` dan mengimport user ke MongoDB.

**Default password untuk semua user:** `password123`

### **Step 3: Setup Frontend**

#### 3.1. Install Dependencies

```bash
cd frontend
npm install
```

#### 3.2. Setup Environment Variables (Opsional)

Buat file `.env` di folder `frontend/` jika ingin mengubah API URL:

```env
VITE_API_URL=http://localhost:5000
```

**Note:** Default sudah menggunakan `http://localhost:5000`, jadi file ini opsional.

---

## ▶️ Menjalankan Project

### **1. Start MongoDB**

**Jika menggunakan MongoDB lokal:**
```bash
# Windows (jika MongoDB di-install sebagai service, akan auto-start)
# Atau jalankan:
mongod

# Mac/Linux
sudo systemctl start mongod
# Atau:
mongod
```

**Jika menggunakan MongoDB Atlas:**
- Tidak perlu start, sudah cloud-based
- Pastikan connection string di `.env` sudah benar

### **2. Start Backend Server**

```bash
cd backend

# Development mode (dengan auto-reload)
npm run dev

# Production mode
npm start
```

**Backend akan berjalan di:** `http://localhost:5000`

**Verifikasi:**
- Buka browser: `http://localhost:5000/health`
- Harus return: `{ "status": "ok" }`

### **3. Start Frontend Server**

**Buka terminal baru** (biarkan backend tetap running):

```bash
cd frontend

# Development mode
npm run dev
```

**Frontend akan berjalan di:** `http://localhost:5173` (atau port lain yang tersedia)

**Verifikasi:**
- Buka browser: `http://localhost:5173`
- Harus menampilkan halaman login

---

## ✅ Testing Setup

### **1. Test Backend API**

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test login (jika sudah import users)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier": "5181638", "password": "password123"}'
```

### **2. Test Frontend**

1. Buka `http://localhost:5173`
2. Login dengan:
   - **User ID:** `5181638` (atau user lain dari dataset)
   - **Email:** `anggit_andreansyah@dicoding.com` (atau email lain)
   - **Password:** `password123`
3. Setelah login, klik "Lihat Insight Saya!" untuk melihat insights

### **3. Test Python ML Model**

```bash
# Pastikan virtual environment aktif
.venv\Scripts\activate  # Windows
# atau
source .venv/bin/activate  # Mac/Linux

# Test Python script
cd backend/model_dev
python predict.py
```

---

## 🔧 Troubleshooting

### **Problem 1: MongoDB Connection Error**

**Error:** `MongoDB Connection Error: ...`

**Solusi:**
1. Pastikan MongoDB sudah running
2. Check connection string di `.env`
3. Jika menggunakan MongoDB Atlas, pastikan IP whitelist sudah benar
4. Test connection: `mongosh "mongodb://localhost:27017"`

### **Problem 2: Python Not Found**

**Error:** `Python not found at: ...`

**Solusi:**
1. Pastikan Python sudah terinstall: `python --version`
2. Pastikan virtual environment sudah dibuat dan diaktifkan
3. Check path di `backend/src/services/mlService.js`:
   ```javascript
   const pythonPath = path.join(__dirname, '../../../.venv/Scripts/python.exe');
   ```
4. Pastikan path sesuai dengan OS Anda (Windows: `Scripts/python.exe`, Mac/Linux: `bin/python`)

### **Problem 3: Module Not Found (Python)**

**Error:** `ModuleNotFoundError: No module named 'numpy'`

**Solusi:**
1. Pastikan virtual environment aktif
2. Install dependencies: `pip install -r backend/model_dev/requirements.txt`
3. Verifikasi: `pip list`

### **Problem 4: Port Already in Use**

**Error:** `EADDRINUSE: address already in use :::5000`

**Solusi:**
1. Cari process yang menggunakan port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # Mac/Linux
   lsof -i :5000
   ```
2. Kill process atau ubah PORT di `.env`

### **Problem 5: CORS Error di Frontend**

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solusi:**
1. Pastikan backend sudah running
2. Check `vite.config.js` - proxy sudah dikonfigurasi
3. Pastikan `VITE_API_URL` di frontend `.env` sesuai dengan backend URL

### **Problem 6: JWT Token Error**

**Error:** `Not authorized to access this route`

**Solusi:**
1. Pastikan `JWT_SECRET` di backend `.env` sudah di-set
2. Clear localStorage di browser: `localStorage.clear()`
3. Login ulang

### **Problem 7: User Not Found**

**Error:** `User not found` saat login

**Solusi:**
1. Pastikan sudah import users: `npm run import:users` di folder backend
2. Check MongoDB apakah collection `users` sudah ada data
3. Pastikan password: `password123` (default)

---

## 📁 Struktur Project

```
ai-Learning-Insight/
├── backend/
│   ├── src/
│   │   ├── config/          # Database config
│   │   ├── controllers/     # API controllers
│   │   ├── middleware/      # Auth & error handlers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   └── services/        # ML service
│   ├── model_dev/           # Python ML model
│   │   ├── predict.py       # Main prediction script
│   │   └── requirements.txt # Python dependencies
│   ├── scripts/             # Utility scripts
│   │   └── importUsersFromDataset.js
│   ├── .env                 # Environment variables (BUAT FILE INI)
│   ├── package.json
│   └── server.js           # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── contexts/        # React contexts (Auth)
│   │   ├── screens/         # Pages/components
│   │   ├── services/        # API service
│   │   └── ...
│   ├── .env                 # Environment variables (opsional)
│   ├── package.json
│   └── vite.config.js
│
├── DATA SPECIALIST/         # Dataset files
│   └── 01_basic_user_summary_clean.csv
│
└── .venv/                   # Python virtual environment (BUAT FOLDER INI)
```

---

## 🔐 Default Credentials

Setelah import users dari dataset, default password untuk semua user adalah:

```
Password: password123
```

**Contoh user yang bisa digunakan:**
- User ID: `5181638`
- Email: `anggit_andreansyah@dicoding.com`
- Password: `password123`

---

## 📝 Checklist Setup

Gunakan checklist ini untuk memastikan semua sudah setup dengan benar:

- [ ] Node.js terinstall (`node --version`)
- [ ] Python terinstall (`python --version`)
- [ ] MongoDB terinstall dan running
- [ ] Backend dependencies terinstall (`cd backend && npm install`)
- [ ] Frontend dependencies terinstall (`cd frontend && npm install`)
- [ ] Python virtual environment dibuat dan diaktifkan
- [ ] Python dependencies terinstall (`pip install -r backend/model_dev/requirements.txt`)
- [ ] File `.env` di backend sudah dibuat dengan konfigurasi yang benar
- [ ] MongoDB connection string sudah benar
- [ ] JWT_SECRET sudah di-set
- [ ] Users sudah di-import (opsional, tapi disarankan)
- [ ] Backend server running (`npm run dev`)
- [ ] Frontend server running (`npm run dev`)
- [ ] Bisa login dan melihat dashboard
- [ ] Bisa melihat insights

---

## 🆘 Butuh Bantuan?

Jika masih ada masalah:

1. **Check logs:**
   - Backend: Terminal tempat `npm run dev` dijalankan
   - Frontend: Terminal tempat `npm run dev` dijalankan
   - Browser: Console (F12)

2. **Verifikasi requirements:**
   - Pastikan semua software sudah terinstall dengan versi yang benar
   - Pastikan semua dependencies sudah terinstall

3. **Check environment variables:**
   - Pastikan file `.env` sudah dibuat
   - Pastikan semua variable sudah di-set dengan benar

4. **Test step by step:**
   - Test MongoDB connection
   - Test backend API
   - Test frontend
   - Test Python ML model

---

## 🎉 Selamat!

Jika semua checklist sudah dicentang, project Anda sudah siap digunakan!

**Next Steps:**
- Explore dashboard dan insights
- Test dengan user berbeda
- Customize sesuai kebutuhan

