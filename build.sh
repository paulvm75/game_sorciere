#!/bin/bash
# Rebuilds index.html from src/ (order matters: everything runs inside one IIFE opened in head.html)
cd "$(dirname "$0")"
cat src/head.html src/core.js src/metrodata.js src/ow_data.js src/ow_lm.js src/ow_city.js src/ow_city2.js src/ow_wassets.js src/ow_furn.js src/ow_far.js src/ow_metro.js src/chars.js src/chars_hero.js src/city.js src/mid.js src/ow_people.js src/ow_sim.js src/ow_talk.js src/ow_act.js src/ow_act2.js src/ow_act3.js src/ow_metroui.js src/ow_hud.js src/ow_voice.js src/ow_cafes.js src/ow_traffic.js src/prog.js src/bosses2.js src/kaen.js src/finale.js src/phantom.js src/sculpt.js src/creatures.js src/chapters.js src/bossmusic.js src/vo.js src/barks.js src/nv.js src/dzvo.js src/sfxs.js src/orson.js src/lowquay.js src/broom.js src/qol.js src/orsonface.js src/fixes.js src/mobile.js src/tail.js src/menu.js src/tail_end.js src/tail.html > index.html
echo "built index.html ($(wc -c < index.html) bytes)"
