type State = {
    activeColumn: number | null
}

type Listener = (state: State) => void

let listeners: Listener[] = []
let state: State = { activeColumn: null }

export const popupState = {
    setActiveColumn(i: number | null) {
        state = { ...state, activeColumn: i }
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