# Portfolio Website - Deployment Guide

## 📋 Overview
This guide provides step-by-step instructions for deploying your portfolio website to GitHub and hosting it on Vercel.

---

## ✅ Completed Steps

### 1. Git Repository Initialized
Your project is now a Git repository with all files committed.

**What was done:**
```bash
git init
git branch -m main
git add .
git commit -m "Initial commit: Portfolio website with React, TypeScript, and Three.js"
```

---

## 🚀 Next Steps: Push to GitHub

### Option 1: Using GitHub Web Interface (Easiest)

1. **Go to GitHub and create a new repository:**
   - Visit: https://github.com/new
   - Repository name: `portfolio` (or any name you prefer)
   - Description: "My personal portfolio website built with React, TypeScript, and Three.js"
   - **Important:** Do NOT initialize with README, .gitignore, or license (your project already has these)
   - Click "Create repository"

2. **Push your code to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your actual GitHub username.

### Option 2: Using GitHub CLI (If installed)

```bash
# Install GitHub CLI first (if not installed)
brew install gh  # macOS
# or
# Download from: https://cli.github.com/

# Login to GitHub
gh auth login

# Create repository and push
gh repo create portfolio --public --source=. --remote=origin --push
```

---

## 🌐 Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel:**
   - Visit: https://vercel.com
   - Sign up or log in (can use GitHub account)

2. **Import your GitHub repository:**
   - Click "Add New..." → "Project"
   - Import your `portfolio` repository from GitHub
   - Vercel will auto-detect the Vite configuration

3. **Configure project settings:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (usually 2-3 minutes)
   - Get your live URL: `https://portfolio-username.vercel.app`

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

---

## 📦 Build Information

### Project Built Successfully
- **Build Tool:** Vite 5.4.21
- **Build Time:** ~3 minutes 16 seconds
- **Total Modules:** 1443 transformed
- **Output Directory:** `dist/`

### Bundle Sizes:
- **Total CSS:** ~33 KB
- **Total JS:** ~1.1 MB (uncompressed), ~327 KB (gzipped)
- **Three.js vendor:** 807 KB (main 3D library)
- **React vendor:** 134 KB
- **Animation vendor:** 70 KB (GSAP)

---

## 🔧 Project Configuration

### Already Configured Files:
- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `.gitignore` - Git ignore rules
- ✅ `package.json` - Dependencies and scripts
- ✅ TypeScript config
- ✅ Vite config

### Environment:
- **Node.js:** Required (v18+ recommended)
- **Package Manager:** npm
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite

---

## 📝 Custom Domain (Optional)

### To add a custom domain on Vercel:

1. **Buy a domain** from:
   - Namecheap (https://www.namecheap.com)
   - GoDaddy (https://www.godaddy.com)
   - Google Domains (https://domains.google)
   - Cloudflare (https://www.cloudflare.com)

2. **Add domain in Vercel:**
   - Go to your project in Vercel dashboard
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions
   - Vercel provides automatic HTTPS/SSL

---

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel automatically:
- ✅ Deploys on every push to `main` branch
- ✅ Creates preview deployments for pull requests
- ✅ Provides deployment status in GitHub
- ✅ Rolls back if deployment fails

### To trigger a new deployment:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

---

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

---

## 📊 Your Portfolio Tech Stack

- **Frontend:** React 18 + TypeScript
- **3D Graphics:** Three.js + React Three Fiber
- **Animations:** GSAP + Lenis (smooth scroll)
- **Styling:** Sass/SCSS modules
- **Build Tool:** Vite
- **Deployment:** Vercel
- **Version Control:** Git + GitHub

---

## 🎯 Quick Reference

### Your Local URLs:
- Development: `http://localhost:5173`
- Preview: `http://localhost:4173`

### After GitHub Push:
- Repository: `https://github.com/YOUR_USERNAME/portfolio`

### After Vercel Deployment:
- Production: `https://portfolio-username.vercel.app`
- Dashboard: `https://vercel.com/YOUR_USERNAME/portfolio`

---

## ⚠️ Troubleshooting

### Build Errors:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Git Issues:
```bash
# Check repository status
git status

# View commit history
git log --oneline

# Check remote
git remote -v
```

### Vercel Deployment Issues:
- Ensure all dependencies are in `package.json`, not just `devDependencies`
- Check build logs in Vercel dashboard
- Verify `dist` folder is being generated locally with `npm run build`

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev
- **GitHub Docs:** https://docs.github.com
- **React Docs:** https://react.dev

---

## ✨ Summary

**What's Ready:**
- ✅ Git repository initialized and committed
- ✅ Project built successfully
- ✅ Vercel configuration in place
- ✅ Ready to push to GitHub
- ✅ Ready to deploy to Vercel

**Next Action:**
1. Create GitHub repository at https://github.com/new
2. Push your code using the commands above
3. Deploy to Vercel via dashboard or CLI

---

**Created:** February 10, 2026
**Project:** Personal Portfolio Website
**Status:** Ready for Deployment 🚀
