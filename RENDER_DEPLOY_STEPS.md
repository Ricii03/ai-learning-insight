# 🎨 Step-by-Step: Deploy Backend ke Render

Panduan lengkap deploy backend API ke Render (alternatif Railway).

## ✅ Prerequisites

- ✅ Database MongoDB Atlas sudah setup
- ✅ Users sudah di-import
- ✅ Project sudah di-push ke GitHub

## 📝 Langkah-langkah Detail

### **Step 1: Daftar Render**

1. Buka: https://render.com/
2. Klik **"Get Started for Free"** atau **"Sign Up"**
3. Pilih **"Sign up with GitHub"**
4. Authorize Render untuk akses GitHub repositories

### **Step 2: Buat Web Service**

1. Setelah login, klik **"New +"** (tombol di kanan atas)
2. Pilih **"Web Service"**
3. Jika belum connect GitHub, klik **"Connect GitHub"** dan authorize
4. Pilih repository: `ai-Learning-Insight`
5. Klik **"Connect"**

### **Step 3: Configure Service**

Isi form dengan konfigurasi berikut:

- **Name:** `ai-learning-insight-backend` (atau nama yang Anda inginkan)
- **Environment:** Pilih **"Node"**
- **Region:** Pilih **"Singapore"** (atau region terdekat)
- **Branch:** `main` atau `feature/frontend-backend-integration`
- **Root Directory:** Ketik `backend`
- **Build Command:** Ketik `npm install`
- **Start Command:** Ketik `npm start`

### **Step 4: Setup Environment Variables**

Scroll ke section **"Environment Variables"**:

Klik **"Add Environment Variable"** untuk setiap variable:

**Variable 1:**
- **Key:** `MONGODB_URI`
- **Value:** `mongodb+srv://riciAsah:R283D5Y1703@cluster0.uxs6xws.mongodb.net/ai-learning-insight?appName=Cluster0`
- Klik **"Save"**

**Variable 2:**
- **Key:** `JWT_SECRET`
- **Value:** `your-super-secret-jwt-key-min-32-characters-random-string`
- Klik **"Save"**

**Variable 3:**
- **Key:** `JWT_EXPIRE`
- **Value:** `7d`
- Klik **"Save"**

**Variable 4:**
- **Key:** `PORT`
- **Value:** `10000`
- Klik **"Save"`

**Variable 5:**
- **Key:** `NODE_ENV`
- **Value:** `production`
- Klik **"Save"**

**⚠️ Penting:** Render menggunakan port dari environment variable. Default adalah `10000`, tapi bisa diubah.

### **Step 5: Deploy**

1. Scroll ke bawah
2. Klik **"Create Web Service"** (tombol biru)
3. Render akan mulai build dan deploy
4. Tunggu hingga selesai (biasanya 3-5 menit)
5. URL akan otomatis di-generate: `https://ai-learning-insight-backend.onrender.com`

### **Step 6: Test API**

**Test Health Endpoint:**
```
https://ai-learning-insight-backend.onrender.com/health
```

Buka di browser atau gunakan curl:
```bash
curl https://ai-learning-insight-backend.onrender.com/health
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
curl -X POST https://ai-learning-insight-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier": "5181638", "password": "password123"}'
```

## ⚠️ Catatan Penting

### **Sleep Mode:**
- Render free tier akan **sleep** setelah 15 menit tidak aktif
- Saat sleep, request pertama akan butuh 30-60 detik untuk wake up
- Setelah wake up, aplikasi akan berjalan normal

### **Port Configuration:**
- Render menggunakan port dari environment variable `PORT`
- Default: `10000`
- Pastikan `backend/server.js` menggunakan `process.env.PORT || 5000`

### **Auto-Deploy:**
- Render akan auto-deploy setiap kali push ke branch yang di-set
- Bisa di-disable di Settings → Auto-Deploy

## ✅ Checklist

- [ ] Render account sudah dibuat
- [ ] Web Service sudah dibuat
- [ ] Root Directory sudah di-set ke `backend`
- [ ] Start Command sudah di-set ke `npm start`
- [ ] Environment Variables sudah di-set (5 variables)
- [ ] PORT sudah di-set ke `10000`
- [ ] Deployment berhasil
- [ ] Health check endpoint berhasil
- [ ] Login endpoint berhasil

## 🔗 Next Steps

Setelah backend berhasil di-deploy:

1. **Deploy Frontend** (Vercel/Netlify)
2. **Update Frontend Environment Variable:**
   - `VITE_API_URL=https://ai-learning-insight-backend.onrender.com`
3. **Test Full Integration**

## 🆘 Troubleshooting

### **Deployment Failed**

**Check logs:**
1. Klik service di dashboard
2. Klik tab **"Logs"**
3. Scroll untuk melihat error

**Common errors:**
- `npm install` failed → Check `package.json`
- `Cannot find module` → Pastikan dependencies sudah benar
- `Port already in use` → Pastikan PORT di-set di environment variables

### **Application Crashed**

**Check:**
- Logs di Render dashboard
- Pastikan environment variables sudah benar
- Pastikan MongoDB connection string benar

### **Sleep Mode Issue**

**Jika aplikasi sleep:**
- Request pertama akan butuh waktu untuk wake up
- Ini normal untuk free tier
- Consider upgrade ke paid plan untuk menghilangkan sleep mode

---

**✅ Backend API sudah siap digunakan!**

URL: `https://ai-learning-insight-backend.onrender.com`

**Untuk alternatif platform lain, lihat [ALTERNATIVE_DEPLOYMENT_PLATFORMS.md](./ALTERNATIVE_DEPLOYMENT_PLATFORMS.md)**

