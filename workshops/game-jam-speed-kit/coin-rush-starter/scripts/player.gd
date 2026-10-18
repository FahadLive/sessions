extends CharacterBody3D

const SPEED := 5.0


func _physics_process(delta: float) -> void:
	if not is_on_floor():
		velocity.y -= 20.0 * delta
	var dir := Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	velocity.x = dir.x * SPEED
	velocity.z = dir.y * SPEED
	move_and_slide()
