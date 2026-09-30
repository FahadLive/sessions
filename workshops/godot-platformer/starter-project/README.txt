GODOT PLATFORMER - STARTER PROJECT
====================================

This is the starting point for the 4-hour Godot platformer workshop.
The guide is at https://guide.justfahad.me/godot-platformer-overview/

WHAT'S IN HERE
--------------
project.godot        Project settings. Already configured: pixel-art
                     texture filtering, a 640x360 window, a pixel UI font,
                     and arrow keys + WASD for moving left/right.
icon.svg             Project icon.
default_bus_layout.tres   Two audio buses: "Music" and "SFX".

assets/
  sprites/           world_tileset.png, knight.png, coin.png, platforms.png,
                     slime_green.png, slime_purple.png, fruit.png
  sounds/            jump.wav, coin.wav, explosion.wav, hurt.wav, tap.wav,
                     power_up.wav
  music/             time_for_adventure.mp3
  fonts/             PixelOperator8.ttf, PixelOperator8-Bold.ttf

tilesets/
  world_tileset.tres   Already configured with collision. Every tile you
                     paint is solid - you do not need to set up physics.

scenes/
  game.tscn          The main scene. It has one node: "Level", a TileMapLayer
                     with the tileset already assigned. It is empty.

BEFORE YOU START
----------------
1. Open Godot 4.6, click Import, pick this project's project.godot.
2. Wait for the bottom-right progress bar to finish importing.
3. Press F5.

You'll see an empty screen. That's correct - you're about to build the level.

A NOTE ON .godot/
-----------------
Godot creates a hidden .godot/ folder the first time you open the project.
Don't delete it, don't copy it between machines, and don't worry about it.
It is generated, not authored.

CREDITS
-------
Art and audio: Brackeys Platformer Bundle
https://brackeysgames.itch.io/brackeys-platformer-bundle
Everything is free to use, also commercially (public domain).
