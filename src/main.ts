import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'dat.gui'
import { StickyNote } from './objects/StickyNote'
import { setupStickyNoteGui } from './gui/setupGui'

//#region scene
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))
//#endregion scene

//#region camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0.2, -0.1);
camera.rotation.set(0, 0, 0)
//#endregion camera


//#region renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

//new OrbitControls(camera, renderer.domElement)
//#endregion

//#region room
// geometry
const geometry = new THREE.BoxGeometry(2, 2, 2)

// texture
const loader = new THREE.TextureLoader();
const texture = loader.load("/textures/steel.jpg");

//material
const material = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.BackSide
});

// mesh
const cube = new THREE.Mesh(geometry, material)

scene.add(cube)
//#endregion


//#region fonts
const font = new FontFace('hikerTM', 'url(/fonts/hikerTM-Regular.woff2)')
await font.load()
document.fonts.add(font)
//#endregion

// const note1 = new StickyNote('Finish the demo')
// note1.position.set(0, 0.3, -0.99)
// scene.add(note1)
//stats
const stats = new Stats()
document.body.appendChild(stats.dom)

//#region lights
const data = { color: 0x00ff00, lightColor: 0xffffff }
const ambientLight = new THREE.AmbientLight(data.lightColor, Math.PI)
ambientLight.visible = true
scene.add(ambientLight)
//#endregion

//#region gui

// const gui = new GUI()
// const cubeFolder = gui.addFolder('Cube')
// cubeFolder.add(cube, 'visible')
// cubeFolder.open()

// const positionFolder = cubeFolder.addFolder('Position')
// positionFolder.add(cube.position, 'x', -5, 5)
// positionFolder.add(cube.position, 'y', -5, 5)
// positionFolder.add(cube.position, 'z', -5, 5)
// positionFolder.open()

// const rotationFolder = cubeFolder.addFolder('Rotation')
// rotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
// rotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
// rotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
// rotationFolder.open()

// const scaleFolder = cubeFolder.addFolder('Scale')
// scaleFolder.add(cube.scale, 'x', -5, 5)
// scaleFolder.add(cube.scale, 'y', -5, 5)
// scaleFolder.add(cube.scale, 'z', -5, 5)
// scaleFolder.open()

// const cameraFolder = gui.addFolder('Camera')
// cameraFolder.add(camera.position, 'x', -10, 10)
// cameraFolder.add(camera.position, 'y', -10, 10)
// cameraFolder.add(camera.position, 'z', -10, 10)
// cameraFolder.add(camera, 'fov', 0, 180, 0.01).onChange(() => {
//   camera.updateProjectionMatrix()
// })
// cameraFolder.add(camera, 'aspect', 0.00001, 10).onChange(() => {
//   camera.updateProjectionMatrix()
// })
// cameraFolder.add(camera, 'near', 0.01, 10).onChange(() => {
//   camera.updateProjectionMatrix()
// })
// cameraFolder.add(camera, 'far', 0.01, 10).onChange(() => {
//   camera.updateProjectionMatrix()
// })

// cameraFolder
//   .add(camera.rotation, "x", -Math.PI, Math.PI)
//   .name("Rotation X");

// cameraFolder
//   .add(camera.rotation, "y", -Math.PI, Math.PI)
//   .name("Rotation Y");

// cameraFolder
//   .add(camera.rotation, "z", -Math.PI, Math.PI)
//   .name("Rotation Z");
// cameraFolder.open()
//#endregion gui

//setupStickyNoteGui(gui, note1, 'Sticky Note 2')

function animate() {

  requestAnimationFrame(animate)

  renderer.render(scene, camera)

  stats.update()
}

animate()