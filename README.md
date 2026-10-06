# Second Fit · a retention plan for SNITCH

An unsolicited growth and retention proposal for SNITCH by Preetam Priyabrat.
Static site: plain HTML, CSS and JS. No build step.

## Files
- `index.html` the page
- `styles.css` design system (dark by default with a light-mode toggle, Snitch-style monochrome with small colour markers; Inter Tight + DM Sans + Caveat, self-hosted)
- `app.js` theme toggle, reveal animations, nav state, scenario toggle
- `fonts/` self-hosted fonts (Fontsource, SIL Open Font License)
- `img/` your photo and the Snitch logo
- `netlify.toml` Netlify config (publish root, cache headers)
- `scripts/localize-images.sh` optional: copies Snitch CDN images into `img/`

## Deploy: GitHub to Netlify
1. Create a new GitHub repo (for example `second-fit-snitch`).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Second Fit: retention plan for Snitch"
   git branch -M main
   git remote add origin https://github.com/<your-username>/second-fit-snitch.git
   git push -u origin main
   ```
3. Netlify: Add new site > Import an existing project > GitHub > pick the repo.
   Build command: leave empty. Publish directory: `.`
4. Optional: Site configuration > Change site name to `second-fit-snitch`.

## Images
Product and campaign images load directly from snitch.com's CDN. To host your own copies
(recommended before sharing widely), run `bash scripts/localize-images.sh` once, then commit.

## Note
Independent proposal. Not affiliated with or endorsed by SNITCH. Imagery belongs to SNITCH.
Receipt figures are illustrative hypotheses on stated assumptions.
