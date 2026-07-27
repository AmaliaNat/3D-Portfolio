import { useEffect, useState } from 'react'
import { popupState } from '../popupState'

const columnDetails = [
    { title: 'Past Works', body: 'Content for column 1 goes here — edit this later.' },
    { title: 'Skills', body: 'Content for column 2 goes here — edit this later.' },
    { title: 'Contact me', body: 'Content for column 3 goes here — edit this later.' },
]

export function Popup() {
    const [snapshot, setSnapshot] = useState(popupState.getSnapshot())

    useEffect(() => popupState.subscribe(setSnapshot), [])

    const { activeColumn } = snapshot

    const currentActiveColumn = activeColumn ?? 0

    const detail = columnDetails[currentActiveColumn]

    if (!detail) return null

    return (
        <div className="bg-white text-black p-10 w-full relative shadow-[36px_25px_100px_white]">
            <button
                onClick={() => popupState.setActiveColumn(null)}
                className="absolute top-3 right-4 text-2xl leading-none cursor-pointer"
            >
                ×
            </button>
            <h2 className="text-2xl font-bold mb-4">{detail.title}</h2>
            <p>{detail.body}</p>
        </div>
    )
}