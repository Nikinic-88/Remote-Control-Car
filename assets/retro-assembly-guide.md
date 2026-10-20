# Sophikart Retro GT - modular PLA assembly

Revision: removable lamps / continuous rear aero / unused antenna omitted. Fit-test prototype, mm.

## What changes, what stays

The new exterior has 17 individually named, connected printed parts. The 127 retained original mechanical components keep identical geometry and assembly positions. The unused original ProSight antenna is omitted by design; no other original hardware is changed. The supplied original STEP remains available separately and unchanged.

Rear wings/spoilers now have a continuous center span, with clearance for the existing rear posts. Former antenna-only shell openings are restored. Original outer wing span and pitch are retained; no aerodynamic-performance improvement is asserted.

Retro GT rear revision: Low swept ducktail moved to the rear fascia behind the unchanged posts and service axes; no through-holes. Exposed mount ends trimmed; structural carrier ribs, clamp seats and original posts retained. Reach the rear M3 service screws with a short-leg 2.5 mm L hex key; prove fit and turning space on the physical prototype. A nominal tool envelope is checked in CAD; prove actual key reach and turning space on the PLA prototype.

Front mount revision: exposed rib ends are trimmed flush with the shell surface or bearing-seat height. The post pads, M3 bearing seats, screw axes and separate lamp interfaces keep their fit. The nominal driver path above each front service screw is clear; verify actual driver reach and PLA strength on the prototype.


## Print parts

| Part | X x Y x Z envelope, mm | Role |
|---|---|---|
| Retro_Rear_Module | 130.0 x 200.9 x 98.7 | shell |
| Retro_Middle_Module | 123.5 x 200.0 x 104.8 | shell |
| Retro_Front_Module | 127.1 x 200.4 x 75.6 | shell |
| Retro_Clamp_1_Outer | 11.7 x 28.0 x 10.0 | clamp |
| Retro_Clamp_1_Inner | 11.7 x 28.0 x 10.0 | clamp |
| Retro_Clamp_2_Outer | 11.7 x 28.0 x 10.0 | clamp |
| Retro_Clamp_2_Inner | 11.7 x 28.0 x 10.0 | clamp |
| Retro_Clamp_3_Outer | 11.7 x 28.0 x 10.0 | clamp |
| Retro_Clamp_3_Inner | 11.7 x 28.0 x 10.0 | clamp |
| Retro_Clamp_4_Outer | 11.7 x 28.0 x 10.0 | clamp |
| Retro_Clamp_4_Inner | 11.7 x 28.0 x 10.0 | clamp |
| Retro_Headlamp_Housing_L | 42.2 x 28.6 x 36.2 | lamp housing |
| Retro_Headlamp_Lens_L | 12.5 x 24.0 x 30.0 | lamp lens |
| Retro_Headlamp_Keeper_L | 3.0 x 24.0 x 8.0 | lamp keeper |
| Retro_Headlamp_Housing_R | 42.2 x 28.6 x 36.2 | lamp housing |
| Retro_Headlamp_Lens_R | 12.5 x 24.0 x 30.0 | lamp lens |
| Retro_Headlamp_Keeper_R | 3.0 x 24.0 x 8.0 | lamp keeper |

Each of the three dimensions is below 230 mm, within the standard A1 nominal 256 mm cube. This is a CAD envelope check, not a sliced-plate validation. Arrange and Drop to bed in Bambu Studio; assembly-coordinate STLs can sit away from the plate origin. Account for support trees, brims and clearance from the plate edge. The existing styling skin has a nominal 2.2 mm inset; minimum local wall thickness is not certified. Inspect thin sections in the slicer.

Start shell modules upright and support roofs, wing undersides, flanges, seats and ribs. Choose a practical orientation for the collar halves and lamp parts so nut pockets and mating faces print cleanly. Production orientation, infill, walls, temperatures and support settings must be established with the customer's actual PLA and printer. Print the fit samples and one lamp cartridge before committing to all shells.

## Purchased hardware per car

| Hardware | Quantity | Purpose |
|---|---:|---|
| M3 x 12 socket-head screw | 12 | 4 panel joints + 8 lamp fixings |
| M3 x 25 socket-head screw | 8 | Two per post clamp |
| M3 x 16 socket-head screw | 4 | Shell service fixings |
| M3 hex nut, 5.5 mm AF / about 2.4 mm thick | 24 | Captive pockets |
| M3 washer, about 7 mm OD / 0.5 mm thick | 16 | Main panel / clamp / service screws |
| M3 washer, about 7 mm OD / 0.8 mm thick | 8 | Lamp fixings |

Screw lengths are below the head. Measure actual nuts, heads and washers; carry an adjacent length assortment for fitting. STEP hardware references have simplified unthreaded shafts and are not print parts. No tightening torque is validated for the PLA parts.

## First print: fit samples

The kit includes paired collar samples at 6.0, 6.2 and 6.4 mm bores, and pin/socket samples at 0.2, 0.3 and 0.4 mm diametral clearance. The current production CAD starts at 6.2 mm post bore and 0.3 mm alignment clearance. Confirm nut insertion, post grip, pin fit and driver access. Do not force an undersized collar onto the original post. Adjust the STEP before a full print if another coupon fit is better.

## Separate-color removable headlights

Print the two housings and two keepers in black; print the two inserts in white. The white visible lamp geometry has a hidden flange. A black keeper captures that flange with two M3 x 12 screws per lamp. The complete black cartridge attaches to the shell receiver with another two M3 x 12 screws. The lamps are cosmetic printed parts; lighting electronics have not been added.

1. Print both housings and keepers in black and both lenses in white. Original visible light surfaces remain on the white parts.
2. Seat two M3 nuts in the rear pockets of each black lens seat. Place the white flange against the seat, fit the black keeper, and secure with two M3 x 12 screws and washers from the front.
3. Seat two M3 nuts in each cartridge plate. Attach each cartridge to the body receiver using two M3 x 12 screws and washers from the rear.
4. For lens service, remove the cartridge first, remove keeper screws and keeper, and lift the white lens out of its open seat. No glue or snap-fit is required.

The lamp hardware uses 0.8 mm washers, 3.4 mm clearance holes and 5.8 mm across-flats x 2.6 mm nut pockets. Nominal mating clearances are 0.3 mm. Assemble and dry-fit one cartridge first. Check head/driver access before closing the shell. To change a white insert, remove its cartridge from the car and then remove its keeper. No adhesive is required.


## Join the main panels

Insert captive nuts while the underside is accessible. Locate the alignment pins, fit one M3 x 12 screw and washer per return-flange joint and tighten progressively. There are 4 seam screws. Each opposed flange is 4 mm thick, with a 0.3 mm assembly gap; the nominal stack is 8.3 mm plus the 0.5 mm washer. A 4 mm pin locates in a 4.3 mm socket. Screw-head and washer corridors have been relieved. Check the physical driver reach and seam alignment before tightening.

Track, Rally and Retro GT join rear to middle, then front to middle. Formula joins the nose/front wing to the middle cover and sidepods; its rear carrier remains a separate post-mounted module.

## Mount the shell on unchanged posts

1. Insert the three nuts in each outer collar half: two in the transverse pockets and one in the underside service pocket.
2. Place the two rigid halves around each original 6 mm post. Collars occupy normalized Z=25 to 35 mm, 1.2 mm above the original bumper fixing plate. Front post X=159, rear X about -159; Y=+/-32.75 mm.
3. Fit two M3 x 25 screws with 0.5 mm washers per collar. Tighten alternately only until the collar stops slipping. The nominal split gap is 0.6 mm; do not crush the PLA to close it.
4. Lower the assembled shell onto its four seats. Each seat has 0.3 mm clearance above its collar. Fit the four vertical M3 x 16 screws and 0.5 mm washers through the 8.4 mm access openings. The seat/collar stack is nominally 14.3 mm plus washer.
5. Formula: install the rear carrier on the rear pair separately. Check its long ribs for flex and vibration before driving.

## Service removal

Remove the four vertical service screws and lift away the joined shell (and Formula rear carrier separately). Leave the collars on the posts. Undo panel screws only to split the shell for replacement or transport. Removable lamp cartridges can be detached without destroying the housing or white insert.

## Checks before driving

Check full left/right steering, full suspension compression/droop, tire clearance, camera, wires, screw tips and tool access. Hand-test seams and collars, then perform a slow trial and inspect for cracks, loose fasteners and slipping. These physical tests are not replaced by the static CAD checks.

M3 is a reasonable prototype size for these small shells. PLA flange roots, nut-pocket walls, long ribs and collar friction may limit strength before the steel screws. No crash load, retention force, tightening torque, hot-car performance or fatigue life is rated. Keep PLA away from high heat and recheck hardware after running.
