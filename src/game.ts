
import utils from "../node_modules/decentraland-ecs-utils/index"
import { Door } from "./door";

let door1 = new Door( { position: new Vector3(4, 1, 3) })

let door2 = new Door( { position: new Vector3(6.5, 1, 3)})

let door3 = new Door( { position: new Vector3(1.5, 1, 3)})

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




// // Add actual door to scene. This entity doesn't rotate, its parent drags it with it.
// const door = new Entity()
// door.addComponent(new Transform({
//   position: new Vector3(0.5, 0, 0),
//   scale: new Vector3(1, 2, 0.05)
// }))
// door.addComponent(collideBox)
// engine.addEntity(door)

// // Assign the material to the door
// door.addComponent(doorMaterial)

// // Define wrapper entity to rotate door. This is the entity that actually rotates.
// const doorPivot = new Entity()
// doorPivot.addComponent(new Transform({
//   position: new Vector3(4, 1, 3),
//   rotation: closedPos
// }))
// //doorPivot.addComponent(new DoorState())
// engine.addEntity(doorPivot)

// // Set the door as a child of doorPivot
// door.setParent(doorPivot)

// //toggle behavior for door
// door.addComponent(new utils.ToggleComponent(utils.ToggleState.Off, value =>{
// 	if (value == utils.ToggleState.On){
// 		doorPivot.addComponentOrReplace(
// 			new utils.RotateTransformComponent(doorPivot.getComponent(Transform).rotation, openPos, 0.5)
// 			)
// 	}
// 	else{
// 		doorPivot.addComponentOrReplace(
// 			new utils.RotateTransformComponent(doorPivot.getComponent(Transform).rotation, closedPos, 0.5)
// 			)
// 	}
// }))

// doors.push(door)




// // Door 2
// const door2 = new Entity()
// door2.addComponent(new Transform({
//   position: new Vector3(0.5, 0, 0),
//   scale: new Vector3(1, 2, 0.05)
// }))
// door2.addComponent(collideBox)
// engine.addEntity(door2)

// // Assign the material to the door
// door2.addComponent(doorMaterial)

// // Define wrapper entity to rotate door. This is the entity that actually rotates.
// const doorPivot2 = new Entity()
// doorPivot2.addComponent(new Transform({
//   position: new Vector3(6.5, 1, 3),
//   rotation: closedPos
// }))
// //doorPivot.addComponent(new DoorState())
// engine.addEntity(doorPivot2)

// // Set the door as a child of doorPivot
// door2.setParent(doorPivot2)

// //toggle behavior for door
// door2.addComponent(new utils.ToggleComponent(utils.ToggleState.Off, value =>{
// 	if (value == utils.ToggleState.On){
// 		doorPivot2.addComponentOrReplace(
// 			new utils.RotateTransformComponent(doorPivot2.getComponent(Transform).rotation, openPos, 0.5)
// 			)
// 	}
// 	else{
// 		doorPivot2.addComponentOrReplace(
// 			new utils.RotateTransformComponent(doorPivot2.getComponent(Transform).rotation, closedPos, 0.5)
// 			)
// 	}
// }))

// doors.push(door2)


// const door3 = new Entity()
// door3.addComponent(new Transform({
//   position: new Vector3(0.5, 0, 0),
//   scale: new Vector3(1, 2, 0.05)
// }))
// door3.addComponent(collideBox)
// engine.addEntity(door3)

// // Assign the material to the door
// door3.addComponent(doorMaterial)

// // Define wrapper entity to rotate door. This is the entity that actually rotates.
// const doorPivot3 = new Entity()
// doorPivot3.addComponent(new Transform({
//   position: new Vector3(1.5, 1, 3),
//   rotation: closedPos
// }))
// //doorPivot.addComponent(new DoorState())
// engine.addEntity(doorPivot3)

// // Set the door as a child of doorPivot
// door3.setParent(doorPivot3)

// //toggle behavior for door
// door3.addComponent(new utils.ToggleComponent(utils.ToggleState.Off, value =>{
// 	if (value == utils.ToggleState.On){
// 		doorPivot3.addComponentOrReplace(
// 			new utils.RotateTransformComponent(doorPivot3.getComponent(Transform).rotation, openPos, 0.5)
// 			)
// 	}
// 	else{
// 		doorPivot3.addComponentOrReplace(
// 			new utils.RotateTransformComponent(doorPivot3.getComponent(Transform).rotation, closedPos, 0.5)
// 			)
// 	}
// }))

// doors.push(door3)


// Set the click behavior for the door
// door.addComponent(
//   new OnClick(e => {
// 	door.getComponent(utils.ToggleComponent).toggle()
//   })
// )




