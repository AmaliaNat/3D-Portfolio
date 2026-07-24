import { useState } from 'react'
import { ImportantMark } from '../components/ImportantMark'

const columns = [
    { number: '01', title: 'Past Works', content: ['aa', 'aa', 'aa', 'aa', 'aa', 'aa'] },
    { number: '02', title: 'Skills', content: ['PLS DONT READ THIS PLS DONT READ THIS'] },
    { number: '03', title: 'Past Works', content: ['PLS DONT READ THIS PLS DONT READ THIS'] },
]

export function App() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    return (
        <div className="absolute left-[13%] top-[10%] bg-[var(--red-500)] py-10 px-12 w-[75%] pointer-events-auto">
            <div className="heading text-red-400 font-hiker leading-none text-[clamp(4rem,20vw,18.75rem)]">
                About me
            </div>
            <div className="grid grid-cols-3 border-2 border-[var(--red-400)]">
                {columns.map((col, i) => {
                    const isActive = activeIndex === i
                    return (
                        <div
                            key={i}
                            onClick={() => setActiveIndex(prev => prev === i ? null : i)}
                            className={`border-e-2 border-[var(--red-400)] cursor-pointer ${isActive ? 'bg-black/10' : ''}`}
                        >
                            <div className={`grid grid-cols-[auto_1fr] border-b-2 border-[var(--red-400)] ${isActive ? 'text-white' : 'text-red-400'}`}>
                                <div className="text-center border-e-2 border-[var(--red-400)] p-5">{col.number}</div>
                                <div className="text-center p-5">{col.title}</div>
                            </div>

                            <div className="text-center text-white px-5 py-10 relative overflow-hidden">
                                <ul className="relative z-10">
                                    {col.content.map((line, j) => <li key={j}>{line}</li>)}
                                </ul>

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