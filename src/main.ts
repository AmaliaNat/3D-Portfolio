import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { uiState } from './uiState'

//#region scene
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))
//#endregion scene

//#region camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0.2, -0.1)
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
const data = { color: 0x00ff00, lightColor: 0xffffff }
const ambientLight = new THREE.AmbientLight(data.lightColor, Math.PI)
ambientLight.visible = true
scene.add(ambientLight)
//#endregion

//#region wall-anchored "About me" panel
// this is the single point on the wall the whole panel is pinned to.
// adjust to wherever you want it to physically sit on the wall.
const panelAnchor = new THREE.Vector3(0, 0.2, -0.99)
const projectedPoint = new THREE.Vector3()
//#endregion

function animate() {
  requestAnimationFrame(animate)

  projectedPoint.copy(panelAnchor).project(camera)

  const x = (projectedPoint.x * 0.5 + 0.5) * window.innerWidth
  const y = (-projectedPoint.y * 0.5 + 0.5) * window.innerHeight

  const visible =
    projectedPoint.z < 1 &&
    Math.abs(projectedPoint.x) < 1 &&
    Math.abs(projectedPoint.y) < 1

  uiState.updatePanelPos({ x, y, visible })

  controls.update()
  renderer.render(scene, camera)
  stats.update()
}

animate()