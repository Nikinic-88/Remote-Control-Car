# Remote-Control-Car

Sophikart by SophiMotion: an interactive RC car design website.

Live website: https://nikinic-88.github.io/Remote-Control-Car/

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
- Individual STEP part ZIPs: one printable body per STEP, including separate shell sections, clamp halves and lamp pieces. These are also included under individual-step/ in each complete print kit. Import the files separately, arrange/drop them onto the build plate, and select supports before slicing.
- An 18-page illustrated Retro GT assembly guidebook.
- SophiMotion branding and light/dark/system appearance.

The site uses plain HTML, CSS and JavaScript with a bundled model-viewer runtime. No build step or API credentials are required. GitHub Pages publishes the repository root from main; future pushes update the website automatically. You can also serve this folder unchanged on another compatible static host.

## CAD prototype status

The four redesigned assemblies preserve 127 original mechanical components and omit the unused external FPV antenna. The supplied original STEP remains unchanged. Track, Rally and Retro GT each contain 17 printed exterior parts; Formula contains 11. Each part's CAD envelope is below 230 mm. Static checks pass, but PLA tolerances, supports, fit, steering/suspension travel and load durability require physical testing before use.

Color choices change the browser preview and carry across all car concepts. Captions describe the design independently of paint. Choose the filament color when printing the STEP parts.
