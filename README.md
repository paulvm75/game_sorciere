# Sorcière

A witch action RPG in Paris, built with Three.js (r128). Two modes:

- **Story** - Maëlle fights her way through Paris after midnight, from the catacomb pigs to Kaen, the Master of Illusions.
- **Open world** - real Paris street data, métro, cafés, quests, Orson's gold, broom flight over the city.

## Play

- **Online:** enable GitHub Pages on this repo (Settings > Pages > Deploy from branch `main`, root) and open the Pages URL. `index.html` loads its sounds, models and map data from `assets/`.
- **Offline:** download `Sorciere-offline.html` and open it in Chrome. Everything is embedded except the large voice, sound and music packs, which fall back to synth sound.

Opening `index.html` straight from disk will not load the assets (browsers block `file://` fetches). Serve the folder instead, for example `python3 -m http.server` and go to http://localhost:8000.

## Controls (desktop)

| Key | Action |
| --- | --- |
| WASD / arrows | Move |
| Mouse | Camera |
| Shift | Sprint |
| Space | Jump, jump again in mid-air to call the broom. Hold to climb, tap to drop, tap again to catch the broom |
| F | Teleport |
| 1-0, Z X V G H | Spells (hold to charge) |
| K | Grimoire |
| E | Interact |
| R | Punch (open world) |
| C | Compel (open world) / drop while flying |
| M | Map (open world) |
| Esc | Pause |

Mobile is supported with on-screen controls.

## Source

`src/` holds the game split into modules. They are concatenated in a fixed order into one script (everything lives in a single IIFE opened in `head.html` and closed in `tail_end.js`).

```
./build.sh   # rebuilds index.html from src/
```
