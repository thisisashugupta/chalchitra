'use client'

import { useState } from 'react'

export default function RequireLogin({children}: {children: React.ReactNode}) {

    const [openLoginModal, setOpenLoginModal] = useState(false);

    return <div>
        <button onClick={() => setOpenLoginModal(true)}>
            {children}
        </button>
        {openLoginModal && <div className="z-10 fixed top-0 left-0 right-0 h-screen bg-gray-500/90 flex items-center justify-center">
            <div className="p-24 flex flex-col items-center">
                <p className="px-4 py-3 text-lg font-semibold" >Please Login!</p>
                <button className="mx-auto bg-black text-white px-4 py-3 font-semibold" onClick={() => setOpenLoginModal(false)}>Okay</button>
            </div>
        </div>}
    </div>
}