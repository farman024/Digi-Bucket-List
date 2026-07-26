# Digi Bucket List — Promo Video (Remotion)

Landscape 1920×1080, 30fps, 17 seconds (510 frames). Pure visual + text, retro pixel/CRT aesthetic matching your app (red `#e94560` on dark `#0a0a0a`).

## Scenes
1. **Intro (0–3s)** — Glitchy "DIGI BUCKET LIST" title reveal
2. **Add Place (3–6.5s)** — Mock "Add New Place" form typing out a Kyoto entry
3. **Status Flip (6.5–10s)** — Cards showing DREAMING → VISITED transition
4. **Features (10–13.5s)** — 4-card grid: pin places, status toggle, photo memories, PWA
5. **CTA (13.5–17s)** — "Start your bucket list today" + Gumroad link + badges

## How to run

```bash
cd digi-bucket-list-video
npm install
npm run dev        # opens Remotion Studio preview at localhost:3000
```

## How to render the MP4

```bash
npm run render
```

Output lands in `out/digi-bucket-list.mp4`.

For a quick low-res preview render (faster):
```bash
npm run render:preview
```

## Customizing

- All colors/timing live in `src/DigiBucketList.tsx` (top of file: `RED`, `BG`, `WHITE`, etc.)
- Each scene is its own component (`SceneIntro`, `SceneAddPlace`, `SceneStatusFlip`, `SceneFeatures`, `SceneCTA`)
- Total duration set in `src/Root.tsx` (`durationInFrames={510}`) — change scene `Sequence` ranges + this value together if you adjust timing
- Gumroad link is hardcoded in `SceneCTA` — search for `farman24.gumroad.com`

## Notes
- First render will download Chrome Headless Shell (~200MB) — needs internet access on your machine, this is normal and a one-time thing.
- No external assets/fonts required — everything is drawn with CSS/SVG.
