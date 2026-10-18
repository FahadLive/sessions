extends CanvasLayer

@onready var score_label: Label = $ScoreLabel
@onready var time_label: Label = $TimeLabel


func _ready() -> void:
	GameState.score_changed.connect(_on_score_changed)
	GameState.time_changed.connect(_on_time_changed)


func _on_score_changed(new_score: int) -> void:
	score_label.text = "Coins: " + str(new_score)


func _on_time_changed(seconds_left: int) -> void:
	time_label.text = "Time: " + str(seconds_left)
