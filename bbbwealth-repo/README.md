# BBBwealth Website

Static single-page website for BBBwealth — financial planning, wealth management, and HRD-claimable corporate training.

## Structure
- `index.html` — the entire site (self-contained, images inlined as base64)
- `assets/` — original source images (logo, team photos) for future editing
- `netlify.toml` — Netlify deploy configuration

## Deploy
Hosted as a static site. Any push to `main` auto-deploys via Netlify.

## Editing
Open `index.html` in any editor. To swap a photo, replace the matching file in `assets/`,
then re-inline it (or just edit the `<img src>` to point at the assets file).
