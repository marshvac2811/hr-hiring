# HR Hiring — Setup Guide

## What this replaces in your existing repo
Delete these old files from your `hr-hiring` repo root — they were placeholders:
- `index.html` (root)
- `index.js` (root)
- `api/index.js` (old Express stub)

Copy in everything from this build instead: `frontend/`, `api/`, `package.json`, `vercel.json`, `.gitignore`.

## 1. Connect your Prisma Postgres database
You already created a **Prisma Postgres** database on Vercel — that's fine, this app talks to it directly (no Prisma ORM needed).
1. In your Vercel project → **Storage** tab, confirm the database is **Connected** to `hr-hiring`.
2. This automatically sets a `DATABASE_URL` environment variable on your project — that's all the app needs. Nothing else to configure.

## 2. Local development (optional)
```powershell
npx vercel env pull .env.local
cd frontend
npm install
npm run dev
```
For full local API testing (so `/api/...` routes work too), run `vercel dev` from the project root instead of `npm run dev`.

## 3. Deploy
```powershell
git add .
git commit -m "Build full hiring app: jobs, applications, pipeline"
git push
```
Vercel redeploys automatically. Database tables (`jobs`, `candidates`) are created automatically on first API call — no manual migration needed.

## App structure
- **/** — public job listings
- **/jobs/:id** — job detail + application form (public)
- **/admin** — create/close jobs
- **/admin/jobs/:id** — pipeline board (Applied → Screening → Interview → Offer → Hired/Rejected)

⚠️ **Note:** `/admin` has no login/auth yet — anyone with the URL can post jobs and manage candidates. Say the word if you want basic password protection added before this goes further.
