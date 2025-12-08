# 🚀 Panduan Deployment Gratis - AI Learning Insight

Panduan lengkap untuk mendeploy API backend dan frontend website secara **GRATIS** agar bisa diakses online.

## 📋 Daftar Platform Gratis

### **Backend API (Node.js)**
1. **Railway** ⭐ (Recommended) - $5 credit gratis/bulan
2. **Render** - Free tier dengan sleep mode
3. **Fly.io** - Free tier dengan resource limits
4. **Cyclic** - Free tier untuk serverless
5. **Vercel** - Free tier untuk serverless functions

### **Frontend (React)**
1. **Vercel** ⭐ (Recommended) - Free tier, sangat cepat
2. **Netlify** - Free tier, mudah digunakan
3. **GitHub Pages** - Gratis, tapi perlu setup khusus

### **Database (MongoDB)**
1. **MongoDB Atlas** ⭐ (Recommended) - Free tier 512MB

---

## 🎯 Rekomendasi Setup (Paling Mudah)

**Backend:** Railway atau Render  
**Frontend:** Vercel  
**Database:** MongoDB Atlas  

---

## 📦 Persiapan Sebelum Deploy

### 1. Update Environment Variables untuk Production

#### Backend `.env` (untuk production):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-learning-insight?retryWrites=true&w=majority
JWT_SECRET=your-very-strong-secret-key-min-32-characters-random
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=production
```

#### Frontend `.env.production`:
```env
VITE_API_URL=https://your-backend-api.railway.app
# atau
VITE_API_URL=https://your-backend-api.onrender.com
```

### 2. Update CORS di Backend

Pastikan `backend/server.js` mengizinkan domain frontend:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173', // Development
    'https://your-frontend.vercel.app', // Production
    'https://your-frontend.netlify.app' // Production alternative
  ],
  credentials: true
}));
```

### 3. Build Frontend untuk Production

```bash
cd frontend
npm run build
```

Output akan di folder `frontend/dist/`

---

## 🗄️ Setup MongoDB Atlas (Database)

### Step 1: Buat Akun MongoDB Atlas
1. Kunjungi: https://www.mongodb.com/cloud/atlas/register
2. Buat akun gratis
3. Pilih **Free Tier (M0)**

### Step 2: Buat Cluster
1. Klik **"Build a Database"**
2. Pilih **"M0 FREE"** (Shared)
3. Pilih region terdekat (misal: Singapore)
4. Klik **"Create"**

### Step 3: Setup Network Access
1. Klik **"Network Access"** di sidebar
2. Klik **"Add IP Address"**
3. Pilih **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Klik **"Confirm"**

### Step 4: Buat Database User
1. Klik **"Database Access"** di sidebar
2. Klik **"Add New Database User"**
3. Pilih **"Password"** authentication
4. Buat username dan password (simpan dengan aman!)
5. Klik **"Add User"**

### Step 5: Dapatkan Connection String
1. Klik **"Connect"** pada cluster Anda
2. Pilih **"Connect your application"**
3. Copy connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   Atau dengan format yang diberikan MongoDB Atlas:
   ```
   mongodb+srv://<db_username>:<db_password>@cluster0.uxs6xws.mongodb.net/?appName=Cluster0
   ```
4. **Ganti placeholder:**
   - `<username>` atau `<db_username>` → Ganti dengan username database user yang sudah dibuat
   - `<password>` atau `<db_password>` → Ganti dengan password database user yang sudah dibuat
5. **Tambahkan database name** di akhir (sebelum `?`):
   ```
   mongodb+srv://username:password@cluster0.uxs6xws.mongodb.net/ai-learning-insight?appName=Cluster0
   ```

**Contoh lengkap:**
```
mongodb+srv://admin:mypassword123@cluster0.uxs6xws.mongodb.net/ai-learning-insight?appName=Cluster0
```

**✅ Connection string ini akan digunakan di backend environment variables**

**📖 Untuk panduan lengkap setup connection string, lihat [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md)**

---

## 🚂 Option 1: Deploy Backend ke Railway (Recommended)

### Kelebihan:
- ✅ Free tier dengan $5 credit/bulan
- ✅ Auto-deploy dari GitHub
- ✅ Environment variables mudah di-set
- ✅ Tidak ada sleep mode

### Step 1: Buat Akun Railway
1. Kunjungi: https://railway.app/
2. Login dengan GitHub

### Step 2: Buat Project Baru
1. Klik **"New Project"**
2. Pilih **"Deploy from GitHub repo"**
3. Pilih repository Anda
4. Railway akan auto-detect Node.js

### Step 3: Setup Environment Variables
1. Klik project → **"Variables"** tab
2. Tambahkan variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-learning-insight
   JWT_SECRET=your-very-strong-secret-key
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=production
   ```

### Step 4: Setup Build & Start Commands
1. Klik **"Settings"** → **"Deploy"**
2. **Root Directory:** `backend`
3. **Build Command:** (kosongkan, atau `npm install`)
4. **Start Command:** `npm start`

### Step 5: Deploy
1. Railway akan auto-deploy
2. Tunggu hingga selesai
3. Klik **"Generate Domain"** untuk mendapatkan URL
4. URL akan seperti: `https://your-app.railway.app`

**✅ Backend URL:** `https://your-app.railway.app`

---

## 🎨 Option 2: Deploy Backend ke Render

### Kelebihan:
- ✅ Free tier tersedia
- ⚠️ Sleep mode setelah 15 menit tidak aktif (wake up butuh waktu)

### Step 1: Buat Akun Render
1. Kunjungi: https://render.com/
2. Login dengan GitHub

### Step 2: Buat Web Service
1. Klik **"New +"** → **"Web Service"**
2. Connect GitHub repository
3. Pilih repository

### Step 3: Configure Service
- **Name:** `ai-learning-insight-backend`
- **Environment:** `Node`
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### Step 4: Setup Environment Variables
Tambahkan di **"Environment"** section:
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
JWT_EXPIRE=7d
PORT=10000
NODE_ENV=production
```

**Note:** Render menggunakan port dari environment variable `PORT`

### Step 5: Deploy
1. Klik **"Create Web Service"**
2. Tunggu deployment selesai
3. URL akan seperti: `https://your-app.onrender.com`

**✅ Backend URL:** `https://your-app.onrender.com`

---

## ⚡ Deploy Frontend ke Vercel (Recommended)

### Kelebihan:
- ✅ Free tier sangat baik
- ✅ Auto-deploy dari GitHub
- ✅ CDN global (sangat cepat)
- ✅ Custom domain gratis

### Step 1: Buat Akun Vercel
1. Kunjungi: https://vercel.com/
2. Login dengan GitHub

### Step 2: Import Project
1. Klik **"Add New..."** → **"Project"**
2. Pilih repository GitHub
3. Klik **"Import"**

### Step 3: Configure Project
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 4: Setup Environment Variables
Tambahkan di **"Environment Variables"**:
```
VITE_API_URL=https://your-backend.railway.app
# atau
VITE_API_URL=https://your-backend.onrender.com
```

### Step 5: Deploy
1. Klik **"Deploy"**
2. Tunggu build selesai
3. URL akan seperti: `https://your-app.vercel.app`

**✅ Frontend URL:** `https://your-app.vercel.app`

---

## 🌐 Alternative: Deploy Frontend ke Netlify

### Step 1: Buat Akun Netlify
1. Kunjungi: https://www.netlify.com/
2. Login dengan GitHub

### Step 2: Deploy Site
1. Klik **"Add new site"** → **"Import an existing project"**
2. Pilih repository
3. Configure:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`

### Step 3: Setup Environment Variables
1. Klik **"Site settings"** → **"Environment variables"**
2. Tambahkan:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```

### Step 4: Deploy
1. Klik **"Deploy site"**
2. URL akan seperti: `https://your-app.netlify.app`

---

## 🔧 Update Backend untuk Production

### 1. Update CORS di `backend/server.js`

```javascript
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173', // Development
  process.env.FRONTEND_URL, // Production frontend URL
  'https://your-app.vercel.app',
  'https://your-app.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### 2. Update Python Path untuk Production

Jika menggunakan Railway/Render, pastikan Python path benar di `backend/src/services/mlService.js`:

```javascript
// Untuk production, mungkin perlu adjust path
const pythonPath = process.env.PYTHON_PATH || 
  path.join(__dirname, '../../../.venv/Scripts/python.exe');
```

**Note:** Railway/Render mungkin perlu setup Python secara khusus atau menggunakan Docker.

---

## 🐳 Alternative: Deploy dengan Docker (Advanced)

Jika platform tidak support Python langsung, bisa pakai Docker.

### 1. Buat `Dockerfile` di `backend/`:

```dockerfile
FROM node:18

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy Python requirements
COPY model_dev/requirements.txt ./model_dev/
RUN pip3 install -r model_dev/requirements.txt

# Copy application
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### 2. Deploy ke Railway dengan Docker:
- Railway akan auto-detect Dockerfile
- Atau set **"Dockerfile Path"** di settings

---

## 📝 Checklist Deployment

- [ ] MongoDB Atlas sudah setup dan dapat connection string
- [ ] Backend environment variables sudah di-set
- [ ] Frontend environment variables sudah di-set (VITE_API_URL)
- [ ] CORS sudah dikonfigurasi untuk production domain
- [ ] Backend sudah di-deploy dan dapat URL
- [ ] Frontend sudah di-deploy dan dapat URL
- [ ] Test login dari frontend production
- [ ] Test API endpoints dari frontend production
- [ ] Import users ke MongoDB Atlas (jika perlu)

---

## 🧪 Testing Deployment

### 1. Test Backend API:
```bash
# Health check
curl https://your-backend.railway.app/health

# Test login
curl -X POST https://your-backend.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier": "5181638", "password": "password123"}'
```

### 2. Test Frontend:
1. Buka URL frontend di browser
2. Coba login
3. Cek apakah data ter-load dari backend

### 3. Test ML Model:
- Login dan buka halaman insights
- Pastikan insights ter-generate dengan benar

---

## 🔐 Security Best Practices

### 1. Environment Variables
- ✅ Jangan commit `.env` ke GitHub
- ✅ Gunakan strong JWT_SECRET (minimal 32 karakter)
- ✅ Rotate secrets secara berkala

### 2. MongoDB Atlas
- ✅ Gunakan strong password
- ✅ Restrict IP access jika mungkin
- ✅ Enable MongoDB Atlas authentication

### 3. CORS
- ✅ Hanya allow domain yang diperlukan
- ✅ Jangan gunakan `*` di production

---

## 🆘 Troubleshooting

### Problem 1: Backend tidak bisa connect ke MongoDB
**Solusi:**
- Check MongoDB Atlas network access (allow 0.0.0.0/0)
- Check connection string (username, password, database name)
- Check MongoDB Atlas cluster status

### Problem 2: CORS Error di Frontend
**Solusi:**
- Update CORS di backend untuk include frontend URL
- Check apakah frontend URL sudah benar di environment variables

### Problem 3: Python ML Model tidak jalan
**Solusi:**
- Check Python path di production
- Pastikan Python dependencies terinstall
- Consider menggunakan Docker untuk Python environment

### Problem 4: Environment Variables tidak terbaca
**Solusi:**
- Pastikan variables sudah di-set di platform
- Restart service setelah update variables
- Check apakah nama variable sudah benar (case-sensitive)

---

## 📊 Perbandingan Platform

| Platform | Free Tier | Sleep Mode | Auto-Deploy | Python Support |
|----------|-----------|------------|-------------|----------------|
| **Railway** | $5 credit/bulan | ❌ No | ✅ Yes | ✅ Yes |
| **Render** | ✅ Yes | ⚠️ Yes (15min) | ✅ Yes | ✅ Yes |
| **Fly.io** | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |
| **Vercel** | ✅ Yes | ❌ No | ✅ Yes | ⚠️ Serverless only |
| **Netlify** | ✅ Yes | ❌ No | ✅ Yes | ❌ No |

---

## 🎉 Selesai!

Setelah semua setup, Anda akan punya:
- ✅ Backend API: `https://your-backend.railway.app`
- ✅ Frontend: `https://your-app.vercel.app`
- ✅ Database: MongoDB Atlas (cloud)

**Project sudah bisa diakses online secara GRATIS!** 🚀

---

## 📚 Resources

- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

