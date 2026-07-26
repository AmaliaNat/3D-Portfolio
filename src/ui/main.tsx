import '../style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'
import Stats from 'three/addons/libs/stats.module.js'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { GUI } from 'dat.gui'

//#region scene
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))
//#endregion scene

//#region camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 0.5)
camera.rotation.set(0, 0, 0)
//#endregion camera

//#region webgl renderer
const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('webgl-container')!.appendChild(renderer.domElement)
//#endregion

//#region css3d renderer
const cssRenderer = new CSS3DRenderer()
cssRenderer.setSize(window.innerWidth, window.innerHeight)
// CSS3D layer must not block clicks except where a real UI element wants them
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
controls.enableDamping = true
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


const panelEl = document.createElement('div')
panelEl.style.pointerEvents = 'auto'
panelEl.style.width = '1600px'

const panelObject = new CSS3DObject(panelEl)

// position on the back wall, just off the surface
panelObject.position.set(0, 0.2, -0.99)


panelObject.scale.set(0.001, 0.001, 0.001)

scene.add(panelObject)

//#region gui
const gui = new GUI();
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

const root = createRoot(panelEl)
root.render(<App />)
//#endregion

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    renderer.render(scene, camera)
    cssRenderer.render(scene, camera)

    stats.update()
}

animate()