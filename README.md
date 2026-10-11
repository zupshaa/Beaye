# B-day

Interactive birthday gift site (React + Vite), ready for GitHub Pages.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the build
```

## Where things go
| What | Where |
|---|---|
| Video, booklet link, T&C link | `src/data/siteConfig.js` |
| Local video file (.mp4/.webm) | `src/assets/videos/` |
| Images (keep original filenames) | `src/assets/images/` |
| Booklet cover (optional) | any image in `src/assets/images/` with "booklet" in the filename |
| Voucher text / agreement checkboxes | `src/data/vouchers.js` |
| Game data | `src/data/wordsearch.json`, `crossword.json`, `crackthecode.json`, `quiz.json` |
| Game points | `src/components/games/scoring.js` |
| Colors / fonts / layout | `src/index.css` (tokens at the top) |

## Deploy to GitHub Pages
1. Push this project to a GitHub repo (branch `main`).
2. Repo **Settings > Pages > Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml` and publishes the site.
