import { useEffect, useState } from 'react'
import { popupState } from '../popupState'

const columnDetails = [
    { title: 'Past Works', body: 'Content for column 1 goes here — edit this later.' },
    { title: 'Skills', body: 'Content for column 2 goes here — edit this later.' },
    { title: 'Past Works', body: 'Content for column 3 goes here — edit this later.' },
]

export function Popup() {
    const [snapshot, setSnapshot] = useState(popupState.getSnapshot())

    useEffect(() => popupState.subscribe(setSnapshot), [])

    const { activeColumn } = snapshot

    if (activeColumn === null) return null

    const detail = columnDetails[activeColumn]

    return (
        <div className="bg-white text-black p-10 w-full relative">
            <button
                onClick={() => popupState.setActiveColumn(null)}
                className="absolute top-3 right-4 text-2xl leading-none"
            >
                ×
            </button>
            <h2 className="text-2xl font-bold mb-4">{detail.title}</h2>
            <p>{detail.body}</p>
        </div>
    )
}