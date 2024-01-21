import React from 'react'

function CustomButton({ label, onClick, style }) {
    return (
        <div>
            <button onClick={onClick} className={'rounded-3xl bg-[#782438] text-[#dcdcd0] hover:bg-[#c9c9be] hover:text-[#782438] transition-all duration-200 ' + style}>{label}</button>
        </div >
    )
}

export default CustomButton