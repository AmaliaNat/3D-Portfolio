import { useEffect, useState } from 'react'
import { popupState } from '../popupState'

const columnDetails = [
    { title: 'Skills', body: 'LOOK AT YOUR LEFT', image: 'images/left-arrow.png' },
    { title: 'Skills', body: 'LOOK AT YOUR RIGHT', image: 'images/right-arrow.png' },
    { title: 'Contact me', body: 'BEHIND YOU', image: 'images/behind-arrow.png' },
]

export function Popup() {
    const [snapshot, setSnapshot] = useState(popupState.getSnapshot())

    useEffect(() => popupState.subscribe(setSnapshot), [])

    const { activeColumn } = snapshot

    if (activeColumn === null || activeColumn === undefined) return null

    const detail = columnDetails[activeColumn]

    if (!detail) return null

    return (
        <div
            key={activeColumn}
            className="relative flex flex-row items-center gap-6 p-4 text-black"
            style={{
                animation: 'fadeIn 0.4s ease-out forwards'
            }}
        >
            {/* INLINE ANIMATION STYLES */}
            <style>{`
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
                @keyframes urgentBorderFlash {
                    0%, 100% { border-color: rgba(255,60,60,0.2); }
                    50% { border-color: rgba(255,60,60,1); }
                }
            `}</style>


            {/* LEFT SIDE: DIAMOND SHAPED IMAGE WITH FLASHING BORDER */}
            <div className="relative shrink-0 w-100 h-100">
                {/* DIAMOND IMAGE */}
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${detail.image})`,
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                    }}
                />

                {/* DIAMOND INNER BORDER OUTLINE */}
                <div
                    className="absolute inset-1 pointer-events-none border-2 border-black"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                        animation: 'urgentBorderFlash 1.1s ease-in-out 0.4s infinite'
                    }}
                />
            </div>

            {/* RIGHT SIDE: BODY TEXT */}
            <div className="flex-1 text-left">
                <p className="text-[clamp(2rem,25vw,10rem)] text-[#6b6b6b]   font-timegoing uppercase leading-[0.8] tracking-tight">
                    {detail.body}
                </p>
            </div>
        </div>
    )
}