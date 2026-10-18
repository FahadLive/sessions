extends Node

signal score_changed(new_score: int)
signal time_changed(seconds_left: int)

const ROUND_SECONDS := 30.0

var score := 0
var time_left := ROUND_SECONDS
var running := false


func start_round() -> void:
	score = 0
	time_left = ROUND_SECONDS
	running = true
	score_changed.emit(score)
	time_changed.emit(int(ceil(time_left)))


func add_point() -> void:
	score += 1
	score_changed.emit(score)


func restart_round() -> void:
	get_tree().reload_current_scene.call_deferred()


func _process(delta: float) -> void:
	if not running:
		return
	time_left -= delta
	time_changed.emit(int(ceil(time_left)))
	if time_left <= 0.0:
		running = false
		restart_round()
