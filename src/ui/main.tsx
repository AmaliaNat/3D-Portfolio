import '../style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'
import Stats from 'three/addons/libs/stats.module.js'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { Popup } from './Popup'
import { LeftPanel } from './LeftPanel'
import { GUI } from 'dat.gui'

//#region scene
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))
//#endregion scene

//#region camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 0.5)
camera.rotation.set(0, 0, 0)
camera.fov = 92;
camera.updateProjectionMatrix();
//#endregion camera

//#region webgl renderer
const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('webgl-container')!.appendChild(renderer.domElement)
//#endregion

//#region css3d renderer
const cssRenderer = new CSS3DRenderer()
cssRenderer.setSize(window.innerWidth, window.innerHeight)
cssRenderer.domElement.style.position = 'absolute'
cssRenderer.domElement.style.top = '0'
cssRenderer.domElement.style.pointerEvents = 'none'
document.getElementById('css3d-container')!.appendChild(cssRenderer.domElement)
//#endregion

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    cssRenderer.setSize(window.innerWidth, window.innerHeight)
})

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0, 0)
controls.enableDamping = true
controls.minDistance = 0.3
controls.maxDistance = 0.6
//#endregion

//#region room
const geometry = new THREE.BoxGeometry(2, 2, 2)

const loader = new THREE.TextureLoader()
const texture = loader.load('/textures/steel.jpg')

const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
//#endregion

//#region fonts
const font = new FontFace('hikerTM', 'url(/fonts/hikerTM-Regular.woff2)')
await font.load()
document.fonts.add(font)
//#endregion

//#region stats
const stats = new Stats()
document.body.appendChild(stats.dom)
//#endregion

//#region lights
const ambientLight = new THREE.AmbientLight(0xffffff, Math.PI)
scene.add(ambientLight)
//#endregion

//#region "About me" panel — back wall
const panelEl = document.createElement('div')
panelEl.style.pointerEvents = 'auto'
panelEl.style.width = '1800px'
panelEl.style.backfaceVisibility = 'hidden'

const panelObject = new CSS3DObject(panelEl)
panelObject.position.set(0, 0.2, -0.99)
panelObject.scale.set(0.001, 0.001, 0.001)
scene.add(panelObject)

const panelRoot = createRoot(panelEl)
panelRoot.render(<App />)
//#endregion

//#region popup panel — same wall as "About me", positioned just below it
const popupEl = document.createElement('div')
popupEl.style.pointerEvents = 'auto'
popupEl.style.width = '1600px'
popupEl.style.backfaceVisibility = 'hidden'

const popupObject = new CSS3DObject(popupEl)
popupObject.position.set(0, -0.70, -0.99)
popupObject.scale.set(0.001, 0.001, 0.001)
scene.add(popupObject)

const popupRoot = createRoot(popupEl)
popupRoot.render(<Popup />)
//#endregion

//#region dummy panel — left wall, build on this later
const leftPanelEl = document.createElement('div')
leftPanelEl.style.pointerEvents = 'auto'
leftPanelEl.style.width = '1600px'
leftPanelEl.style.backfaceVisibility = 'hidden'

const leftPanelObject = new CSS3DObject(leftPanelEl)
// NOTE: all three position args are required — a missing 3rd arg (z) leaves
// the object at an invalid/NaN position, which caused the resizing glitch.
leftPanelObject.position.set(-0.99, 0.2, 0)
leftPanelObject.rotation.y = Math.PI / 2 // face into the room from the left wall
leftPanelObject.scale.set(0.001, 0.001, 0.001)
scene.add(leftPanelObject)

const leftPanelRoot = createRoot(leftPanelEl)
leftPanelRoot.render(<LeftPanel />)
//#endregion

//#region gui
const gui = new GUI()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'x', -10, 10)
cameraFolder.add(camera.position, 'y', -10, 10)
cameraFolder.add(camera.position, 'z', -10, 10)
cameraFolder.add(camera, 'fov', 0, 180, 0.01).onChange(() => {
    camera.updateProjectionMatrix()
})
cameraFolder.add(camera, 'aspect', 0.00001, 10).onChange(() => {
    camera.updateProjectionMatrix()
})
cameraFolder.add(camera, 'near', 0.01, 10).onChange(() => {
    camera.updateProjectionMatrix()
})
cameraFolder.add(camera, 'far', 0.01, 10).onChange(() => {
    camera.updateProjectionMatrix()
})
cameraFolder.open()
//#endregion

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    renderer.render(scene, camera)
    cssRenderer.render(scene, camera)

    stats.update()
}

animate()