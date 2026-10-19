# Remote-Control-Car

Sophikart by SophiMotion: an interactive RC car design website.

## Run locally

From this folder, run:

```sh
python -m http.server 8980 --bind 127.0.0.1
```

Open http://127.0.0.1:8980/. Keep the server running while browsing. An HTTP server is required for the 3D models and part lists; opening index.html directly is insufficient.

## Included

- Original, Track, Formula, Rally and Retro GT CAD viewers.
- Body color previews, camera views, exploded animation and a bodywork visibility toggle.
- M3 panel joints, removable post clamps and separate headlight components.
- Per-car download folders containing STEP assemblies, named STL print parts, fit coupons and verification reports.
- An 18-page illustrated Retro GT assembly guidebook.
- SophiMotion branding and light/dark/system appearance.

The site uses plain HTML, CSS and JavaScript with a bundled model-viewer runtime. No build step or API credentials are required. Serve this folder unchanged on any compatible static host. This import does not configure GitHub Pages.

## CAD prototype status

The four redesigned assemblies preserve 127 original mechanical components and omit the unused external FPV antenna. The supplied original STEP remains unchanged. Track, Rally and Retro GT each contain 17 printed exterior parts; Formula contains 11. Each part's CAD envelope is below 230 mm. Static checks pass, but PLA tolerances, supports, fit, steering/suspension travel and load durability require physical testing before use.

Color choices change the browser preview. STEP downloads use each design's default finish.
