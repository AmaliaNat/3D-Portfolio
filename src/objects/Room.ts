import * as THREE from 'three'

export function createRoom(size = 2, texturePath = '/textures/steel.jpg') {
    const loader = new THREE.TextureLoader()
    const geometry = new THREE.BoxGeometry(size, size, size)
    const material = new THREE.MeshBasicMaterial({
        map: loader.load(texturePath),
        side: THREE.BackSide,
    })
    return new THREE.Mesh(geometry, material)
}