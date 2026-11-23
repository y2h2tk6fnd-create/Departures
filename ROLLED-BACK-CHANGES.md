# Changes undone by the rollback of 19 November 2026

On 19 November the app was rolled back to version `ca9e0a9` (16 November, afternoon): the stop lists
fold away with **"N earlier stops · from …" / "N more stops · to …"** rows around each train, and a
change of trains is shown as a **"Change at Genève to platform 4 · 11 min to change"** box.

The exact version from before the rollback is commit **`521312f`** (still in the history: the rollback
was added as a new version, nothing was deleted). Any change below can be brought back on its own; its commit is given so it can be
re-applied as it was.

Changes are grouped by what they do, oldest first within each group.

## 1. "All stations" button (replaced the fold rows)

**23 Nov:** replaced by the new **All stops** switch in the card's top-right corner (unfolds every train's whole line, marks the train's position anywhere on it, greys stops outside your part at the same size, and stays visible while on). The rows below are kept for reference.

| Commit | Change |
|---|---|
| `19c8922` | The "N earlier stops" and "N more stops" rows were removed and replaced by one small **All stations** toggle in the top-right corner of the line card. It unfolded the hidden stops of every train on the page at once (both trains on a trip with a change). While folded, if the train hadn't reached your part of the line yet, a row with the red marker above your first stop said where it was ("Train · 3 stops before Lancy-Pont-Rouge · between Chêne-Bourg and Genève-Eaux-Vives"). |
| `a88151f` | The button only appeared when some stops were actually folded away, showed how many ("All stations · 6"), and read **My stops** once unfolded. |
| `c3543f4` | With All stations unfolded, stops outside your part of the journey (before you board, after you get off) were greyed out, smaller and on a thin plain line, so your own stops and the change stood out. |
| `521312f` | The button stayed visible once it had appeared on a train's page (the periodic refresh could briefly hide it). |

## 2. Layout and wording of the train page

| Commit | Change |
|---|---|
| `051a7af` | ~~Removed the notes under stop lists: "Dotted line / Green line: …", "Times include delays; the red tag shows how late." and "Live times for the whole line aren't available…". Only the notes about a missing key, earlier stops not being published, or the list still loading were kept.~~ **Re-applied on 23 Nov.** |
| `de74ca1` | ~~Clearer journey heading: the duration large ("52 min"), with "06:56 → 07:45 · 1 change at Genève" underneath (times include delays). Single-train lines got "Stops" with "Genève → Coppet · 26 min". Replaced the small grey "JOURNEY · 52 MIN · 1 CHANGE AT GENÈVE".~~ **Re-applied on 23 Nov.** |
| `32d7892` | ~~More space and a thin divider line between that heading and the stops.~~ **Re-applied on 23 Nov.** |
| `1a89d35` | ~~Removed "· train 1808" from next to the operator on the countdown card (the number stays in Details).~~ **Re-applied on 23 Nov.** |
| `6ee7a27` | ~~Removed the "Your trip:" label on the countdown card, so it reads "Lausanne → Lancy-Pont-Rouge".~~ **Re-applied on 23 Nov.** |

## 3. Delays and departures

| Commit | Change |
|---|---|
| `83d4969` | ~~**Bug fix.** A delayed train kept getting updates after its planned time (the board fetched from 20 minutes ago, since the timetable lists departures by planned time) and only showed as "Departed" once it had really left. Before, a train whose delay grew after its planned time could show "Departed" while still waiting at the platform.~~ **Re-applied on 23 Nov.** |
| `3ff8b41` | ~~The countdown ran to the **planned** departure (a delay was shown as a tag but not added). Once the planned time had passed, a late train showed **Delayed +3′** with a countdown to its estimated departure; "Departed" only after that.~~ **Re-applied on 23 Nov.** |

## 4. Trips with a change (correct trains and times)

| Commit | Change |
|---|---|
| `a876b92` | ~~**Bug fix.** The trip search sometimes gives the wrong train number (e.g. the morning run of the same line), which made the stops, times and position of a leg wrong (hours off). Each leg's train was looked up on the board of its boarding station by planned time and line, and a full route was only used if it passed your boarding station at your departure time. Live updates for each leg used the same matching.~~ **Re-applied on 23 Nov.** |
| `2649e97` | ~~On a tracked trip with a change, the countdown card showed the train you're on or changing to (badge, destination, colour stripe, photo) instead of always the first train.~~ **Re-applied on 23 Nov.** |
| `404b9ef` | ~~**Bug fix.** Saved trips were checked against the boarding stations' boards right after saving and at startup, not only when their page was opened (so a trip saved by tapping START immediately, or never reopened, was still corrected).~~ **Re-applied on 23 Nov.** |
| `d7ae428` | ~~**Bug fix.** The trip stages used the freshest times (the live stop list, then each leg's updated times) and kept the trip-level and leg-level times in step, so a late train counted as still travelling until its delayed arrival. Before, the change countdown could start while the first train was still a minute out.~~ **Re-applied on 23 Nov.** |

## Status

As of 23 November every change in this list has been re-applied or replaced (the All stations button by the All stops switch).

## Worth bringing back first (done)

The four changes marked **Bug fix** (`83d4969`, `a876b92`, `404b9ef`, `d7ae428`) correct wrong information
rather than change the look, and are independent of the All stations button. Without them:
delayed trains can show as departed too early, trips with a change can show another train's stops and
times, and the change countdown on a tracked trip can start before your train arrives.
