# Departures

A live departure board for any Swiss station (SBB and every other operator in the Swiss timetable). It shows real-time delays and platform changes and refreshes every 30 seconds.

**Open it:** https://y2h2tk6fnd-create.github.io/Departures/

## Put it on your iPhone

Open the link above in Safari, tap **Share → Add to Home Screen**, then **Add**. It gets its own icon and opens full screen like an app.

## Using it

- **Find a station** in the search box. It's added as a tab, and tabs are remembered in this browser. Remove a tab with ×.
- **Train / Tram / Bus / Boat / Cableway** choose what the board shows. It starts with trains only.
- **Only trains towards…** keeps the departures whose destination or stops along the way match what you type (e.g. `Genève` or `Olten`).
- **Tap a departure to watch it.** A card at the top counts down to the real departure time, including any delay, and shows the platform. The browser tab title shows the countdown too, so you can keep an eye on it from another tab. Tap the departure again, or **Stop watching**, to clear it.

On the board:

| What you see | Meaning |
|---|---|
| **+3 min** in red under the time | The train is running 3 minutes late |
| Platform on a yellow background | The platform has changed |
| Filled line badge (IC 1, IR 15, RE…) | Long-distance or regional express train |
| Outlined line badge (S 1…) | S-Bahn, tram, bus and other local services |
| Minutes in green | Leaves within 5 minutes |

All times are Swiss time, wherever you open the page.

## Train types and photos

The board can show which train model runs each departure (FLIRT, Régiolis, FV-Dosto, KISS and so on), and the "Watching" card shows a photo of it with the number of cars and seats. This uses SBB's Train Formation Service, which needs a free personal key:

1. Sign in at [api-manager.opentransportdata.swiss](https://api-manager.opentransportdata.swiss/) and copy your **Train Formation Service** key.
2. In the app, tap **Settings**, paste the key and tap **Save key**.

The key is stored only on your device. Train types are published for SBB, BLS, SOB, THURBO, TPF, TRN, Zentralbahn, RhB, MBC and SZU trains, plus the trains they run jointly with France, Italy and Germany. Some trains have no published formation; those simply show no type.

Photos come from Wikimedia Commons; see [trains/CREDITS.md](trains/CREDITS.md).

## Data

Timetable and real-time data come from the free public API at [transport.opendata.ch](https://transport.opendata.ch). No account or key is needed. Nothing is sent anywhere else, and your saved stations stay in your browser.
