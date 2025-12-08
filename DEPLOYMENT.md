# Panduan Deployment AI Learning Insight

Dokumen ini menjelaskan langkah-langkah untuk melakukan deployment aplikasi AI Learning Insight ke production environment.

## 📋 Daftar Isi

- [Persyaratan Sistem](#persyaratan-sistem)
- [Persiapan Environment Variables](#persiapan-environment-variables)
- [Deployment Backend](#deployment-backend)
- [Deployment Frontend](#deployment-frontend)
- [Deployment dengan Platform Cloud](#deployment-dengan-platform-cloud)
- [Verifikasi Deployment](#verifikasi-deployment)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Persyaratan Sistem

### Backend
- **Node.js**: v18.x atau lebih tinggi
- **MongoDB**: v6.0 atau lebih tinggi (MongoDB Atlas atau self-hosted)
- **Python**: v3.11 atau lebih tinggi (untuk ML models)
- **npm**: v9.x atau lebih tinggi

### Frontend
- **Node.js**: v18.x atau lebih tinggi
- **npm**: v9.x atau lebih tinggi

### Python Dependencies (untuk ML)
- numpy==1.24.3
- pandas==2.0.3
- scikit-learn==1.3.0
- joblib==1.3.2

---

## 🔐 Persiapan Environment Variables

### Backend Environment Variables

Buat file `.env` di folder `backend/` dengan konfigurasi berikut:

```env
# Server Configuration
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Frontend URL (untuk CORS)
FRONTEND_URL=https://your-frontend-domain.com
```

**Catatan Penting:**
- `JWT_SECRET`: Gunakan string acak yang kuat (minimal 32 karakter). Jangan gunakan nilai default! Generate dengan `npm run generate:jwt-secret`
- `MONGODB_URI`: Gunakan connection string dari MongoDB Atlas atau MongoDB instance Anda
- `FRONTEND_URL`: URL lengkap dari frontend yang sudah di-deploy (termasuk https://)
- `PORT`: Biasanya tidak perlu di-set manual di platform cloud (Render, Railway, Heroku akan set otomatis)

**Untuk Platform Cloud (Render, Railway, Heroku):**
- Environment variables di-set melalui dashboard/platform, bukan file `.env`
- Lihat bagian deployment masing-masing platform untuk detail setup Environment Variables

### Frontend Environment Variables

Buat file `.env` di folder `frontend/` dengan konfigurasi berikut:

```env
VITE_API_URL=https://your-backend-api.com
```

**Catatan:**
- Ganti `https://your-backend-api.com` dengan URL backend API yang sudah di-deploy
- Pastikan URL menggunakan `https://` untuk production

### 🔑 Generate JWT Secret yang Aman

**⚠️ PENTING:** JWT Secret adalah kunci keamanan kritis. Jangan pernah menggunakan nilai default `'your-secret-key-change-in-production'` di production!

#### Cara 1: Menggunakan Script Helper (Paling Mudah)

Gunakan script helper yang sudah disediakan:

```bash
# Menggunakan npm script (dari root project)
cd backend
npm run generate:jwt-secret

# Atau langsung dengan node
node backend/scripts/generate-jwt-secret.js

# Generate dengan custom length
node backend/scripts/generate-jwt-secret.js --length=128

# Generate dengan base64 format
node backend/scripts/generate-jwt-secret.js --format=base64

# Kombinasi custom length dan format
node backend/scripts/generate-jwt-secret.js --length=96 --format=base64
```

Script ini akan menampilkan:
- JWT secret yang sudah di-generate
- Panjang secret
- Format yang digunakan
- Reminder tentang security best practices

#### Cara 2: Generate dengan Node.js Command Line

Jalankan perintah berikut untuk generate JWT secret yang aman:

```bash
# Generate random secret (64 karakter)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Atau generate dengan base64 (lebih panjang)
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

**Contoh output:**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2
```

#### Cara 3: Generate dengan OpenSSL

```bash
# Generate dengan OpenSSL
openssl rand -hex 64

# Atau dengan base64
openssl rand -base64 64
```

#### Cara 4: Generate dengan Python

```bash
python3 -c "import secrets; print(secrets.token_hex(64))"
```

#### Cara 5: Menggunakan Online Generator (Kurang Disarankan)

Jika tidak memiliki akses ke command line, gunakan generator online yang terpercaya:
- https://generate-secret.vercel.app/64
- Pastikan untuk generate di environment yang aman dan tidak terhubung ke internet publik

#### Best Practices untuk JWT Secret:

1. **Panjang Minimum**: Gunakan minimal 32 karakter, disarankan 64 karakter atau lebih
2. **Random**: Gunakan cryptographically secure random generator
3. **Unik**: Setiap environment (development, staging, production) harus memiliki JWT secret yang berbeda
4. **Rahasia**: Jangan pernah commit JWT secret ke repository
5. **Rotasi**: Pertimbangkan untuk merotasi JWT secret secara berkala (setiap 6-12 bulan)
6. **Backup**: Simpan JWT secret di tempat yang aman (password manager, secrets management service)

#### Contoh Setup JWT Secret:

```bash
# 1. Generate secret
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")

# 2. Tambahkan ke .env file
echo "JWT_SECRET=$JWT_SECRET" >> backend/.env

# 3. Verify (jangan tampilkan di log!)
cat backend/.env | grep JWT_SECRET
```

#### ⚠️ Warning: Jika Mengubah JWT Secret yang Sudah Ada

Jika Anda mengubah JWT secret di production:
- **Semua token yang sudah ada akan menjadi invalid**
- **Semua user harus login ulang**
- **Pastikan untuk menginformasikan user sebelum melakukan perubahan**

Untuk menghindari gangguan, pertimbangkan:
1. Memberikan notifikasi ke user beberapa hari sebelumnya
2. Melakukan perubahan di maintenance window
3. Atau implementasikan token migration strategy

---

## 🚀 Deployment Backend

### Opsi 1: Deployment dengan VPS/Server

#### Langkah 1: Persiapan Server

```bash
# Update sistem
sudo apt update && sudo apt upgrade -y

# Install Node.js (jika belum terinstall)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Python 3.11
sudo apt install -y python3.11 python3.11-venv python3-pip

# Install MongoDB (jika menggunakan self-hosted)
# Atau gunakan MongoDB Atlas (recommended)
```

#### Langkah 2: Clone Repository

```bash
cd /var/www
git clone https://github.com/ganeshateam/ai-learning-insight.git
cd ai-learning-insight/backend
```

#### Langkah 3: Install Dependencies

```bash
# Install Node.js dependencies
npm install --production

# Setup Python virtual environment untuk ML
cd model_dev
python3.11 -m venv .venv
source .venv/bin/activate  # Linux/Mac
# atau .venv\Scripts\activate  # Windows

pip install -r requirements.txt
deactivate
cd ..
```

#### Langkah 4: Konfigurasi Environment

```bash
# Buat file .env
nano .env
# Paste konfigurasi environment variables yang sudah disiapkan
# Save dengan Ctrl+X, lalu Y, lalu Enter
```

#### Langkah 5: Setup Process Manager (PM2)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start aplikasi dengan PM2
pm2 start server.js --name "ai-learning-insight-api"

# Setup PM2 untuk auto-start pada boot
pm2 startup
pm2 save
```

#### Langkah 6: Setup Reverse Proxy (Nginx)

```bash
# Install Nginx
sudo apt install -y nginx

# Buat konfigurasi Nginx
sudo nano /etc/nginx/sites-available/ai-learning-insight-api
```

Isi file konfigurasi Nginx:

```nginx
server {
    listen 80;
    server_name your-api-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable konfigurasi
sudo ln -s /etc/nginx/sites-available/ai-learning-insight-api /etc/nginx/sites-enabled/

# Test konfigurasi Nginx
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### Langkah 7: Setup SSL dengan Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Setup SSL
sudo certbot --nginx -d your-api-domain.com

# Certbot akan otomatis renew SSL certificate
```

### Opsi 2: Deployment dengan Platform Cloud

#### Heroku

1. **Install Heroku CLI**
   ```bash
   # Download dan install dari https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login ke Heroku**
   ```bash
   heroku login
   ```

3. **Buat Heroku App**
   ```bash
   cd backend
   heroku create your-app-name-api
   ```

4. **Setup Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set JWT_EXPIRE=7d
   heroku config:set FRONTEND_URL=https://your-frontend-domain.com
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

**Catatan untuk Heroku:**
- Heroku tidak mendukung Python untuk ML models secara langsung
- Pertimbangkan menggunakan service terpisah untuk ML atau deploy ML sebagai microservice

#### Railway

1. **Login ke Railway**
   - Kunjungi https://railway.app
   - Login dengan GitHub

2. **Create New Project**
   - Klik "New Project"
   - Pilih "Deploy from GitHub repo"
   - Pilih repository Anda

3. **Setup Environment Variables**
   - Masuk ke Settings → Variables
   - Tambahkan semua environment variables yang diperlukan

4. **Configure Build Settings**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

5. **Deploy**
   - Railway akan otomatis deploy setiap kali ada push ke branch yang dipilih

#### Render

1. **Login ke Render**
   - Kunjungi https://render.com
   - Login dengan GitHub

2. **Create New Web Service**
   - Connect repository
   - Pilih branch dan root directory: `backend`

3. **Configure**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`

4. **Setup Environment Variables**
   - Masuk ke **Environment** tab di Render Dashboard
   - Tambahkan semua environment variables berikut:

   | Variable Name | Value | Required | Description |
   |--------------|-------|----------|-------------|
   | `NODE_ENV` | `production` | ✅ Yes | Environment mode |
   | `PORT` | `5000` | ⚠️ Optional | Port untuk server (Render akan set otomatis) |
   | `MONGODB_URI` | `mongodb+srv://...` | ✅ Yes | MongoDB connection string |
   | `JWT_SECRET` | `[generated-secret]` | ✅ Yes | JWT secret key (min 32 karakter) |
   | `JWT_EXPIRE` | `7d` | ⚠️ Optional | JWT expiration time (default: 7d) |
   | `FRONTEND_URL` | `https://your-frontend.com` | ✅ Yes | Frontend URL untuk CORS |

   **Cara menambahkan:**
   - Klik **Add Environment Variable**
   - Masukkan **Key** dan **Value**
   - Pastikan semua variable sudah ditambahkan sebelum deploy pertama kali

   **Contoh Environment Variables di Render:**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2
   JWT_EXPIRE=7d
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

   **Tips:**
   - Generate JWT_SECRET dengan: `npm run generate:jwt-secret` (dari folder backend)
   - Jangan gunakan nilai default untuk JWT_SECRET di production!
   - Render akan otomatis set PORT, jadi tidak perlu set manual
   - Pastikan FRONTEND_URL menggunakan HTTPS

5. **Deploy**
   - Render akan otomatis deploy setiap kali ada push ke branch yang dipilih
   - Check logs di Render Dashboard untuk melihat status deployment
   - Setelah deploy berhasil, URL akan tersedia di format: `https://your-service-name.onrender.com`

---

## 🎨 Deployment Frontend

### Opsi 1: Build dan Deploy Static Files

#### Langkah 1: Build Production

```bash
cd frontend
npm install
npm run build
```

Build akan menghasilkan folder `dist/` yang berisi static files siap deploy.

#### Langkah 2: Deploy ke VPS dengan Nginx

```bash
# Copy build files ke web server
sudo cp -r dist/* /var/www/html/ai-learning-insight/

# Atau gunakan rsync
rsync -avz dist/ user@your-server:/var/www/html/ai-learning-insight/
```

Setup Nginx untuk serve static files:

```nginx
server {
    listen 80;
    server_name your-frontend-domain.com;
    root /var/www/html/ai-learning-insight;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Setup SSL:
```bash
sudo certbot --nginx -d your-frontend-domain.com
```

### Opsi 2: Deploy ke Platform Cloud

#### Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

4. **Setup Environment Variables**
   - Masuk ke Vercel Dashboard
   - Project Settings → Environment Variables
   - Tambahkan `VITE_API_URL`

**Catatan:** Vercel akan otomatis detect Vite project dan melakukan build.

#### Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   cd frontend
   npm run build
   netlify deploy --prod --dir=dist
   ```

4. **Setup Environment Variables**
   - Masuk ke Netlify Dashboard
   - Site Settings → Environment Variables
   - Tambahkan `VITE_API_URL`

#### GitHub Pages

GitHub Pages adalah platform gratis untuk hosting static websites. Berikut langkah-langkah deploy:

1. **Persiapan Repository**
   - Pastikan repository sudah di-push ke GitHub
   - Repository name: `ai-learning-insight` (atau sesuai repository Anda)
   - Username/Organization: `ganeshateam` (atau sesuai GitHub Anda)

2. **Install gh-pages** (jika belum terinstall)
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

3. **Update vite.config.js**
   
   File `vite.config.js` sudah dikonfigurasi untuk mendukung GitHub Pages. Untuk deploy ke GitHub Pages:
   
   **Opsi A: Menggunakan Environment Variable (Recommended)**
   
   Buat file `frontend/.env.production`:
   ```env
   VITE_GITHUB_PAGES=true
   VITE_API_URL=https://your-backend-api.onrender.com
   ```
   
   File `vite.config.js` akan otomatis menggunakan base path `/ai-learning-insight/` saat `VITE_GITHUB_PAGES=true`.
   
   **Opsi B: Manual Update**
   
   Jika tidak menggunakan environment variable, ubah `base` di `frontend/vite.config.js`:
   
   ```javascript
   const base = '/ai-learning-insight/';  // Ganti dengan nama repository Anda
   ```
   
   **Catatan:** 
   - Jika repository di root user (bukan organization), format: `base: '/repository-name/'`
   - Jika repository di organization, format: `base: '/organization-name/repository-name/'`
   - Pastikan ada trailing slash `/` di akhir
   - Setelah deploy, kembalikan ke `'./'` untuk development lokal

4. **Update package.json**
   
   Tambahkan script deploy di `frontend/package.json`:
   
   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://ganeshateam.github.io/ai-learning-insight"
   }
   ```
   
   **Catatan:** Ganti `ganeshateam` dengan username/organization GitHub Anda

5. **Setup Environment Variables**
   
   GitHub Pages tidak mendukung environment variables secara langsung. Ada beberapa opsi:
   
   **Opsi A: Menggunakan GitHub Secrets (untuk GitHub Actions)**
   - Buat file `.github/workflows/deploy.yml` untuk CI/CD
   - Atau set environment variable saat build
   
   **Opsi B: Hardcode untuk GitHub Pages (tidak disarankan untuk production)**
   - Update `frontend/src/services/api.js` dengan URL backend langsung
   - Atau gunakan file konfigurasi yang di-build
   
   **Opsi C: Menggunakan Vite Build-time Variables (Recommended)**
   
   Buat file `frontend/.env.production`:
   ```env
   VITE_GITHUB_PAGES=true
   VITE_API_URL=https://your-backend-api.onrender.com
   ```
   
   Vite akan mengganti `import.meta.env.VITE_API_URL` saat build.
   
   **Catatan:** File `.env.production` tidak perlu di-commit ke repository (sudah di `.gitignore`)

6. **Enable GitHub Pages**
   
   - Masuk ke repository di GitHub
   - Klik **Settings** → **Pages**
   - Di bagian **Source**, pilih:
     - **Branch**: `gh-pages`
     - **Folder**: `/ (root)`
   - Klik **Save**

7. **Deploy**
   ```bash
   cd frontend
   npm run deploy
   ```
   
   Script ini akan:
   - Menjalankan `predeploy` (build project)
   - Deploy folder `dist/` ke branch `gh-pages`
   - GitHub Pages akan otomatis update

8. **Akses Website**
   
   Setelah deploy berhasil, website akan tersedia di:
   ```
   https://ganeshateam.github.io/ai-learning-insight
   ```
   
   **Catatan:** 
   - Deploy pertama kali mungkin membutuhkan waktu 1-2 menit
   - URL akan otomatis menggunakan HTTPS
   - Setiap kali push ke branch `gh-pages`, website akan otomatis update

**Opsi: Otomatisasi dengan GitHub Actions (Recommended)**

Untuk otomatisasi deploy setiap push ke branch `main`, buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
    paths:
      - 'frontend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci
      
      - name: Build
        working-directory: ./frontend
        env:
          VITE_GITHUB_PAGES: true
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
```

**Setup GitHub Secrets:**
- Masuk ke repository → **Settings** → **Secrets and variables** → **Actions**
- Klik **New repository secret**
- Tambahkan `VITE_API_URL` dengan value URL backend API Anda

Dengan setup ini, setiap push ke branch `main` akan otomatis build dan deploy ke GitHub Pages.

9. **Setup Custom Domain (Optional)**
   
   Jika ingin menggunakan custom domain:
   - Di GitHub Pages settings, masukkan custom domain
   - Tambahkan file `CNAME` di folder `public/` dengan isi domain Anda
   - Setup DNS records sesuai instruksi GitHub

**Troubleshooting GitHub Pages:**

- **404 Error**: Pastikan `base` di `vite.config.js` sesuai dengan repository name
- **Assets tidak load**: Check console browser, pastikan path assets benar
- **API calls gagal**: Pastikan `VITE_API_URL` sudah di-set dan backend CORS sudah dikonfigurasi untuk allow GitHub Pages domain
- **Build gagal**: Check GitHub Actions logs (jika menggunakan) atau build lokal dengan `npm run build`

**Catatan Penting:**
- GitHub Pages hanya untuk static files (frontend)
- Backend harus di-deploy terpisah (Render, Railway, Heroku, dll)
- Pastikan backend CORS sudah allow GitHub Pages domain
- Environment variables harus di-set saat build time (tidak bisa runtime)

---

## ✅ Verifikasi Deployment

### 1. Test Backend API

```bash
# Test health endpoint
curl https://your-api-domain.com/health

# Expected response:
# {
#   "status": "ok",
#   "timestamp": "...",
#   "mongodb": "connected"
# }

# Test root endpoint
curl https://your-api-domain.com/

# Expected response: API documentation
```

### 2. Test Frontend

1. Buka browser dan akses URL frontend
2. Test login functionality
3. Test dashboard dan insights
4. Check browser console untuk errors

### 3. Test ML Integration

```bash
# Test ML prediction (jika ada endpoint)
curl -X POST https://your-api-domain.com/api/insights/test-user-id/regenerate
```

### 4. Monitor Logs

**PM2 (jika menggunakan VPS):**
```bash
pm2 logs ai-learning-insight-api
pm2 monit
```

**Platform Cloud:**
- Gunakan dashboard monitoring dari platform yang digunakan
- Check logs untuk errors atau warnings

---

## 🔍 Troubleshooting

### Backend tidak bisa connect ke MongoDB

**Masalah:** Error "MongoDB Connection Error"

**Solusi:**
1. Pastikan `MONGODB_URI` benar dan accessible
2. Jika menggunakan MongoDB Atlas, pastikan IP whitelist sudah dikonfigurasi
3. Check network firewall rules
4. Test connection string dengan MongoDB Compass

### CORS Error

**Masalah:** Frontend tidak bisa akses API karena CORS

**Solusi:**
1. Pastikan `FRONTEND_URL` di backend `.env` sesuai dengan URL frontend
2. Check `allowedOrigins` di `server.js`
3. Pastikan frontend mengirim request dengan credentials jika diperlukan

### ML Model tidak berjalan

**Masalah:** Error saat generate insights

**Solusi:**
1. Pastikan Python 3.11+ terinstall
2. Pastikan semua dependencies Python terinstall
3. Check path ke model files (`predictor_model.pkl`, `clustering_model.pkl`)
4. Pastikan `python-shell` bisa execute Python scripts
5. Check file permissions untuk model files

### Build Frontend Error

**Masalah:** Error saat `npm run build`

**Solusi:**
1. Pastikan semua dependencies terinstall: `npm install`
2. Check untuk TypeScript/ESLint errors
3. Pastikan environment variables sudah diset dengan benar
4. Clear cache: `rm -rf node_modules package-lock.json && npm install`

### SSL Certificate Issues

**Masalah:** SSL tidak valid atau expired

**Solusi:**
1. Renew certificate dengan Certbot: `sudo certbot renew`
2. Setup auto-renewal di crontab:
   ```bash
   0 0 * * * certbot renew --quiet
   ```

### Port Already in Use

**Masalah:** Error "Port 5000 already in use"

**Solusi:**
```bash
# Check process yang menggunakan port
sudo lsof -i :5000

# Kill process atau ubah PORT di .env
```

---

## 📝 Checklist Deployment

### Pre-Deployment
- [ ] Environment variables sudah dikonfigurasi dengan benar
- [ ] MongoDB database sudah setup dan accessible
- [ ] JWT_SECRET sudah diganti dengan nilai yang aman
- [ ] Frontend URL sudah dikonfigurasi di backend CORS
- [ ] Python dependencies untuk ML sudah terinstall
- [ ] Model files (`*.pkl`) sudah ada di lokasi yang benar

### Backend Deployment
- [ ] Dependencies terinstall (`npm install`)
- [ ] Server bisa start tanpa error
- [ ] Database connection berhasil
- [ ] Health endpoint merespons dengan benar
- [ ] CORS sudah dikonfigurasi untuk production
- [ ] SSL certificate sudah terpasang (jika menggunakan custom domain)
- [ ] Process manager (PM2) sudah setup untuk auto-restart

### Frontend Deployment
- [ ] Build berhasil tanpa error (`npm run build`)
- [ ] Environment variable `VITE_API_URL` sudah diset
- [ ] Static files terdeploy dengan benar
- [ ] Routing (React Router) berfungsi dengan benar
- [ ] API calls dari frontend berhasil
- [ ] SSL certificate sudah terpasang

### Post-Deployment
- [ ] Health check endpoint accessible
- [ ] Login functionality berfungsi
- [ ] Dashboard bisa diakses dan menampilkan data
- [ ] ML insights bisa di-generate
- [ ] Error handling berfungsi dengan baik
- [ ] Logs tidak menunjukkan error yang critical

---

## 🔒 Security Best Practices

1. **Environment Variables**
   - Jangan commit `.env` files ke repository
   - Gunakan secrets management dari platform cloud
   - Rotate JWT_SECRET secara berkala

2. **Database**
   - Gunakan strong password untuk MongoDB
   - Enable MongoDB authentication
   - Whitelist IP addresses di MongoDB Atlas
   - Backup database secara berkala

3. **API Security**
   - Enable HTTPS untuk semua komunikasi
   - Implement rate limiting
   - Validate dan sanitize semua input
   - Use helmet.js untuk security headers

4. **Frontend Security**
   - Jangan expose sensitive data di frontend
   - Validate input di client-side dan server-side
   - Implement proper error handling

---

## 📚 Resources Tambahan

- [MongoDB Atlas Setup Guide](https://docs.atlas.mongodb.com/getting-started/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Netlify Deployment Guide](https://docs.netlify.com/)

---

## 🆘 Support

Jika mengalami masalah saat deployment, silakan:
1. Check logs untuk error messages
2. Review troubleshooting section di atas
3. Check GitHub Issues: https://github.com/ganeshateam/ai-learning-insight/issues
4. Hubungi tim development

---

**Last Updated:** 2024
**Version:** 1.0.0

