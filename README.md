# Taskmaster Scoreboard System

Two files: **scoreboard.html** (TV display) and **controller.html** (iPad score manager).

---

## File Structure

```
your-project/
├── scoreboard.html          ← TV display
├── controller.html          ← iPad controller
├── images/
│   └── contestants/
│       ├── alice_johnson.jpg
│       ├── bob_smith.jpg
│       ├── carol_white.jpg
│       └── ...              ← one photo per contestant
```

## Adding Contestant Photos

- Put photos in `images/contestants/`
- Name each file after the contestant: spaces → underscores, all lowercase
  - "Alice Johnson" → `alice_johnson.jpg`
  - "Bob Smith" → `bob_smith.jpg`
- Supported: `.jpg` (primary). Add `.png` fallback by editing `photoSrc()` in both files if needed.
- If a photo is missing, the contestant's initial letter is shown instead — no crash.

## Configuring Your Contestants

Edit the `contestants` array near the top of **both** files:

```js
let contestants = [
  { name: "Alice Johnson",  score: 0 },
  { name: "Bob Smith",      score: 0 },
  // ... add all 15–20 contestants here
];
```

The name must match exactly between both files (it's used as the key and to derive the photo filename).

---

## How the Scoring Works

### On your iPad (`controller.html`)

1. Open `controller.html` in Safari on your iPad.
2. At the top, enter the URL of `scoreboard.html` — either:
   - A local network address like `http://192.168.1.50/scoreboard.html` (if serving via a local server)
   - Or a GitHub Pages / Netlify URL if hosted online
3. Use **+** and **−** buttons to change scores. Pick a step size (1, 2, 3, 5, 10).
4. Press **SEND TO TV** — this opens the scoreboard URL with all scores encoded in it.
5. On the TV/Chromecast, navigate to that URL (or it opens in a new tab if on the same device).

### On your TV (`scoreboard.html`)

- **Top 5** are shown large with photos, rank medals (🥇🥈🥉), and animated score bars.
- **Positions 6+** are shown in a compact animated list below.
- When the page loads with a `?data=` URL parameter, it renders those scores automatically.
- Score changes trigger a brief gold flash animation on changed values.

---

## Deployment Options

### Option A: GitHub Pages (recommended — free, works from Chromecast)

1. Fork or clone this repo to your GitHub account.
2. Go to Settings → Pages → Deploy from main branch.
3. Your scoreboard will be at `https://yourusername.github.io/your-repo/scoreboard.html`
4. Put that URL in the controller's "Scoreboard URL" field.
5. Press "SEND TO TV" on the iPad → copy the URL → open it on the Chromecast browser.

### Option B: Local server (laptop plugged into TV via HDMI)

1. Run a local server from the project folder:
   ```bash
   python3 -m http.server 8080
   ```
2. On your iPad, set the scoreboard URL to `http://YOUR_LAPTOP_IP:8080/scoreboard.html`
3. Open `http://localhost:8080/scoreboard.html` on the laptop browser (displayed on TV).
4. Press "SEND TO TV" on the iPad — it opens the URL in a new tab on your iPad.
5. Copy that generated URL and navigate the TV browser to it (e.g. via a shared link, AirDrop, etc.)

### Option C: Same device / AirPlay

Load controller.html on your iPad, use "SEND TO TV" to copy the URL, then AirDrop the link to your Mac/Chromecast.

---

## Tips

- **Score step buttons** (1, 2, 3, 5, 10) let you add/subtract in bulk — useful for task scoring.
- **Scores persist** between sessions on the iPad via localStorage — you won't lose progress if you refresh.
- You can also **directly edit** a score by tapping the number field in the controller.
- The **Generated URL** section at the bottom always shows the current full URL — you can copy it at any time.
- The scoreboard works fully offline once loaded; no server required for the display itself.
