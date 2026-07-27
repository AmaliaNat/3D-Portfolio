import { useEffect, useState } from 'react'
import { popupState } from '../popupState'

const columnDetails = [
    { title: 'Skills', body: 'LOOK TO YOUR LEFT' },
    { title: 'Skills', body: 'Content for column 2 goes here — edit this later.' },
    { title: 'Contact me', body: 'Content for column 3 goes here — edit this later.' },
]

export function Popup() {
    const [snapshot, setSnapshot] = useState(popupState.getSnapshot())

    useEffect(() => popupState.subscribe(setSnapshot), [])

    const { activeColumn } = snapshot

    const currentActiveColumn = activeColumn ?? 0

    if (activeColumn === null) return null

    const detail = columnDetails[currentActiveColumn]

    if (!detail) return null

    return (
        <div
            key={currentActiveColumn}
            className="
                relative w-full p-10 text-black rounded-5 overflow-hidden bg-white
            "
            style={{
                animation:
                    'renderScan 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards, urgentPulse 1.1s ease-in-out 0.75s infinite'
            }}
        >
            {/* INLINE ANIMATION STYLES */}
            <style>{`
                @keyframes renderScan {
                    0% {
                        clip-path: inset(0 0 100% 0);
                        opacity: 0.2;
                    }
                    100% {
                        clip-path: inset(0 0 0 0);
                        opacity: 1;
                    }
                }
                @keyframes scanLine {
                    0% {
                        top: 0%;
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        top: 100%;
                        opacity: 0;
                    }
                }
                @keyframes urgentPulse {
                    0%, 100% {
                        box-shadow: 0 0 40px 8px rgba(255,255,255,0.5), 0 0 60px 20px rgba(255,255,255,0.2);
                    }
                    50% {
                        box-shadow: 0 0 60px 18px rgba(255,60,60,0.85), 0 0 100px 45px rgba(255,60,60,0.4);
                    }
                }
                @keyframes urgentTextFlash {
                    0%, 100% { color: #000000; }
                    50% { color: #d10000; }
                }
                @keyframes urgentBorderFlash {
                    0%, 100% { outline-color: rgba(255,60,60,0); }
                    50% { outline-color: rgba(255,60,60,0.9); }
                }
                @keyframes arrowGenerate {
                    0% {
                        clip-path: inset(0 100% 0 0);
                        opacity: 0.3;
                    }
                    60% {
                        clip-path: inset(0 0% 0 0);
                        opacity: 1;
                    }
                    85% {
                        clip-path: inset(0 0% 0 0);
                        opacity: 1;
                    }
                    100% {
                        clip-path: inset(0 100% 0 0);
                        opacity: 0.3;
                    }
                }
            `}</style>

            {/* SCANNING LIGHT LINE (Renders top to bottom ahead of content) */}
            <div
                className="absolute left-0 right-0 h-[2px] bg-white shadow-[0_0_15px_3px_#ffffff] z-30 pointer-events-none"
                style={{
                    animation: 'scanLine 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                }}
            />

            {/* pulsing outline ring for extra urgency, on top of the box-shadow pulse */}
            <div
                className="absolute inset-0 z-20 pointer-events-none rounded-5 outline outline-4"
                style={{
                    animation: 'urgentBorderFlash 1.1s ease-in-out 0.75s infinite'
                }}
            />

            {/* POPUP CONTENT */}
            <div className="relative z-10 flex flex-row items-center gap-6">
                <button
                    onClick={() => popupState.setActiveColumn(null)}
                    className="absolute -top-6 -right-6 text-2xl leading-none cursor-pointer hover:text-gray-300 transition-colors"
                >
                    ×
                </button>

                <div>
                    <p
                        className="text-[clamp(2rem,5vw,3rem)]"
                        style={{
                            animation: 'urgentTextFlash 1.1s ease-in-out 0.75s infinite'
                        }}
                    >
                        {detail.body}
                    </p>
                </div>

                <svg
                    className="w-32 h-32 shrink-0"
                    fill="none"
                    stroke="#d10000"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    style={{
                        animation: 'arrowGenerate 1.6s ease-in-out 0.75s infinite'
                    }}
                >
                    <path d="M4 12h16M14 6l6 6-6 6" />
                </svg>
            </div>
        </div >
    )
}