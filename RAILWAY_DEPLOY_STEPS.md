# 🚂 Step-by-Step: Deploy Backend ke Railway

Panduan langkah demi langkah untuk deploy backend API ke Railway.

## ✅ Prerequisites

- ✅ Database MongoDB Atlas sudah setup
- ✅ Users sudah di-import
- ✅ Project sudah di-push ke GitHub

## 📝 Langkah-langkah Detail

### **Step 1: Push ke GitHub (Jika Belum)**

```bash
# Di root project
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### **Step 2: Daftar Railway**

1. Buka: https://railway.app/
2. Klik **"Login"** atau **"Start a New Project"**
3. Pilih **"Login with GitHub"**
4. Authorize Railway untuk akses repositories

### **Step 3: Create New Project**

1. Setelah login, klik **"New Project"** (tombol besar di tengah)
2. Pilih **"Deploy from GitHub repo"**
3. Jika belum connect GitHub, klik **"Configure GitHub App"** dan authorize
4. Pilih repository: `ai-Learning-Insight` (atau nama repo Anda)
5. Railway akan otomatis detect dan mulai deploy

### **Step 4: Configure Service**

1. Klik pada service yang baru dibuat (biasanya nama repo)
2. Klik tab **"Settings"** (di bagian atas)
3. Scroll ke section **"Deploy"**
4. Set konfigurasi:
   - **Root Directory:** Ketik `backend`
   - **Build Command:** (biarkan kosong, atau `npm install`)
   - **Start Command:** Ketik `npm start`
5. Klik **"Save"** (jika ada tombol save)

### **Step 5: Setup Environment Variables**

1. Masih di halaman Settings, klik tab **"Variables"** (di bagian atas)
2. Klik **"New Variable"** (tombol di kanan atas)

   **Tambahkan variable pertama:**
   - **Name:** `MONGODB_URI`
   - **Value:** `mongodb+srv://riciAsah:R283D5Y1703@cluster0.uxs6xws.mongodb.net/ai-learning-insight?appName=Cluster0`
   - Klik **"Add"**

   **Tambahkan variable kedua:**
   - **Name:** `JWT_SECRET`
   - **Value:** `your-super-secret-jwt-key-min-32-characters-random-string-12345`
   - Klik **"Add"**

   **Tambahkan variable ketiga:**
   - **Name:** `JWT_EXPIRE`
   - **Value:** `7d`
   - Klik **"Add"**

   **Tambahkan variable keempat:**
   - **Name:** `PORT`
   - **Value:** `5000`
   - Klik **"Add"**

   **Tambahkan variable kelima:**
   - **Name:** `NODE_ENV`
   - **Value:** `production`
   - Klik **"Add"**

### **Step 6: Generate Domain**

1. Klik tab **"Settings"** lagi
2. Scroll ke section **"Networking"**
3. Klik **"Generate Domain"** (tombol)
4. Railway akan generate domain seperti: `ai-learning-insight-production.up.railway.app`
5. **Copy domain ini** - ini adalah URL backend API Anda!

### **Step 7: Tunggu Deployment**

1. Klik tab **"Deployments"** untuk melihat progress
2. Tunggu hingga status menjadi **"SUCCESS"** (biasanya 2-3 menit)
3. Jika ada error, klik deployment untuk melihat logs

### **Step 8: Test API**

**Test Health Endpoint:**
```
https://your-app-name.up.railway.app/health
```

Buka di browser atau gunakan curl:
```bash
curl https://your-app-name.up.railway.app/health
```

**Expected response:**
```json
{
  "status": "ok",
  "timestamp": "2024-12-20T...",
  "mongodb": "connected"
}
```

**Test Login Endpoint:**
```bash
curl -X POST https://your-app-name.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier": "5181638", "password": "password123"}'
```

**Expected response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {...},
    "token": "..."
  }
}
```

## ✅ Checklist

- [ ] Project sudah di-push ke GitHub
- [ ] Railway account sudah dibuat
- [ ] Project sudah dibuat di Railway
- [ ] Root Directory sudah di-set ke `backend`
- [ ] Start Command sudah di-set ke `npm start`
- [ ] Environment Variables sudah di-set (5 variables)
- [ ] Domain sudah di-generate
- [ ] Deployment berhasil (status SUCCESS)
- [ ] Health check endpoint berhasil
- [ ] Login endpoint berhasil

## 🔗 Next Steps

Setelah backend berhasil di-deploy:

1. **Deploy Frontend** (Vercel/Netlify)
2. **Update Frontend Environment Variable:**
   - `VITE_API_URL=https://your-app-name.up.railway.app`
3. **Test Full Integration:**
   - Login dari frontend production
   - Fetch data dari backend production

## 🆘 Troubleshooting

### **Deployment Failed**

**Check logs:**
1. Klik tab **"Deployments"**
2. Klik deployment yang failed
3. Scroll ke bawah untuk melihat error

**Common errors:**
- `npm install` failed → Check `package.json`
- `Cannot find module` → Pastikan dependencies sudah benar
- `Port already in use` → Pastikan PORT di-set di environment variables

### **API Returns 404**

**Check:**
- Pastikan routes sudah benar di `backend/server.js`
- Test dengan `/health` endpoint dulu
- Check apakah path sudah benar (`/api/...`)

### **MongoDB Connection Failed**

**Check:**
- Pastikan `MONGODB_URI` di environment variables sudah benar
- Pastikan Network Access di MongoDB Atlas sudah allow 0.0.0.0/0
- Check MongoDB Atlas cluster status

---

**✅ Backend API sudah siap digunakan!**

URL: `https://your-app-name.up.railway.app`

