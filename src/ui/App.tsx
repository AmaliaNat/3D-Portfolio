import { useEffect, useState } from 'react'
import { ImportantMark } from '../components/ImportantMark'
import { popupState } from '../popupState'

const columns = [
    { number: '01', title: 'Past Works', content: ['Kaotim', 'Samsung', 'CelcomDigi', 'Aeson', 'S', 'aa'] },
    { number: '02', title: 'Skills', content: ['WP', 'payload', 'nextjs', 'react', 'sql'] },
    { number: '03', title: 'Contact me', content: ['amaliantsha@gmail.com', '0196117609'] },
]

export function App() {
    const [snapshot, setSnapshot] = useState(popupState.getSnapshot())

    useEffect(() => popupState.subscribe(setSnapshot), [])

    const { activeColumn } = snapshot

    const handleColumnClick = (i: number) => {
        popupState.setActiveColumn(activeColumn === i ? null : i)
    }

    return (
        <div className="bg-[var(--red-500)] py-10 px-15 pb-25 w-full relative rounded-5 overflow-hidden">

            {/* OVERLAY: Blends the image on top of all child content */}
            <div
                className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay bg-cover bg-center backdrop-grayscale"
                style={{
                    backgroundImage: "url('https://i.pinimg.com/control1/736x/84/ef/8b/84ef8b2f3953c39acb7091a85c74f4dc.jpg')"
                }}
            />
            <div
                className="absolute top-[30px] h-[100px] left-0 right-0 h-6 bg-[url('/images/test.png')] bg-repeat-x bg-contain pointer-events-none"
                style={{ transform: 'translateY(-100%)' }}
            />
            {/* CONTENT (Rendered underneath the overlay) */}
            <img
                className='absolute right-[-70px] top-[-60px] w-[500px] z-1'
                src="/images/fluffy-star.png"
                alt="Profile"
            />
            <div className="heading text-[#ffbebe] font-hiker leading-none text-[clamp(5rem,25vw,30rem)]">
                About me
            </div>
            <div className="grid grid-cols-3 border-4 border-[var(--red-400)] rounded-[10px] text-[clamp(2rem,5vw,3rem)] ">
                {columns.map((col, i) => {
                    const isActive = activeColumn === i
                    return (
                        <div
                            key={i}
                            onClick={() => handleColumnClick(i)}
                            className={`border-e-4 border-[var(--red-400)] cursor-pointer`}
                        >
                            {/* HEADING */}
                            <div className={`grid grid-cols-[auto_1fr] border-b-2 border-[var(--red-400)] ${isActive ? 'text-white' : 'text-white'}`}>
                                <div className="text-center border-e-4 border-[var(--red-400)] p-5">{col.number}</div>
                                <div className="text-center p-5 ">{col.title}</div>
                            </div>

                            {/* CONTENT */}
                            <div className="text-center text-white pe-5 py-10 relative overflow-hidden flex flex-col items-start gap-6 ps-12 tracking-[0.08em]">
                                <ul className="relative z-10 text-[clamp(1.25rem,2.5vw,1.75rem)] flex flex-col items-start gap-3">
                                    {col.content.map((line, j) => (
                                        <li key={j} className="flex items-center gap-2">
                                            {/* Asterisk Icon with fixed width/height */}
                                            <svg className="w-10 h-10 shrink-0" fill="#ffffff" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M207.67432,174a3.99891,3.99891,0,0,1-5.46387,1.46436L132,134.92847V216a4,4,0,0,1-8,0V134.92847L53.78955,175.46436a4.00022,4.00022,0,0,1-4-6.92872L119.99951,128l-70.21-40.53564a4.00022,4.00022,0,0,1,4-6.92872L124,121.07153V40a4,4,0,0,1,8,0v81.07153l70.21045-40.53589a4.00022,4.00022,0,0,1,4,6.92872L136.00049,128l70.21,40.53564A4.00006,4.00006,0,0,1,207.67432,174Z"></path>
                                            </svg>
                                            <span>{line}</span>
                                        </li>
                                    ))}
                                </ul>

                                <ImportantMark
                                    isActive={isActive}
                                    className="absolute  inset-0 w-full h-full text-[#3B10E7] pointer-events-none"
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}