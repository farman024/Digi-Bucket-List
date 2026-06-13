# 🌍 Digi Bucket List — Pixel Travel PWA

> A retro 8-bit styled travel bucket list app. Save your dream destinations, add photos, track what you've visited — all in one beautiful pixel-art PWA.

**Live Demo:** [farman024.github.io/Bucket-List](https://farman024.github.io/Bucket-List)

---

## Why Digi Bucket List?

You save travel reels. You screenshot places. Then they get buried.

Digi Bucket List solves that — a dedicated space to collect every place you want to visit, with photos, notes, and status tracking. Built as a PWA so it lives on your home screen like a real app.

No subscriptions. No accounts. Just deploy it and it's yours forever.

---

## Two Modes — You Choose

### 💾 Local Mode (Zero Setup)
Works immediately out of the box. No accounts, no configuration. Data is saved to your browser's localStorage. Photos stored as base64 directly in the browser. Just open and use.

### ☁ Cloud Mode (Optional Upgrade)
Add your Supabase credentials to sync data across devices. Add Cloudinary credentials for cloud photo storage. The app auto-detects which mode to use — no code changes needed.

> ⚠️ localStorage has a ~5MB limit. If you upload many photos in local mode, you may hit the limit. Cloud mode has no such restriction.

---

## What You Get

- ✅ Complete single-file source code (`index.html`) — fully functional, zero dependencies
- ✅ Works out of the box — no setup required (local mode)
- ✅ Optional Supabase sync — cross-device cloud storage
- ✅ Optional Cloudinary integration — cloud photo storage
- ✅ Supabase database schema — copy-paste SQL, ready in 30 seconds
- ✅ PWA support — installable on Android & iOS, works offline
- ✅ Full CRUD — add, edit, delete, toggle status on every entry
- ✅ Dark & Light mode built in
- ✅ Lightbox image viewer on card tap
- ✅ Custom pixel SVG icons — no system emojis
- ✅ Setup guide included

---

## Features at a Glance

| Feature | Details |
|---|---|
| Add Places | Name, country, photo, notes per entry |
| Photo Upload | Gallery upload or image URL |
| Photo Storage | Base64 localStorage (local) or Cloudinary (cloud) |
| Status Toggle | Dreaming → Visited with one tap |
| Filters | View All / Dreaming / Visited |
| Lightbox | Tap card to view full photo |
| Dark/Light Mode | Sun/moon toggle |
| Data Storage | localStorage (default) or Supabase (optional) |
| PWA | Install to home screen, offline support |
| Aesthetic | Pixel/retro 8-bit — Press Start 2P + VT323 fonts |

---

## Who Is This For?

- **Developers** who want a ready-made PWA template to customize
- **Indie hackers** looking for a clean Supabase + Cloudinary starter
- **Travel enthusiasts** who want a personal app without paying for SaaS
- **Anyone** who wants a working app with zero setup and optional upgrades

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | Single-file HTML / CSS / JS |
| Database | localStorage (default) or Supabase (optional) |
| Image Storage | Base64 localStorage (default) or Cloudinary (optional) |
| Fonts | Press Start 2P + VT323 |
| Hosting | GitHub Pages (free) |
| PWA | Inline blob manifest + service worker |

No React. No build tools. No npm. Open the file, optionally add credentials, push to GitHub — done.

---

## Setup

### Option A — Local Mode (No Setup)
Just open `index.html` in a browser or deploy to GitHub Pages. It works immediately. Done.

---

### Option B — Cloud Mode (Optional)

**Step 1 — Supabase**

Create a free project at [supabase.com](https://supabase.com), then run this in the SQL editor:

```sql
CREATE TABLE bucket_list (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  country text,
  photo_url text,
  notes text,
  status text DEFAULT 'dreaming',
  created_at timestamp DEFAULT now()
);

ALTER TABLE bucket_list DISABLE ROW LEVEL SECURITY;
```

**Step 2 — Cloudinary (optional)**

Create a free account at [cloudinary.com](https://cloudinary.com). Go to Settings → Upload → Add an unsigned upload preset. Note your cloud name and preset name.

**Step 3 — Add Your Credentials**

Open `index.html` and find the config block near the top of the `<script>` tag:

```js
// OPTION A — Supabase (cross-device sync):
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY";

// OPTION B — Cloudinary (cloud photo storage):
const CLOUDINARY_CLOUD = "YOUR_CLOUDINARY_CLOUD_NAME";
const CLOUDINARY_PRESET = "YOUR_CLOUDINARY_UPLOAD_PRESET";
```

Replace the placeholder values with your own. Leave any you don't want as `"YOUR_..."` and that feature stays in local mode.

**Step 4 — Deploy**

Push `index.html` to a GitHub repo → enable GitHub Pages → visit your URL.

**Total setup time: under 10 minutes.**

---

## PWA Installation

**Android** — Open in Chrome or Brave → tap three-dot menu → *Add to Home Screen*

**iOS** — Open in Safari → tap Share → *Add to Home Screen*

---

## File Structure

```
your-repo/
├── index.html    ← entire app (styles + logic + PWA)
└── README.md
```

One file. That's it.

---

## License

Personal use and client projects — ✅ allowed
Reselling this source code as-is — ❌ not allowed
Customizing and selling as your own product — ✅ allowed

---

## Support

Having trouble setting up? Reach out via Gumroad messaging and I'll help you get it running.

---

Built by **Farman J · AI Generalist**
