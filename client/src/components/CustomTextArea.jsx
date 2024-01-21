import React, { forwardRef } from 'react'

const CustomTextArea = forwardRef(({ label, placeholder, name, style }, ref) => {
    return (
        <div className={" w-full " + style}>
            {label && <label className='mb-2 inline-block text-[2ex]'>{label}</label>}

            <textarea className={' rounded-lg p-2 w-full mb-4 ' + name} ref={ref} placeholder={placeholder} >
            </textarea>
        </div>
    )
}
)
export default CustomTextArea