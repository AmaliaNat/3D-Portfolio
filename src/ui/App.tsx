import { useState } from 'react'
import { ImportantMark } from '../components/ImportantMark'

const columns = [
    { number: '01', title: 'Past Works', content: ['aa', 'aa', 'aa', 'aa', 'aa', 'aa'] },
    { number: '02', title: 'Skills', content: ['PLS DONT READ THIS PLS DONT READ THIS'] },
    { number: '03', title: 'Past Works', content: ['PLS DONT READ THIS PLS DONT READ THIS'] },
]

export function App() {
    const [activeColumn, setActiveColumn] = useState<number | null>(null)

    const handleColumnClick = (i: number) => {
        setActiveColumn((prev) => (prev === i ? null : i))
    }

    return (
        <div className="bg-[var(--red-500)] py-10 px-12 w-full">
            <div className="heading text-red-400 font-hiker leading-none text-[clamp(3rem,12vw,10rem)]">
                About me
            </div>
            <div className="grid grid-cols-3 border-2 border-[var(--red-400)]">
                {columns.map((col, i) => {
                    const isActive = activeColumn === i
                    return (
                        <div
                            key={i}
                            onClick={() => handleColumnClick(i)}
                            className={`border-e-2 border-[var(--red-400)] cursor-pointer ${isActive ? 'bg-black/10' : ''}`}
                        >
                            <div className={`grid grid-cols-[auto_1fr] border-b-2 border-[var(--red-400)] ${isActive ? 'text-white' : 'text-red-400'}`}>
                                <div className="text-center border-e-2 border-[var(--red-400)] p-5">{col.number}</div>
                                <div className="text-center p-5">{col.title}</div>
                            </div>

                            <div className="text-center text-white px-5 py-10 relative overflow-hidden flex flex-col items-center gap-6">
                                <ul className="relative z-10">
                                    {col.content.map((line, j) => <li key={j}>{line}</li>)}
                                </ul>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleColumnClick(i)
                                    }}
                                    className="relative z-10 border-2 border-white text-white px-6 py-2 hover:bg-white hover:text-[var(--red-500)] transition-colors duration-200"
                                >
                                    Learn more
                                </button>

                                <ImportantMark
                                    isActive={isActive}
                                    className="absolute inset-0 w-full h-full text-[#3B10E7] pointer-events-none"
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}