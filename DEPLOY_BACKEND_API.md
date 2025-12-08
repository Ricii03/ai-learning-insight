# 🚀 Deploy Backend API ke Production

Panduan lengkap untuk mendeploy backend agar menjadi API yang bisa di-fetch dari frontend.

## 📋 Prerequisites

✅ **Sudah selesai:**
- Database MongoDB Atlas sudah setup
- Users sudah di-import ke MongoDB Atlas
- Connection string sudah di-set

## 🎯 Platform Gratis untuk Deploy Backend

### **Option 1: Railway (Recommended) ⭐**
- ✅ Free tier: $5 credit/bulan
- ✅ Tidak ada sleep mode
- ✅ Auto-deploy dari GitHub
- ✅ Mudah setup

### **Option 2: Render**
- ✅ Free tier tersedia
- ⚠️ Sleep mode setelah 15 menit tidak aktif
- ✅ Auto-deploy dari GitHub

---

## 🚂 Deploy ke Railway (Recommended)

### **Step 1: Persiapkan Repository**

Pastikan project sudah di-push ke GitHub:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### **Step 2: Buat Akun Railway**

1. Kunjungi: https://railway.app/
2. Klik **"Login"** → Login dengan **GitHub**
3. Authorize Railway untuk akses GitHub repositories

### **Step 3: Buat Project Baru**

1. Setelah login, klik **"New Project"**
2. Pilih **"Deploy from GitHub repo"**
3. Pilih repository Anda: `ai-Learning-Insight`
4. Railway akan auto-detect Node.js

### **Step 4: Configure Service**

1. Klik pada service yang baru dibuat
2. Klik **"Settings"** tab
3. Scroll ke **"Deploy"** section
4. Set:
   - **Root Directory:** `backend`
   - **Build Command:** (kosongkan, atau `npm install`)
   - **Start Command:** `npm start`

### **Step 5: Setup Environment Variables**

1. Klik **"Variables"** tab
2. Klik **"New Variable"** untuk setiap variable:

   **Variable 1:**
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://riciAsah:R283D5Y1703@cluster0.uxs6xws.mongodb.net/ai-learning-insight?appName=Cluster0`
   - Klik **"Add"**

   **Variable 2:**
   - Name: `JWT_SECRET`
   - Value: `your-super-secret-jwt-key-min-32-characters-random-string`
   - Klik **"Add"**

   **Variable 3:**
   - Name: `JWT_EXPIRE`
   - Value: `7d`
   - Klik **"Add"**

   **Variable 4:**
   - Name: `PORT`
   - Value: `5000`
   - Klik **"Add"**

   **Variable 5:**
   - Name: `NODE_ENV`
   - Value: `production`
   - Klik **"Add"**

### **Step 6: Generate Domain**

1. Klik **"Settings"** tab
2. Scroll ke **"Networking"** section
3. Klik **"Generate Domain"**
4. Railway akan generate domain seperti: `your-app-name.up.railway.app`
5. **Copy domain ini** (akan digunakan di frontend)

### **Step 7: Deploy**

1. Railway akan otomatis deploy setelah setup
2. Tunggu hingga deployment selesai (biasanya 2-3 menit)
3. Check logs untuk memastikan tidak ada error
4. Test API: `https://your-app-name.up.railway.app/health`

**✅ Backend API URL:** `https://your-app-name.up.railway.app`

---

## 🎨 Deploy ke Render (Alternative)

### **Step 1: Buat Akun Render**

1. Kunjungi: https://render.com/
2. Klik **"Get Started for Free"**
3. Login dengan **GitHub**

### **Step 2: Buat Web Service**

1. Klik **"New +"** → **"Web Service"**
2. Connect GitHub repository: `ai-Learning-Insight`
3. Klik **"Connect"**

### **Step 3: Configure Service**

- **Name:** `ai-learning-insight-backend`
- **Environment:** `Node`
- **Region:** Pilih yang terdekat (Singapore recommended)
- **Branch:** `main`
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### **Step 4: Setup Environment Variables**

Klik **"Add Environment Variable"** untuk setiap variable:

```
MONGODB_URI=mongodb+srv://riciAsah:R283D5Y1703@cluster0.uxs6xws.mongodb.net/ai-learning-insight?appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRE=7d
PORT=10000
NODE_ENV=production
```

**Note:** Render menggunakan port dari environment variable `PORT`, biasanya `10000`.

### **Step 5: Deploy**

1. Klik **"Create Web Service"**
2. Render akan mulai deploy
3. Tunggu hingga selesai (biasanya 3-5 menit)
4. URL akan seperti: `https://ai-learning-insight-backend.onrender.com`

**✅ Backend API URL:** `https://ai-learning-insight-backend.onrender.com`

---

## ✅ Verifikasi Deployment

### **Test API Endpoints:**

```bash
# 1. Health Check
curl https://your-app-name.up.railway.app/health

# Expected response:
# {"status":"ok","timestamp":"...","mongodb":"connected"}

# 2. Test Login
curl -X POST https://your-app-name.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier": "5181638", "password": "password123"}'

# Expected response:
# {"success":true,"message":"Login successful","data":{"user":{...},"token":"..."}}
```

### **Test dari Browser:**

1. Buka: `https://your-app-name.up.railway.app/health`
2. Harus return JSON: `{"status":"ok",...}`

---

## 🔧 Update CORS untuk Production

Pastikan backend mengizinkan frontend domain. Update `backend/server.js`:

```javascript
const allowedOrigins = [
  'http://localhost:5173', // Development
  process.env.FRONTEND_URL, // Production frontend URL
  'https://your-frontend.vercel.app', // Vercel
  'https://your-frontend.netlify.app' // Netlify
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

**Atau tambahkan di Railway Environment Variables:**
- Name: `FRONTEND_URL`
- Value: `https://your-frontend.vercel.app`

---

## 📝 Checklist Deployment

- [ ] Repository sudah di-push ke GitHub
- [ ] Akun Railway/Render sudah dibuat
- [ ] Project sudah dibuat dan connect ke GitHub
- [ ] Root Directory sudah di-set ke `backend`
- [ ] Start Command sudah di-set ke `npm start`
- [ ] Environment Variables sudah di-set (MONGODB_URI, JWT_SECRET, dll)
- [ ] Domain sudah di-generate
- [ ] Deployment berhasil
- [ ] Health check endpoint berhasil
- [ ] Login endpoint berhasil

---

## 🔗 Update Frontend untuk Production

Setelah backend di-deploy, update frontend:

### **1. Update `frontend/.env.production`:**

```env
VITE_API_URL=https://your-app-name.up.railway.app
```

### **2. Atau set di Vercel/Netlify Environment Variables:**

- Name: `VITE_API_URL`
- Value: `https://your-app-name.up.railway.app`

---

## 🆘 Troubleshooting

### **Problem 1: Build Failed**

**Error:** `npm install` failed

**Solusi:**
- Check `package.json` dependencies
- Pastikan `node_modules` tidak di-commit (ada di `.gitignore`)
- Check build logs di Railway/Render

### **Problem 2: Application Crashed**

**Error:** Application exited with code 1

**Solusi:**
- Check logs di Railway/Render dashboard
- Pastikan environment variables sudah di-set dengan benar
- Pastikan MongoDB connection string benar
- Check apakah PORT sudah di-set

### **Problem 3: MongoDB Connection Failed**

**Error:** `MongoDB Connection Error`

**Solusi:**
- Pastikan `MONGODB_URI` di environment variables sudah benar
- Pastikan Network Access di MongoDB Atlas sudah allow 0.0.0.0/0
- Check MongoDB Atlas cluster status

### **Problem 4: CORS Error**

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solusi:**
- Update CORS di `backend/server.js` untuk include frontend URL
- Atau set `FRONTEND_URL` di environment variables

### **Problem 5: 404 Not Found**

**Error:** Routes return 404

**Solusi:**
- Pastikan routes sudah benar di `backend/server.js`
- Check apakah API path sudah benar (harus `/api/...`)
- Test dengan `/health` endpoint dulu

---

## 📊 Monitoring

### **Railway:**
- Dashboard: https://railway.app/dashboard
- Logs: Klik service → **"Deployments"** → **"View Logs"**
- Metrics: Klik service → **"Metrics"** tab

### **Render:**
- Dashboard: https://dashboard.render.com/
- Logs: Klik service → **"Logs"** tab
- Metrics: Klik service → **"Metrics"** tab

---

## 🎉 Selesai!

Setelah deployment selesai, backend API sudah bisa diakses dari mana saja:

**✅ Backend API URL:** `https://your-app-name.up.railway.app`

**Endpoints yang tersedia:**
- `GET /health` - Health check
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `GET /api/insights/:userId` - Get insights
- `GET /api/activities/:userId` - Get activities

**Next Step:** Deploy frontend dan set `VITE_API_URL` ke backend URL!

---

## 📚 Resources

- [Railway Documentation](https://docs.railway.app/)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Connection](https://docs.atlas.mongodb.com/connect-to-cluster/)

