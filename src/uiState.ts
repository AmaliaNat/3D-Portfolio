type ScreenPos = { x: number; y: number; visible: boolean }

type State = {
    activeColumn: number | null
    panelPos: ScreenPos | null
}

type Listener = (state: State) => void

let listeners: Listener[] = []
let state: State = { activeColumn: null, panelPos: null }

export const uiState = {
    setActiveColumn(i: number | null) {
        state = { ...state, activeColumn: i }
        listeners.forEach((l) => l(state))
    },
    updatePanelPos(pos: ScreenPos | null) {
        state = { ...state, panelPos: pos }
        listeners.forEach((l) => l(state))
    },
    getSnapshot() {
        return state
    },
    subscribe(fn: Listener) {
        listeners.push(fn)
        return () => {
            listeners = listeners.filter((l) => l !== fn)
        }
    },
}