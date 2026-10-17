# Digi Bucket List — Pixel Travel PWA

A retro 8-bit styled app for collecting places to visit and things to get, with photos, notes, and status tracking.

**Live app:** [farman024.github.io/Digi-Bucket-List](https://farman024.github.io/Digi-Bucket-List/)

## Choose a storage mode

**Local mode** stores entries in this browser's local storage. It needs no account, stays on this device, and does not sync with the cloud. Use **USE LOCAL MODE** in the app. Local and cloud lists remain separate; switching modes does not copy or merge data.

**Cloud mode** uses Supabase Auth with Google sign-in. Each signed-in account can read and change only rows owned by that account, enforced by Supabase Row Level Security (RLS). Use **USE CLOUD MODE** and sign in with Google to open your private cloud list.

Cloud access is optional. Signing out or switching to local mode does not erase either list.

## Photos

Local-mode uploads are stored as resized image data in the browser. Cloud-mode uploads use the existing Cloudinary upload preset. The database row is protected by RLS, but Cloudinary image delivery is separate: anyone who obtains a direct image URL may be able to view that image. Do not treat a Cloudinary URL as private storage.

## Features

- Places and things lists with dreaming, visited, and acquired statuses
- Add, edit, delete, filter, and view photos
- Local browser storage or owner-scoped Supabase cloud storage
- Google sign-in for cloud mode
- Dark/light theme and installable PWA support
- Single-file HTML app with no build step

## For forks or self-hosting

The app configuration is in `index.html`. To run without this deployment's cloud backend, leave the Supabase URL and public anon/publishable key at their `YOUR_...` placeholders. To connect your own Supabase project, configure Google in Supabase Auth and apply an owner-scoped `bucket_list` schema and RLS policies before enabling cloud mode. Never put a Supabase service-role key or Google client secret in frontend code.

Optional Cloudinary settings are separate from Supabase list privacy. The existing upload preset is unsigned; configure your own Cloudinary account if you fork the project.

## Tech stack

- Single-file HTML, CSS, and JavaScript
- Supabase Auth and PostgREST for cloud mode
- Browser `localStorage` for local mode
- Cloudinary for optional cloud photo uploads
- GitHub Pages hosting

## PWA installation

On Android, open the app in Chrome and choose **Add to Home Screen**. On iOS, open it in Safari, tap **Share**, then choose **Add to Home Screen**.

## License

Personal use and client projects are allowed. Reselling the source code as-is is not allowed. Customized versions may be sold as your own work.
