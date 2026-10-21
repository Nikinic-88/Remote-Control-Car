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

## Track STEP correction — 20 October 2026

The Track print kit now contains a cleaned `Track_Modular_Complete.step`. Unused original shell and antenna representation records were removed to avoid extra geometry appearing during STEP import. All 127 retained inner components and all 17 printable components preserve their geometry and positions. Export verification and import instructions are included in the ZIP. Open the complete assembly in a new Fusion document; use `individual-step/` for separate print bodies. CAD importer checks pass; confirmation in Fusion itself is still pending.

## Smooth rear and camera interaction — 20 October 2026

Track now has mounting-root ends trimmed flush with the rear deck and an intact spoiler blade. The rear deck retains post clearance and M3 screw access. A nominal short-leg hex-key envelope clears the shell and retained mechanics; physical tool access and PLA strength still require prototype checks. The viewer, preview images, complete kit, individual STEP ZIP and combined STEP ZIP share the revised geometry. All 127 original inner components remain unchanged.

Exploded-view progress no longer resets the camera each frame. Dragging, zooming and animation work independently; explicit camera presets and Reset still select the requested view.

## Rear cleanup across all four designs — 20 October 2026

Track, Formula, Rally and Retro GT now share the rear cleanup. Exposed deck mounting-root ends are flush. Formula and Rally blades are raised 1 mm with connected support extensions, preserving clearance above the original posts. Retro GT has a low swept ducktail at the rear fascia, behind the post and screw axes. Spoiler blades have no through-holes. Functional post clearances, M3 screw access, clamp bearing seats and structural Formula carrier ribs remain. All 127 original inner components preserve their geometry and positions.

The website models, CAD boards, complete print kits, separate single-body STEP ZIPs and combined 62-part ZIP contain matching revised rear parts. Complete assembly STEP files exclude leftover original shell records. Retro GT's 18-page illustrated guidebook is regenerated from the revised CAD. CAD checks include connected solids, part envelopes below 230 mm, static hardware and mechanical clearances, nominal hex-key access and STEP round trips. Native Fusion import and physical PLA fit, turning access and load tests remain pending.

## Front mount smoothing — 20 October 2026

Front mounting-rib ends are now trimmed flush with the styled shell surface or bearing-seat height on Track, Formula, Rally and Retro GT. Functional pads, post clearances, M3 bearing seats and screw axes remain, with nominal driver access checked. The adjacent separate-color lamp pieces and their mounts are retained. All 127 original inner components keep their geometry and positions. Front modules remain individual connected print bodies; the website models, STEP/STL kits, per-car STEP ZIPs, combined ZIP and Retro GT guidebook match the updated CAD. Physical fit, driver turning access and PLA strength still require a prototype test.

## Raize-inspired preview colors — 21 October 2026

The body-color selector uses turquoise (#149DA5), red (#C9252C) and warm yellow (#F2CC30), inspired by Toyota Raize's color range, alongside black, silver, white and grey. Klein blue stays exactly #002FA7. These are screen approximations, not Toyota paint-code matches. Selected colors carry across all five cars. CAD files, print kits and inner components are unchanged.

Reference: https://www.toyota.com.ph/news/toyota-raize-launch

## Integral body-colored windows — 21 October 2026

Track, Rally and Retro GT window surfaces are already fused into their shell modules. The browser-only dark glass overlays have been removed so the windows follow the selected body color. Existing molded window contours remain for optional black vinyl stickers. Formula retains its open cockpit; no enclosed glazing is added. There are no separate window inserts or extra window fasteners. The four STEP assemblies, individual-body STEP ZIPs and print kits have been refreshed with matching instructions and verification. Printable B-rep geometry and all 127 retained inner components are unchanged. Separate headlamp parts retain their specified colors.
