extends Area3D

@export var distance := 6.0
@export var speed := 1.5

var _time := 0.0
var _origin := Vector3.ZERO


func _ready() -> void:
	_origin = position


func _physics_process(delta: float) -> void:
	_time += delta
	position.x = _origin.x + sin(_time * speed) * distance


func _on_body_entered(_body: Node3D) -> void:
	GameState.restart_round()
