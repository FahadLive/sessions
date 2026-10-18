extends Node3D


func _ready() -> void:
	# Autoloads never reset themselves, so each round starts clean by hand.
	GameState.start_round()
