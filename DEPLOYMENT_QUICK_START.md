# ⚡ Quick Start Deployment (Paling Cepat)

Panduan cepat untuk deploy project secara gratis dalam 15 menit.

## 🎯 Setup Tercepat

### **1. MongoDB Atlas (5 menit)**
1. Daftar: https://www.mongodb.com/cloud/atlas/register
2. Buat cluster FREE (M0)
3. Network Access → Add IP → Allow from anywhere (0.0.0.0/0)
4. Database Access → Add user → Simpan username & password
5. Connect → Copy connection string
6. Update connection string: `mongodb+srv://username:password@cluster.mongodb.net/ai-learning-insight`

### **2. Deploy Backend ke Railway (5 menit)**
1. Daftar: https://railway.app/ (login dengan GitHub)
2. New Project → Deploy from GitHub → Pilih repo
3. Settings → Root Directory: `backend`
4. Variables → Tambahkan:
   ```
   MONGODB_URI=mongodb+srv://riciAsah:R283D5Y1703@cluster0.uxs6xws.mongodb.net/ai-learning-insight?appName=Cluster0
   JWT_SECRET=random-32-char-secret-key-change-this
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=production
   ```
5. Settings → Deploy → Start Command: `npm start`
6. Generate Domain → Copy URL (contoh: `https://your-app.railway.app`)
7. Test: `https://your-app.railway.app/health`

### **3. Deploy Frontend ke Vercel (5 menit)**
1. Daftar: https://vercel.com/ (login dengan GitHub)
2. Add New Project → Import repo
3. Framework: Vite
4. Root Directory: `frontend`
5. Environment Variables:
   ```
   VITE_API_URL=https://your-app.railway.app
   ```
6. Deploy → Copy URL (contoh: `https://your-app.vercel.app`)

### **4. Update CORS di Backend**
Update `backend/server.js` untuk allow frontend URL, atau set di Railway:
```
FRONTEND_URL=https://your-app.vercel.app
```

### **5. Import Users (Opsional)**
```bash
# Di local machine
cd backend
# Update .env dengan MongoDB Atlas connection string
npm run import:users
```

**✅ Selesai!** Project sudah online di:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-app.railway.app`

---

## 🔗 Link Penting

- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Railway:** https://railway.app/
- **Vercel:** https://vercel.com/

---

## 📝 Checklist Cepat

- [ ] MongoDB Atlas setup & dapat connection string
- [ ] Backend deployed di Railway dengan environment variables
- [ ] Frontend deployed di Vercel dengan VITE_API_URL
- [ ] CORS updated untuk allow frontend URL
- [ ] Test login dari frontend production
- [ ] Import users (jika perlu)

---

**Untuk panduan lengkap, lihat [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

