// custom component to handle opening and closing doors
@Component('doorState')
export class DoorState {
  closed: boolean = true
  fraction: number = 0
  openPos: Quaternion = Quaternion.Euler(0, 90, 0)
  closedPos: Quaternion = Quaternion.Euler(0, 0, 0)
}

// a group to keep track of all entities with a DoorState component
const doors = engine.getComponentGroup(DoorState)

// a message bus to sync state for all players
const sceneMessageBus = new MessageBus()


/// --- Define a custom type to pass in messages ---
type NewDoorState = {
	state: boolean;
  };

// a system to carry out the rotation
export class RotatorSystem implements ISystem {
 
  update(dt: number) {
    // iterate over the doors in the component group
    for (let door of doors.entities) {
      
      // get some handy shortcuts
      let state = door.getComponent(DoorState)
      let transform = door.getComponent(Transform)
      
      // check if the rotation needs to be adjusted
      if (state.closed == false && state.fraction < 1) {
        state.fraction += dt
        let rot = Quaternion.Slerp(state.closedPos, state.openPos, state.fraction)
        transform.rotation = rot
      } else if (state.closed == true && state.fraction > 0) {
        state.fraction -= dt
        let rot = Quaternion.Slerp(state.closedPos, state.openPos, state.fraction)
        transform.rotation = rot
      }
    }
  }
}

// Add system to engine
engine.addSystem(new RotatorSystem())

// Define a reusable box shape
let collideBox = new BoxShape()
collideBox.withCollisions = true

// Define fixed walls
const wall1 = new Entity()
wall1.addComponent(new Transform({
  position: new Vector3(5.75, 1, 3),
  scale: new Vector3(1.5, 2, 0.05)
}))
wall1.addComponent(collideBox)
engine.addEntity(wall1)

const wall2 = new Entity()
wall2.addComponent(new Transform({
  position: new Vector3(3.25, 1, 3),
  scale: new Vector3(1.5, 2, 0.05)
}))
wall2.addComponent(collideBox)
engine.addEntity(wall2)

// Add actual door to scene. This entity doesn't rotate, its parent drags it with it.
const door = new Entity()
door.addComponent(new Transform({
  position: new Vector3(0.5, 0, 0),
  scale: new Vector3(1, 2, 0.05)
}))
door.addComponent(collideBox)
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
doorPivot.addComponent(new Transform({
  position: new Vector3(4, 1, 3)
}))
doorPivot.addComponent(new DoorState())
engine.addEntity(doorPivot)

// Set the door as a child of doorPivot
door.setParent(doorPivot)

// Set the click behavior for the door
door.addComponent(
  new OnClick(e => {
    let currentState = doorPivot.getComponent(DoorState)
	let newState: NewDoorState = {
		 state: !currentState.closed
		} 
	sceneMessageBus.emit("doorToggle", newState)
  })
)

// To execute when a door is toggled
sceneMessageBus.on("doorToggle", (info: NewDoorState) => {
	doorPivot.getComponent(DoorState).closed = info.state
});

// To get the initial state of the scene when joining
sceneMessageBus.emit("getDoorState",{})

// To return the initial state of the scene to new players
sceneMessageBus.on("getDoorState", () => {
	let currentState: NewDoorState = {
		 state: doorPivot.getComponent(DoorState).closed
		} 
	sceneMessageBus.emit("doorToggle", currentState)
});


// ground
let floor = new Entity()
floor.addComponent(new GLTFShape("models/FloorBaseGrass.glb"))
floor.addComponent(new Transform({
  position: new Vector3(8, 0, 8), 
  scale:new Vector3(1.6, 0.1, 1.6)
}))
engine.addEntity(floor)



