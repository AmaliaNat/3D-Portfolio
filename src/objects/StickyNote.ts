import * as THREE from 'three'

export class StickyNote extends THREE.Mesh {
    constructor(text: string, color = '#C43535', width = 1.5, height = 1) {
        const canvas = document.createElement('canvas')
        canvas.width = 512 * (width / height) // keep resolution proportional
        canvas.height = 512
        const ctx = canvas.getContext('2d')!
        ctx.fillStyle = color
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#222'
        ctx.font = '28px hikerTM'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(text, canvas.width / 2, canvas.height / 2)

        const texture = new THREE.CanvasTexture(canvas)
        const geometry = new THREE.PlaneGeometry(width, height)

        const material = new THREE.MeshStandardMaterial({ map: texture })

        super(geometry, material)
    }

    placeOnWall(wall: 'front' | 'back' | 'left' | 'right', x: number, y: number) {
    }
}