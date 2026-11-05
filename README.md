# Sorcière

A witch action RPG in Paris, built with Three.js (r128). Two modes:

- **Story** - Maëlle fights her way through Paris after midnight, from the catacomb pigs to Kaen, the Master of Illusions.
  - **Chapter 2 · The Crossing** - Kaen's prison breaks and the map grows into the real 7th and 16th (Trocadéro, Pont d'Iéna, Bir-Hakeim, Île aux Cygnes, Maison de la Radio, Invalides, Pont Alexandre III, Orsay). Kaen's journal tells his story, his sister Lyra opens a door to Calais, and you fly the cursed Channel through waves of bats, winged jack-o'-lanterns and gargoyles, over the white cliffs and the English countryside, to London: Big Ben, the London Eye, St Paul's, the Shard, Tower Bridge and the Tower. Greyfang waits on the clock tower. At the Tower of London, magic only tightens Kaen's chains: the Tower's spirit asks its questions, and one wrong answer burns you.
- **Open world** - real Paris street data, métro, cafés, quests, Orson's gold, broom flight over the city.

## Play

- **Online:** enable GitHub Pages on this repo (Settings > Pages > Deploy from branch `main`, root) and open the Pages URL. `index.html` loads its sounds, models and map data from `assets/`.
- **Offline:** download `Sorciere-offline.html` and open it in Chrome. Everything is embedded except the music and the larger sound packs, which fall back to synth sound. Chapter 2 voices and one take of each new sound are embedded.

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

## Audio

Chapter 2 voices (Lyra, Maëlle, Kaen, the Tower), sound effects (`assets/sx_*`) and music (`assets/mus_mourn.mp3`, `assets/mus_london.mp3`, `assets/mus_greyfang.mp3`, `assets/mus_kaenlb.mp3`) were generated with ElevenLabs.
