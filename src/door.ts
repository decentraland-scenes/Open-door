
import utils from "../node_modules/decentraland-ecs-utils/index"

// Define a material to color the door red
const doorMaterial = new Material()
doorMaterial.albedoColor = Color3.Red()
doorMaterial.metallic = 0.9
doorMaterial.roughness = 0.1


let openPos: Quaternion = Quaternion.Euler(0, 90, 0)
let closedPos: Quaternion = Quaternion.Euler(0, 0, 0)


// Define a reusable box shape
let collideBox = new BoxShape()
collideBox.withCollisions = true

let doors: Entity[] = []

export class Door extends Entity {
	public isOpen: boolean
	public doorPivot: Entity
  
	// Allow each room to specify a unique look and feel
	constructor(
	  transform: TranformConstructorArgs
	) {
	  super();
  
	  this.addComponent(new Transform({
		position: new Vector3(0.5, 0, 0),
		scale: new Vector3(1, 2, 0.05)
	  }))
	  
	  
	  this.addComponent(collideBox)
	  this.addComponent(doorMaterial)

	  const doorPivot = new Entity()

	  doorPivot.addComponent(new Transform(transform))

	 
	  // Set the door as a child of doorPivot
	  this.setParent(doorPivot)

	  this.doorPivot = doorPivot

	  //toggle behavior for door
	  this.addComponent(new utils.ToggleComponent(utils.ToggleState.Off, value =>{
		if (value == utils.ToggleState.On){
			this.isOpen = false
			this.doorPivot.addComponentOrReplace(
				new utils.RotateTransformComponent(this.doorPivot.getComponent(Transform).rotation, openPos, 0.5)
				)
		}
		else{
			this.isOpen = true
			this.doorPivot.addComponentOrReplace(
				new utils.RotateTransformComponent(this.doorPivot.getComponent(Transform).rotation, closedPos, 0.5)
				)
		}
	  }))
	  engine.addEntity(doorPivot)
	  engine.addEntity(this)

	//   this.addComponent(new Animator());
	//   this.getComponent(Animator).addClip(
	// 	new AnimationState("Door_Open", { looping: false })
	//   );
	//   this.getComponent(Animator).addClip(
	// 	new AnimationState("Door_Close", { looping: false })
	//   );
  
	  let sound = new AudioClip("sounds/door_squeak.mp3")
	  this.addComponent(new AudioSource(sound));

	  doors.push(this)
	}
  
	/**
	 * Exposing `openDoor` as an action this object is capable of
	 * This contains the open door experience (animation and sound) while allowing
	 * the scenes to decide when the action occurs (e.g. on door click in room 1 or button click in room 2)
	 */
  
	public openDoor(playAudio = true): void {
		if (this.isOpen) return
		this.isOpen = true
		this.doorPivot.addComponentOrReplace(
			new utils.RotateTransformComponent(this.doorPivot.getComponent(Transform).rotation, openPos, 0.5)
			)
	}
  
	// Similiarly we can close the door.
	public closeDoor(playAudio = true): void {
		if (!this.isOpen) return
		this.isOpen = false
		this.doorPivot.addComponentOrReplace(
			new utils.RotateTransformComponent(this.doorPivot.getComponent(Transform).rotation, closedPos, 0.5)
			)
	}
  
	// Or toggle the state between open and closed
	public toggleDoor(playAudio = true): void {
		this.getComponent(utils.ToggleComponent).toggle()
	}
  }


// object to get user position and rotation
const camera = Camera.instance

// object to get buttonUp and buttonDown events
const input = Input.instance


let maxDist = 8

input.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, e => {
	let activatedDoor = null
	let minAngle = 90
	for (let d of doors){
		if (isInRange(d) ) {
			let angle = Math.abs(getAngle(d))
			if (angle < minAngle){
				log(angle)
				minAngle = angle
				activatedDoor = d
			}
			//log(d.getParent().getComponent(Transform).position.x)
		}		
	}
	if (activatedDoor != null){
		activatedDoor.getComponent(utils.ToggleComponent).toggle()
	}	
  })


export function isInRange(d: Entity){
	let doorPos = d.getComponent(Transform).position
	let doorVect = camera.position.subtract(doorPos)
	if (doorVect.length() > maxDist) {
		return false
	}
	return true
}

export function getAngle(d: Entity){
	let doorPos = d.getComponent(Transform).position
	let doorVector = camera.position.subtract(doorPos)
	let angle = Vector3.GetAngleBetweenVectors(doorVector, camera.rotation.eulerAngles, Vector3.Up()) * RAD2DEG
	return angle
}