# Departures

A live departure board for any Swiss station (SBB and every other operator in the Swiss timetable). It shows real-time delays and platform changes and refreshes every 30 seconds.

**Open it:** https://y2h2tk6fnd-create.github.io/Departures/

## Put it on your iPhone

Open the link above in Safari, tap **Share → Add to Home Screen**, then **Add**. It gets its own icon and opens full screen like an app.

## Using it

- **From** is the station you leave from. On its own, it shows that station's departure board.
- **To** is optional. Fill it in to see the next trains from one station to the other, with arrival time, journey time and any changes. Clear it with × to go back to the departure board, or swap the two with ⇅.
- Both fields suggest stations as you type. Tap a field to see your **four most-used stations**.
- **Train / Tram / Bus / Boat / Cableway** choose what's shown. It starts with trains only.
- **Tap a train to watch it.** A card at the top counts down to the real departure time, including any delay, and shows the platform. The browser tab title shows the countdown too. Tap the train again, or **Stop watching**, to clear it.

On the board:

| What you see | Meaning |
|---|---|
| Red **12′05″** instead of the time | Leaves in 12 minutes 5 seconds (shown for trains leaving within 20 minutes) |
| **+3 min** in red under the time | The train is running 3 minutes late |
| Platform box in red, "New pl." | The platform has changed |
| Red line badge (IC 1, IR 15, RE…) | Long-distance or regional express train |
| Outlined line badge (S 1…) | S-Bahn, tram, bus and other local services |
| White row with blue and red stripes | Léman Express |
| White row with a red end and dark band | RE 33 |

All times are Swiss time, wherever you open the page.

## Train types and photos

The board can show which train model runs each departure (FLIRT, Régiolis, FV-Dosto, KISS and so on), and the "Watching" card shows a photo of it with the number of cars and seats. This uses SBB's Train Formation Service, which needs a free personal key:

1. Sign in at [api-manager.opentransportdata.swiss](https://api-manager.opentransportdata.swiss/) and copy your **Train Formation Service** key.
2. In the app, tap **Settings**, paste the key and tap **Save key**.

The key is stored only on your device. Train types are published for SBB, BLS, SOB, THURBO, TPF, TRN, Zentralbahn, RhB, MBC and SZU trains, plus the trains they run jointly with France, Italy and Germany. Some trains have no published formation; those simply show no type.

Photos come from Wikimedia Commons; see [trains/CREDITS.md](trains/CREDITS.md).

## Data

Timetable and real-time data come from the free public API at [transport.opendata.ch](https://transport.opendata.ch). No account or key is needed. Nothing is sent anywhere else, and your saved stations stay in your browser.
