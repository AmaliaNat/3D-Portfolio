import { GUI } from 'dat.gui'
import * as THREE from 'three'

export function setupStickyNoteGui(gui: GUI, note: THREE.Mesh, label: string) {
    const folder = gui.addFolder(label)
    folder.add(note, 'visible')
    folder.add(note.position, 'x', -1, 1)
    folder.add(note.position, 'y', -1, 1)
    folder.add(note.position, 'z', -1, 1)
    folder.open()
}