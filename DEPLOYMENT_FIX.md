# 🔧 Fix Network Error - Deployment Issue

## ❌ Masalah

Network error saat login meskipun sudah update `FRONTEND_URL` di backend.

## 🔍 Root Cause

1. **Frontend API URL belum di-set**: Frontend masih menggunakan default `http://localhost:5000`
2. **CORS Configuration**: Mungkin URL frontend tidak exact match
3. **Vercel Backend**: Vercel mungkin tidak ideal untuk Node.js backend (lebih cocok untuk serverless functions)

## ✅ Solusi

### 1. Update Frontend API URL

**Option A: Via Environment Variable di Vercel (Recommended)**

1. Masuk ke Vercel Dashboard → Project `asah-frontend`
2. Settings → Environment Variables
3. Tambahkan:
   ```
   VITE_API_URL = https://asah-backend.vercel.app
   ```
4. Redeploy frontend

**Option B: Hardcode di Code (Temporary)**

File `frontend/src/services/api.js` sudah di-update untuk menggunakan:
- Production: `https://asah-backend.vercel.app`
- Development: `http://localhost:5000`

### 2. Verify Backend CORS

Pastikan `FRONTEND_URL` di backend environment variables:
```
FRONTEND_URL=https://asah-frontend.vercel.app
```

**Catatan Penting:**
- ✅ Gunakan `https://` (bukan `http://`)
- ✅ Tidak ada trailing slash `/` di akhir
- ✅ Exact match dengan URL frontend

### 3. Test Backend CORS

Test apakah backend allow frontend:

```bash
curl -H "Origin: https://asah-frontend.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://asah-backend.vercel.app/api/auth/login
```

Expected: Response dengan `Access-Control-Allow-Origin` header

## 🔄 Langkah-langkah Fix

### Step 1: Update Frontend Environment Variable

1. Vercel Dashboard → `asah-frontend` project
2. Settings → Environment Variables
3. Add:
   - Key: `VITE_API_URL`
   - Value: `https://asah-backend.vercel.app`
4. Redeploy

### Step 2: Verify Backend Environment Variables

1. Vercel Dashboard → `asah-backend` project
2. Settings → Environment Variables
3. Verify:
   - `FRONTEND_URL=https://asah-frontend.vercel.app` (tanpa trailing slash)
   - `NODE_ENV=production`
   - `MONGODB_URI=...`
   - `JWT_SECRET=...`
4. Redeploy jika perlu

### Step 3: Test Connection

1. Buka browser: https://asah-frontend.vercel.app
2. Buka DevTools (F12) → Network tab
3. Coba login
4. Check request ke `https://asah-backend.vercel.app/api/auth/login`
5. Check response headers untuk CORS

## 🐛 Troubleshooting

### Error: Network Error / Connection Refused

**Kemungkinan:**
- Frontend masih menggunakan `localhost:5000`
- `VITE_API_URL` belum di-set di Vercel

**Solusi:**
- Set `VITE_API_URL` di Vercel environment variables
- Redeploy frontend

### Error: CORS Error

**Kemungkinan:**
- `FRONTEND_URL` di backend tidak exact match
- Ada trailing slash atau protocol salah

**Solusi:**
- Pastikan `FRONTEND_URL=https://asah-frontend.vercel.app` (exact, tanpa `/` di akhir)
- Redeploy backend

### Error: 404 Not Found

**Kemungkinan:**
- Backend route tidak tersedia
- Vercel serverless function issue

**Solusi:**
- Check backend logs di Vercel
- Verify backend accessible: https://asah-backend.vercel.app/health

## 📝 Checklist

- [ ] `VITE_API_URL` di-set di Vercel frontend project
- [ ] `FRONTEND_URL` di-set di Vercel backend project (exact match)
- [ ] Backend accessible: https://asah-backend.vercel.app/health
- [ ] Frontend accessible: https://asah-frontend.vercel.app
- [ ] Network tab menunjukkan request ke backend URL yang benar
- [ ] No CORS errors di console

## ⚠️ Catatan tentang Vercel untuk Backend

Vercel lebih optimal untuk:
- ✅ Frontend/Static sites
- ✅ Serverless functions

Untuk Node.js backend dengan Express, pertimbangkan:
- **Render** (recommended) - https://render.com
- **Railway** - https://railway.app
- **Heroku** - https://heroku.com

Jika tetap menggunakan Vercel untuk backend:
- Pastikan menggunakan Vercel Serverless Functions
- Atau gunakan `vercel.json` untuk konfigurasi khusus

---

**Current URLs:**
- Backend: https://asah-backend.vercel.app
- Frontend: https://asah-frontend.vercel.app

