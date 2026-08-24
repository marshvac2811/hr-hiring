# HR Hiring — Setup Guide

## New in this version
- Applicants now **upload their actual CV file** (PDF/Word) instead of pasting a link.
- Uploaded CVs are stored directly in **Vercel Blob storage**.
- Each CV is **auto-scored** against the job description (keyword-match ATS score, 0-100%).
- Any CV scoring **below 80%** is **automatically rejected** — recorded with the reason and stage it dropped at, same as manual rejections.
- Pipeline cards show a color-coded ATS score badge (green ≥80%, red <80%).
- New illustrations: interview scene on the application page, hiring-manager section in Admin.

## 1. One-time setup: create a Blob store (new — required for CV uploads)
1. In your Vercel project → **Storage** tab → **Create Database** → choose **Blob**.
2. Click **Connect Project** → select `hr-hiring`.
   This sets a `BLOB_READ_WRITE_TOKEN` environment variable automatically — nothing else to configure.

(Your existing Prisma Postgres connection stays as-is — this is a separate store just for the files themselves.)

## 2. Deploy
```powershell
git add .
git commit -m "Add CV upload, ATS auto-scoring, manager illustrations"
git push
npx vercel --prod
```

## How the ATS score works
It's a straightforward keyword-match: meaningful words are pulled from the job description, and the score is the percentage of those words also found in the candidate's CV text. It's a heuristic, not a "true" ATS engine — good enough to auto-filter obviously mismatched CVs, but you may want to review borderline scores manually.

## Notes
- Supported CV formats: **PDF** and **.docx** (plain text also accepted as a fallback).
- Max file size: 8MB.
- The 80% auto-reject threshold is currently fixed in `api/candidates/index.js` (`ATS_THRESHOLD` constant) — say the word if you'd like it configurable per job instead of fixed globally.
