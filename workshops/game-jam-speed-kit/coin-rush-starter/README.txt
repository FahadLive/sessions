COIN RUSH - 3D STARTER PROJECT
================================

This is the optional 3D track for the Game Jam Speed Kit (3-hour workshop).
The guide is at https://guide.justfahad.me/game-jam-overview/

THE GAME
--------
You walk around a small arena, collect 5 spinning coins, and avoid the
red ball swinging through the middle. The timer counts down from 30.
Touch the ball or hit 0 seconds and the round restarts.

WHAT'S IN HERE
--------------
project.godot        Already configured: Compatibility renderer (the
                     best one for web export), a 960x540 window, and
                     arrow keys + WASD for moving.

scenes/
  main.tscn          The whole game: arena, walls, player, camera,
                     5 coins, the hazard, and the HUD.
  coin.tscn          One spinning coin. Drag more copies from the
                     FileSystem panel to add coins.
  hazard.tscn        The swinging red ball. It has two numbers you
                     can tune in the Inspector: distance and speed.

scripts/
  player.gd          Move with arrows/WASD + gravity.
  coin.gd            Spins, and scores when the player touches it.
  hazard.gd          Swings side to side, and restarts on touch.
  game_state.gd      The autoload: the score, the 30-second clock,
                     and the restart. Always running, in every scene.
  main.gd            Starts a fresh round when the scene loads.
  hud.gd             Shows the score and the clock, by listening to
                     the two signals GameState emits.

GODOT NOTE
----------
project.godot registers scripts/game_state.gd as an autoload called
"GameState". That one line is what lets the coin, the HUD and the
clock all reach the same score without hunting for nodes by path.
An autoload never resets itself, so main.gd calls GameState.start_round()
to zero the round by hand.

Everything is built from coloured primitive shapes (boxes, spheres,
capsules). There are no image or model files to import, so there is
nothing to break. Swap in your own art as a stretch goal.

BEFORE YOU START
----------------
1. Open Godot 4.6, click Import, pick this project's project.godot.
2. Wait for the bottom-right progress bar to finish importing.
3. Press F5. Collect a coin. Get hit by the red ball. You're playing.

A NOTE ON .godot/
-----------------
Godot creates a hidden .godot/ folder the first time you open the
project. Don't delete it, don't copy it between machines, and don't
worry about it. It is generated, not authored.

CREDITS
-------
Made for the Game Jam Speed Kit. No external art or audio used,
so there is nothing to credit - and nothing to license.
