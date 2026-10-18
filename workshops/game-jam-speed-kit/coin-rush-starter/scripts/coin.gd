extends Area3D


func _process(delta: float) -> void:
	rotate_y(2.5 * delta)


func _on_body_entered(_body: Node3D) -> void:
	GameState.add_point()
	queue_free()
