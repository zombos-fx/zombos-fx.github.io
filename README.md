# Guru Guru Games — Landing Page

A fun, colorful single-page site for the Guru Guru Games studio. Plain HTML, CSS, and JS — no build step.

## Run it

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Add the logo

Drop your studio logo at:

```
assets/logo.png
```

The page already references it in the navbar, hero, favicon, and footer. (The page works without it — you'll just see a broken-image icon until the file is added.)

## Files

- `index.html` — page structure
- `styles.css` — colorful, fun theme pulled from the logo palette
- `script.js` — scroll reveals, animated counters, contact form validation, hero parallax
