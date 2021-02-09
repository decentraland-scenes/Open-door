import * as utils from '@dcl/ecs-scene-utils'

let openPos: Quaternion = Quaternion.Euler(0, 90, 0)
let closedPos: Quaternion = Quaternion.Euler(0, 0, 0)

// Define fixed walls
const wall1 = new Entity()
wall1.addComponent(
  new Transform({
    position: new Vector3(5.75, 1, 3),
    scale: new Vector3(1.5, 2, 0.05),
  })
)
wall1.addComponent(new BoxShape())
engine.addEntity(wall1)

const wall2 = new Entity()
wall2.addComponent(
  new Transform({
    position: new Vector3(3.25, 1, 3),
    scale: new Vector3(1.5, 2, 0.05),
  })
)
wall2.addComponent(new BoxShape())
engine.addEntity(wall2)

// Add actual door to scene. This entity doesn't rotate, its parent drags it with it.
const door = new Entity()
door.addComponent(
  new Transform({
    position: new Vector3(0.5, 0, 0),
    scale: new Vector3(1, 2, 0.05),
  })
)
door.addComponent(new BoxShape())
engine.addEntity(door)

// Define a material to color the door red
const doorMaterial = new Material()
doorMaterial.albedoColor = Color3.Red()
doorMaterial.metallic = 0.9
doorMaterial.roughness = 0.1

// Assign the material to the door
door.addComponent(doorMaterial)

// Define wrapper entity to rotate door. This is the entity that actually rotates.
const doorPivot = new Entity()
doorPivot.addComponent(
  new Transform({
    position: new Vector3(4, 1, 3),
    rotation: closedPos,
  })
)
//doorPivot.addComponent(new DoorState())
engine.addEntity(doorPivot)

// Set the door as a child of doorPivot
door.setParent(doorPivot)

//toggle behavior for door
door.addComponent(
  new utils.ToggleComponent(utils.ToggleState.Off, (value) => {
    if (value == utils.ToggleState.On) {
      doorPivot.addComponentOrReplace(
        new utils.RotateTransformComponent(
          doorPivot.getComponent(Transform).rotation,
          openPos,
          0.5
        )
      )
    } else {
      doorPivot.addComponentOrReplace(
        new utils.RotateTransformComponent(
          doorPivot.getComponent(Transform).rotation,
          closedPos,
          0.5
        )
      )
    }
  })
)

// Set the click behavior for the door
door.addComponent(
  new OnPointerDown(
    (e) => {
      door.getComponent(utils.ToggleComponent).toggle()
    },
    { button: ActionButton.POINTER, hoverText: 'Open/Close' }
  )
)
