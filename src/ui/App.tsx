import { useEffect, useState } from 'react'
import { ImportantMark } from '../components/ImportantMark'
import { popupState } from '../popupState'

const columns = [
    { number: '01', title: 'SKILLS', content: ['Kaotim', 'Samsung', 'CelcomDigi', 'Aeson', 'S', 'aa'] },
    { number: '02', title: 'PAST WORKS', content: ['WP', 'payload', 'nextjs', 'react', 'sql'] },
    { number: '03', title: 'Contact me', content: ['amaliantsha@gmail.com', '0196117609'] },
]

export function App() {
    const [snapshot, setSnapshot] = useState(popupState.getSnapshot())

    useEffect(() => popupState.subscribe(setSnapshot), [])

    const { activeColumn } = snapshot

    const currentActiveColumn = activeColumn ?? 0

    const handleColumnClick = (i: number) => {
        popupState.setActiveColumn(currentActiveColumn === i ? null : i)
    }

    const renderIcon = (columnIndex: number, itemIndex: number) => {
        if (columnIndex === 2) {
            if (itemIndex === 0) {
                return (
                    <svg className="w-10 h-10 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                )
            }
            if (itemIndex === 1) {
                return (
                    <svg className="w-10 h-10 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.009.382l-1.295 1.554a12.012 12.012 0 01-5.69-5.69l1.554-1.295a1.125 1.125 0 00.382-1.009L7.214 3.102A1.125 1.125 0 006.09 2.25H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                )
            }
        }

        return (
            <svg className="w-10 h-10 shrink-0" fill="#ffffff" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                <path d="M207.67432,174a3.99891,3.99891,0,0,1-5.46387,1.46436L132,134.92847V216a4,4,0,0,1-8,0V134.92847L53.78955,175.46436a4.00022,4.00022,0,0,1-4-6.92872L119.99951,128l-70.21-40.53564a4.00022,4.00022,0,0,1,4-6.92872L124,121.07153V40a4,4,0,0,1,8,0v81.07153l70.21045-40.53589a4.00022,4.00022,0,0,1,4,6.92872L136.00049,128l70.21,40.53564A4.00006,4.00006,0,0,1,207.67432,174Z"></path>
            </svg>
        )
    }

    return (
        <div className="py-40 cursor-pointer px-20 flex flex-col items-start gap-10  w-full relative rounded-5 overflow-hidden">
            <div
                className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay bg-cover bg-center "
                style={{
                    backgroundImage: "url('images/testss2.png')"
                }}
            />
            <div
                className="absolute top-[30px] h-[100px] left-0 right-0 h-6 bg-[url('/images/test.png')] bg-repeat-x bg-contain pointer-events-none"
                style={{ transform: 'translateY(-100%)' }}
            />

            <img
                className='absolute right-[-70px] top-[-60px]  w-[500px] z-0 backdrop-grayscale'
                src="/images/fluffy-star-white.png"
                alt="Profile"
            />
            {columns.map((col, i) => {
                const isActive = currentActiveColumn === i

                return (
                    <div
                        key={i}
                        onClick={() => handleColumnClick(i)}
                        className={`heading text-[#D9D9D9] tracking-tight font-salsa leading-[1] z-10 text-[clamp(5rem,25vw,20rem)]  ${isActive ? 'text-white' : ''}`}>
                        {col.title}
                    </div>

                )
            })}


            {/* <div className=' text-[clamp(1.25rem,2.5vw,1.75rem)]'>Lorem Ipsuym</div> */}

            {/*
                <div className="grid grid-cols-[auto_auto_auto] border-4 border-[#4b0808] rounded-[10px] text-[clamp(2rem,5vw,3rem)] ">
                    {columns.map((col, i) => {
                        const isActive = currentActiveColumn === i
                        return (
                            <div
                                key={i}
                                onClick={() => handleColumnClick(i)}
                                className={`border-e-4 border-[#4b0808] cursor-pointer`}
                            >
                                <div className={`grid grid-cols-[auto_auto_1fr] border-b-2 border-[#4b0808] ${isActive ? 'text-white' : 'text-white'}`}>
                                    <div className="text-center border-[#4b0808] p-5 text-[#4b0808] tracking-tight font-semibold">{col.number}</div>
                                    <div className="py-5"> <div className="bg-[#4b0808] w-[4px] h-[100%] "></div></div>
                                    <div className="text-start p-5 font-bold ">{col.title}</div>
                                </div>

                                <div className="text-center text-white pe-5 py-10 relative overflow-hidden flex flex-col items-start gap-6 ps-12 tracking-[0.08em]">
                                    <ul className="relative z-10 text-[clamp(1.25rem,2.5vw,1.75rem)] flex flex-col items-start gap-3">
                                        {col.content.map((line, j) => (
                                            <li key={j} className="flex items-center gap-8">
                                                {renderIcon(i, j)}
                                                <span>{line}</span>
                                            </li>
                                        ))}
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
                */
            }
        </div>



    )
}